/* Cloud Function «showcase-admin» — серверная проверка владельца и сохранение данных витрины.
   Вход: POST, тело — JSON {action:'check'|'save', platform:'tg'|'max', initData, data?}.
   Доступ: подпись initData проверяется токеном бота своей площадки (алгоритм у Telegram и MAX одинаковый);
   пускаем только владельца: OWNER_ID (Telegram) или OWNER_MAX_ID (MAX).
   Запись: data.json в бакет; перед записью — копия в backup/. Права на бакет — у сервисного
   аккаунта функции (IAM-токен из context.token, заголовок X-YaCloud-SubjectToken).
   Переменные окружения: BOT_TOKEN, OWNER_ID, MAX_BOT_TOKEN, OWNER_MAX_ID, BUCKET, ALLOW_ORIGIN. Зависимостей нет. */
const crypto = require('crypto');

// Площадки: токен бота и ID владельца. Нет токена или ID — площадка никого не пускает
const PLATFORMS = {
  tg:  { bot: process.env.BOT_TOKEN || '',     owner: String(process.env.OWNER_ID || '') },
  max: { bot: process.env.MAX_BOT_TOKEN || '', owner: String(process.env.OWNER_MAX_ID || '') },
};
const BUCKET = process.env.BUCKET || '';
const ORIGIN = process.env.ALLOW_ORIGIN || '*';
const MAX_AGE_SEC = 24 * 3600;          // подпись действительна сутки
const MAX_BYTES = 300 * 1024;

function verifyInitData(initData, BOT) {
  if (!BOT || typeof initData !== 'string' || !initData) return null;
  const p = new URLSearchParams(initData);
  const hash = p.get('hash');
  if (!hash) return null;
  p.delete('hash');
  const dataCheck = [...p.entries()].sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0)).map(([k, v]) => `${k}=${v}`).join('\n');
  const secret = crypto.createHmac('sha256', 'WebAppData').update(BOT).digest();
  const calc = crypto.createHmac('sha256', secret).update(dataCheck).digest('hex');
  if (calc.length !== hash.length || !crypto.timingSafeEqual(Buffer.from(calc), Buffer.from(hash))) return null;
  let ts = Number(p.get('auth_date'));
  if (ts > 1e12) ts /= 1000;            // на случай, если MAX присылает миллисекунды (по документации — секунды)
  const age = Date.now() / 1000 - ts;
  if (!(age >= -60 && age < MAX_AGE_SEC)) return null;
  try { return JSON.parse(p.get('user')); } catch (e) { return null; }
}

// Структура как в prototype/data.js; цены — неотрицательные числа
function validate(d) {
  if (!d || typeof d !== 'object' || Array.isArray(d)) return 'Нет данных';
  for (const k of ['home', 'repair', 'lunch', 'rent', 'build', 'done']) if (!d[k] || typeof d[k] !== 'object') return 'Нет раздела ' + k;
  const lists = [['repair', 'works'], ['lunch', 'menu'], ['rent', 'flats'], ['build', 'houses'], ['home', 'tiles']];
  for (const [a, b] of lists) if (!Array.isArray(d[a][b]) || !d[a][b].length) return `Пустой список ${a}.${b}`;
  let bad = null;
  (function walk(o, path) {
    if (bad || !o || typeof o !== 'object') return;
    for (const [k, v] of Object.entries(o)) {
      if (/^(price|pricePerM2|lampPrice|demolitionPrice|materialsPrice|area|areaMin|areaMax|areaStart|lampsStart|months|maxGuests|extraBeds|extraBedPrice|terracePricePerM2)$/.test(k) && !(typeof v === 'number' && isFinite(v) && v >= 0)) { bad = `${path}${k}: нужно число не меньше 0`; return; }
      walk(v, `${path}${k}.`);
    }
  })(d, '');
  if (bad) return bad;
  if (Buffer.byteLength(JSON.stringify(d)) > MAX_BYTES) return 'Слишком большие данные';
  return null;
}

async function s3(method, key, token, body, headers = {}) {
  const r = await fetch(`https://storage.yandexcloud.net/${BUCKET}/${key}`, { method, headers: { 'X-YaCloud-SubjectToken': token, ...headers }, body });
  if (!r.ok && !(method === 'GET' && r.status === 404)) throw new Error(`storage ${method} ${key}: ${r.status}`);
  return r;
}

module.exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': ORIGIN, 'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type', 'Content-Type': 'application/json; charset=utf-8',
  };
  const res = (statusCode, obj) => ({ statusCode, headers, body: JSON.stringify(obj) });
  if (event.httpMethod === 'OPTIONS') return { statusCode: 204, headers, body: '' };
  if (event.httpMethod !== 'POST') return res(405, { ok: false, error: 'Только POST' });

  let req;
  try { req = JSON.parse(event.isBase64Encoded ? Buffer.from(event.body || '', 'base64').toString() : event.body || ''); }
  catch (e) { return res(400, { ok: false, error: 'Неверный запрос' }); }

  const pf = PLATFORMS[req.platform === 'max' ? 'max' : 'tg'];
  const user = verifyInitData(req.initData, pf.bot);
  if (!user || !pf.owner || String(user.id) !== pf.owner) return res(403, { ok: false, error: 'Нет доступа' });

  if (req.action === 'check') return res(200, { ok: true });

  if (req.action === 'save') {
    const err = validate(req.data);
    if (err) return res(400, { ok: false, error: err });
    const token = context && context.token && context.token.access_token;
    if (!token) return res(500, { ok: false, error: 'Нет доступа к хранилищу' });
    try {
      const cur = await s3('GET', 'data.json', token);
      if (cur.ok) {
        const ts = new Date().toISOString().replace(/[:.]/g, '-');
        await s3('PUT', `backup/data-${ts}.json`, token, await cur.text(), { 'Content-Type': 'application/json; charset=utf-8' });
      }
      await s3('PUT', 'data.json', token, JSON.stringify(req.data, null, 1), { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-cache' });
    } catch (e) {
      console.error(e.message);
      return res(502, { ok: false, error: 'Хранилище не ответило, попробуйте ещё раз' });
    }
    return res(200, { ok: true });
  }
  return res(400, { ok: false, error: 'Неизвестное действие' });
};

module.exports._test = { verifyInitData, validate };
