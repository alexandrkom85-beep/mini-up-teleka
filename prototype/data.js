/* =====================================================================
   ДАННЫЕ ВИТРИНЫ — все тексты и цены демо. Логика лежит в index.html,
   здесь её нет: меняйте значения, сценарии переписывать не нужно.

   Как править:
   • Меняйте только текст в кавычках '…' и числа.
   • Не удаляйте запятые, кавычки и скобки — без них витрина не откроется
     (вместо неё появится сообщение «Ошибка в data.js»).
   • Цены — в рублях, цифрами без пробелов: 1400, а не '1 400 ₽'.
   • id не меняйте — по ним код находит пункты. Для нового пункта
     придумайте новый уникальный id латиницей.
   • Цвета — в формате '#RRGGBB'.
   • Значки (icon): имя файла из папки prototype/icons без .png,
     например icon: 'house'. Значки и блюда — генерация владельца (ChatGPT, фон убран,
     листы — design/refs/02 и 04); speech_balloon, wood и др. — Fluent Emoji 3D (LICENSE-fluent-emoji.txt).
     Можно вписать и обычный эмодзи: icon: '🏠' — но он будет другого стиля.
   • Куда ведёт кнопка (open): 'repair' — ремонт, 'lunch' — обеды,
     'rent' — аренда, 'build' — дома и бани, 'chat' — чат с владельцем.

   Проверка после правки: сохранить файл → открыть index.html в браузере
   (или обновить страницу) → пройти экран, который меняли.
   ===================================================================== */

window.SHOWCASE = {

  /* ───────────── 1. ОБЩЕЕ ───────────── */
  contact: 'sanchokrsk',            // ник в Telegram без @ — сюда ведёт «Обсудить проект»
  appTitle: 'Витрина решений',      // заголовок в шапке главного экрана
  appSubtitle: 'mini app',
  formNote: 'Это демо: введённые данные никуда не отправляются.',   // подпись под полями «Имя / Телефон»

  /* ───────────── 2. ГЛАВНЫЙ ЭКРАН ───────────── */
  home: {
    heading: 'Мини-приложения для бизнеса',
    tagline: 'Telegram · MAX · браузер',

    // Плитки. wide: true — широкая (в ряду широкая + узкая), full: true — на всю ширину
    tiles: [
      { label: 'Демо',      title: 'Ремонт и отделка', text: '',                                       icon: 'hammer_and_wrench', color: '#F5A524', open: 'repair', wide: true },
      { label: 'Демо',      title: 'Обеды',            text: '',                                       icon: 'food_borscht', color: '#22C55E', open: 'lunch' },
      { label: 'Демо',      title: 'Аренда',           text: '',                                       icon: 'key', color: '#8B5CF6', open: 'rent' },
      { label: 'Демо',      title: 'Дома и бани',      text: 'Размер, отделка, фундамент',            icon: 'building_construction', color: '#F97316', open: 'build',  wide: true },
      { label: 'Под заказ', title: 'Нет вашей ниши?',  text: 'Сделаем приложение под ваш бизнес', icon: 'rocket', color: '#EC4899', open: 'chat',   full: true },
    ],

    benefitsTitle: 'Что получает бизнес',
    benefits: [
      { icon: 'stopwatch', color: '#FF9500', title: 'Заявки без звонков',         text: 'Клиент сам выбирает и считает' },
      { icon: 'pencil', color: '#2481CC', title: 'Своя админка',               text: 'Цены, меню и фото меняете сами' },
      { icon: 'mobile_phone', color: '#8E8E93', title: 'Telegram, MAX и браузер',    text: 'Одно приложение на всех площадках' },
      { icon: 'link', color: '#0A84FF', title: 'Связка с вашими системами',  text: 'CRM, учёт, корпоративные сервисы — по проекту' },
    ],

    note: 'Это демо. Всё, что вы вводите, никуда не отправляется и не сохраняется.',
    button: 'Обсудить проект',      // большая кнопка внизу
  },

  /* ───────────── 3. ДЕМО «РЕМОНТ И ОТДЕЛКА» ───────────── */
  repair: {
    title: 'Мастер ремонта',
    subtitle: 'демо · калькулятор',

    // Виды работ: цена за 1 м². lamps: true — показывать выбор светильников
    works: [
      { id: 'ceil',  icon: 'light_bulb', name: 'Натяжной потолок', price: 650,  lamps: true },
      { id: 'paint', icon: 'paintbrush', name: 'Покраска стен',    price: 380 },
      { id: 'lam',   icon: 'laminate', name: 'Укладка ламината', price: 450 },
      { id: 'tile',  icon: 'tile', name: 'Укладка плитки',   price: 1400 },
    ],

    priceIcon: 'house',             // значок в карточке «Предварительная цена»
    lampPrice: 450,                 // точечный светильник, ₽ за штуку
    lampsStart: 6,                  // сколько светильников выбрано сразу
    demolitionPrice: 150,           // демонтаж старого, ₽ за м²
    materialsPrice: 200,            // материалы от нас, ₽ за м²

    areaMin: 5,                     // площадь на ползунке, м²
    areaMax: 120,
    areaStart: 18,

    note: 'Точную цену мастер назовёт после бесплатного замера. Цены в демо примерные.',
    button: 'Вызвать замерщика',    // к тексту кнопки добавится «· от N ₽»
    formTitle: 'Заявка на замер',
    doneTitle: 'Заявка у мастера',
    doneText: 'Мастер позвонит и договорится о замере. После замера цена может уточниться.',
  },

  /* ───────────── 4. ДЕМО «ДОСТАВКА ОБЕДОВ» ───────────── */
  lunch: {
    title: 'Обед рядом',
    subtitle: 'демо · заказ на следующий рабочий день',
    note: '',                              // подпись под меню; пусто — не показывается
    paymentNote: 'Оплата курьеру картой или наличными.',
    deliveryWindow: '12:00–15:00',         // время доставки (дата — следующий рабочий день)
    orderDeadline: '19:00',                // заказы на завтра принимаются до этого времени сегодня

    // Офисы-клиенты столовой. Первый — офис сотрудника в демо (в рабочей версии подставляется из ссылки офиса).
    // code — хвост ссылки офиса; экран «Офисы и ссылки» в демо показывает их менеджеру столовой
    offices: [
      { code: 'romashka',    name: 'ООО «Ромашка»',    address: 'ул. Ленина, 5, 3 этаж, офис 301' },
      { code: 'technostroy', name: 'ООО «ТехноСтрой»', address: 'пр. Мира, 12, 5 этаж' },
    ],

    // Экран «Как это видит столовая»: выдуманные заказы коллег (блюда — по id из меню)
    kitchenSample: [
      { office: 'ООО «Ромашка»',    person: 'Анна',    items: { m3: 1, m5: 1 } },
      { office: 'ООО «Ромашка»',    person: 'Сергей',  items: { m1: 1, m9: 1 } },
      { office: 'ООО «Ромашка»',    person: 'Ольга',   items: { m8: 1, m11: 1 } },
      { office: 'ООО «ТехноСтрой»', person: 'Игорь',   items: { m4: 1, m10: 1 } },
      { office: 'ООО «ТехноСтрой»', person: 'Марина',  items: { m3: 1, m7: 1 } },
    ],

    // Меню. category — вкладка (порядок вкладок = порядок блюд); available: false — «Закончилось»
    // Картинки блюд (food_*) — генерация владельца в ChatGPT, фон убран
    menu: [
      { id: 'm3',  category: 'Супы',     icon: 'food_borscht',  name: 'Борщ со сметаной',        price: 220, available: true },
      { id: 'm1',  category: 'Горячее',  icon: 'food_pelmeni',  name: 'Пельмени со сметаной',    price: 280, available: true },
      { id: 'm5',  category: 'Горячее',  icon: 'food_cutlets',  name: 'Котлеты с пюре',          price: 230, available: true },
      { id: 'm6',  category: 'Горячее',  icon: 'food_plov',     name: 'Плов',                    price: 260, available: false },
      { id: 'm2',  category: 'Горячее',  icon: 'food_vareniki', name: 'Вареники с картошкой',    price: 220, available: true },
      { id: 'm4',  category: 'Горячее',  icon: 'food_shashlik', name: 'Шашлык из свинины',       price: 390, available: true },
      { id: 'm8',  category: 'Салаты',   icon: 'food_salad',    name: 'Греческий салат',         price: 240, available: true },
      { id: 'm7',  category: 'Выпечка',  icon: 'food_blini',    name: 'Блины со сметаной',       price: 160, available: true },
      { id: 'm10', category: 'Выпечка',  icon: 'food_pastry',   name: 'Пирожки с мясом, 2 шт.',  price: 140, available: true },
      { id: 'm11', category: 'Десерты',  icon: 'food_dessert',  name: 'Чизкейк',                 price: 230, available: true },
      { id: 'm9',  category: 'Напитки',  icon: 'food_drink',    name: 'Морс',                    price: 90,  available: true },
    ],

    doneTitle: 'Заказ принят',
  },

  /* ───────────── 5. ДЕМО «ПОСУТОЧНАЯ АРЕНДА» ───────────── */
  rent: {
    title: 'Квартиры посуточно',
    subtitle: 'демо',
    note: 'В рабочей версии здесь будут настоящие фото.',

    // price — ₽ за ночь; maxGuests — основных спальных мест; extraBeds — сколько можно добавить
    // доп. мест (гостей сверх maxGuests); show: false — скрыть; color1/color2 — обложка;
    // gallery — фото квартиры: img — файл из prototype/photos (4:3), пока пусто — заглушка
    flats: [
      { id: 'f1', icon: 'couch_and_lamp', name: 'Студия у набережной', address: 'Центр · 7 мин до метро',    maxGuests: 2, extraBeds: 1, price: 3200, show: true, color1: '#12463E', color2: '#2F9C84',
        gallery: [{ img: '', caption: 'Комната' }, { img: '', caption: 'Кухня' }, { img: '', caption: 'Вид из окна' }] },
      { id: 'f2', icon: 'bed', name: 'Двушка для семьи',    address: 'Спальный район · парковка', maxGuests: 4, extraBeds: 2, price: 4600, show: true, color1: '#4A2E14', color2: '#B9803F',
        gallery: [{ img: '', caption: 'Спальня' }, { img: '', caption: 'Детская' }, { img: '', caption: 'Кухня-гостиная' }] },
      { id: 'f3', icon: 'cityscape_at_dusk', name: 'Лофт с видом',        address: 'Деловой квартал · 18 этаж', maxGuests: 3, extraBeds: 1, price: 5900, show: true, color1: '#1C2550', color2: '#5167C9',
        gallery: [{ img: '', caption: 'Гостиная' }, { img: '', caption: 'Панорамное окно' }, { img: '', caption: 'Спальня' }] },
      { id: 'f4', icon: 'bed', name: 'Однушка у вокзала',   address: 'Вокзал · 5 мин пешком',     maxGuests: 2, extraBeds: 1, price: 2800, show: true, color1: '#3A1C2E', color2: '#A3507E',
        gallery: [{ img: '', caption: 'Комната' }, { img: '', caption: 'Санузел' }] },
      { id: 'f5', icon: 'couch_and_lamp', name: 'Трёшка для компании', address: 'Центр · 2 спальни и гостиная', maxGuests: 6, extraBeds: 2, price: 6900, show: true, color1: '#1E3A4A', color2: '#3F8BB0',
        gallery: [{ img: '', caption: 'Гостиная' }, { img: '', caption: 'Спальня 1' }, { img: '', caption: 'Спальня 2' }] },
    ],

    // Гость сверх основных мест — доп. спальное место, ₽ за ночь
    extraBedPrice: 500,

    // Доп. услуги — переключатели, цена за всё проживание (0 — бесплатно)
    services: [
      { id: 'linen',  name: 'Дополнительный комплект белья', price: 300 },
      { id: 'towels', name: 'Дополнительные полотенца',      price: 200 },
      { id: 'crib',   name: 'Детская кроватка',              price: 0 },
      { id: 'late',   name: 'Поздний выезд до 16:00',        price: 1000 },
    ],

    bookingNote: 'Хозяин подтвердит даты и пришлёт реквизиты для предоплаты.',
    doneTitle: 'Заявка отправлена',
    doneText: 'Хозяин подтвердит бронь и пришлёт реквизиты для предоплаты.',
  },

  /* ───────────── 6. ДЕМО «ДОМА И БАНИ ПОД КЛЮЧ» ───────────── */
  build: {
    title: 'Дома и бани',
    subtitle: 'демо · расчёт стоимости',
    note: 'В рабочей версии здесь будут фото и планировки проектов.',

    // Что строим. widths / lengths — значения ползунков «Ширина» и «Длина», м, через запятую
    // (дробные — через точку: 2.4). Площадь = ширина × длина. pricePerM2 — базовая цена за 1 м²;
    // months — примерный срок; foundation — фундамент, выбранный сразу;
    // show: false — скрыть; color1/color2 — цвет обложки
    // gallery — мини-галерея «Варианты»: img — файл из prototype/photos (jpg, лучше 1200×900, 4:3);
    // пока img пустой, показывается заглушка с подписью
    houses: [
      { id: 'cabin', icon: 'house', name: 'Бытовка', info: 'Для дачи и стройки', widths: '2, 2.4, 3, 4, 4.4, 4.8', lengths: '2, 4, 6', pricePerM2: 15000, months: 1, foundation: 'none', gallery: [{ img: '', caption: 'Бытовка 2,4×6 с тамбуром' }, { img: '', caption: 'Бытовка с террасой' }, { img: '', caption: 'Внутри: чистовая отделка' }],
        show: true, color1: '#2A2340', color2: '#7A68C4' },
      { id: 'bath', icon: 'hut', name: 'Баня', info: 'Парная, мойка, комната отдыха', widths: '2, 2.4, 4, 4.8', lengths: '4, 6, 8', pricePerM2: 28000, months: 2, foundation: 'piles', gallery: [{ img: '', caption: 'Баня 4×6 с террасой' }, { img: '', caption: 'Парная' }, { img: '', caption: 'Комната отдыха' }],
        show: true, color1: '#3B2414', color2: '#A86B3C' },
      { id: 'frame', icon: 'house_with_garden', name: 'Каркасный дом', info: 'Для жизни круглый год', widths: '6, 8, 10, 12', lengths: '6, 8, 10, 12, 14', pricePerM2: 35000, months: 4, foundation: 'piles', gallery: [{ img: '', caption: 'Дом 8×10 с террасой' }, { img: '', caption: 'Гостиная' }, { img: '', caption: 'Дом зимой' }],
        show: true, color1: '#173A2A', color2: '#4E9B6F' },
    ],

    // ШАБЛОН блоков выбора. У каждой постройки свои копии (groups, extras, terrace) — их цены,
    // показ и порядок правятся в админке отдельно для каждой постройки. Отсюда берутся только
    // для построек, у которых своих блоков ещё нет. Цена пункта — за 1 м², добавляется к базовой.
    // Сразу выбран первый пункт группы (фундамент — по полю foundation у постройки)
    options: [
      { id: 'warm', title: 'Утепление', items: [
        { id: 'cold', name: 'Сезонный вариант 50мм',           text: 'Без утепления, на тёплое время', pricePerM2: 4000 },
        { id: 'warm', name: 'Для постоянного проживания 150мм', text: 'С утеплением, круглый год',     pricePerM2: 6500 },
      ] },
      { id: 'finish', title: 'Отделка', items: [
        { id: 'none',  name: 'Без отделки', text: 'Только стены',        pricePerM2: 0 },
        { id: 'rough', name: 'Черновая',    text: 'Под свою отделку',     pricePerM2: 3000 },
        { id: 'fine',  name: 'Чистовая',    text: 'Можно заезжать',       pricePerM2: 7000 },
      ] },
      { id: 'found', title: 'Фундамент', items: [
        { id: 'none',  name: 'Не нужен',         text: 'Ставим на блоки',        pricePerM2: 0 },
        { id: 'piles', name: 'Свайно-винтовой',  text: 'Быстро, любой грунт',    pricePerM2: 3500 },
        { id: 'strip', name: 'Ленточный',        text: 'Бетонная лента',         pricePerM2: 6500 },
        { id: 'slab',  name: 'Монолитная плита', text: 'Для сложных грунтов',    pricePerM2: 8500 },
      ] },
    ],

    // Терраса: идёт вдоль стороны постройки (ширины или длины), глубина — ползунок, м.
    // Площадь = сторона × глубина
    terraceDepths: '2, 3, 4',
    terracePricePerM2: 15000,

    // Дополнительные работы — фиксированная цена, ₽. Можно добавлять свои строки
    extras: [
      { id: 'project', name: 'Выезд на участок и разметка', text: 'Инженер осмотрит участок и разметит место', price: 10000 },
    ],

    // Кнопка «Консультация специалиста»
    consultTitle: 'Консультация специалиста',
    consultText: 'Поможем выбрать размер, фундамент и отделку',
    consultDoneTitle: 'Заявка принята',
    consultDoneText: 'Специалист перезвонит и ответит на вопросы.',

    priceNote: 'Цены в демо примерные. Точную смету прораб посчитает после выезда на участок.',
    button: 'Получить смету',       // к тексту кнопки добавится «· от N ₽»
    formTitle: 'Заявка на смету',
    startOptions: ['В этом сезоне', 'В следующем году', 'Пока присматриваюсь'],
    doneTitle: 'Заявка у прораба',
    doneText: 'Прораб позвонит, уточнит участок и пришлёт подробную смету.',
  },

  /* ───────────── 7. ЭКРАН «ГОТОВО» (после любого демо) ───────────── */
  done: {
    chatLink: 'Хочу такое для своего бизнеса',
    button: 'На витрину',
  },
};
