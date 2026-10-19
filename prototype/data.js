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
     например icon: 'house'. Все значки в одном стиле — Fluent Emoji 3D;
     как добавить новый, написано в prototype/icons/LICENSE-fluent-emoji.txt.
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

    // Ряд квадратных кнопок под заголовком
    chips: [
      { icon: 'triangular_ruler', text: 'Расчёт',   open: 'repair', color: '#F5A524' },
      { icon: 'shopping_cart', text: 'Заказ',    open: 'lunch',  color: '#34C759' },
      { icon: 'calendar', text: 'Бронь',    open: 'rent',   color: '#8B5CF6' },
      { icon: 'building_construction', text: 'Стройка',  open: 'build',  color: '#F97316' },
      { icon: 'speech_balloon', text: 'Написать', open: 'chat',   color: '#2F6BFF' },
    ],

    // Синий баннер — открывает чат
    promo: {
      title: 'Обсудить ваш проект ›',
      text: 'Расскажите о бизнесе — предложим решение и цену',
      icon: 'speech_balloon',
    },

    // Плитки. wide: true — широкая (в ряду широкая + узкая), full: true — на всю ширину
    tiles: [
      { label: 'Демо',      title: 'Ремонт и отделка', text: '',                                       icon: 'hammer_and_wrench', color: '#F5A524', open: 'repair', wide: true },
      { label: 'Демо',      title: 'Обеды',            text: '',                                       icon: 'pot_of_food', color: '#22C55E', open: 'lunch' },
      { label: 'Демо',      title: 'Аренда',           text: '',                                       icon: 'key', color: '#8B5CF6', open: 'rent' },
      { label: 'Демо',      title: 'Дома и бани',      text: 'Проект, комплектация, смета',            icon: 'building_construction', color: '#F97316', open: 'build',  wide: true },
      { label: 'Под заказ', title: 'Ваш бизнес',       text: 'Запись, расчёты, заказы, бронь, каталог', icon: 'rocket', color: '#EC4899', open: 'chat',   full: true },
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
      { id: 'lam',   icon: 'wood', name: 'Укладка ламината', price: 450 },
      { id: 'tile',  icon: 'brick', name: 'Укладка плитки',   price: 1400 },
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
    subtitle: 'демо · доставка 11:30–15:00',
    note: 'Бесплатная доставка от 600 ₽. Условия в демо примерные.',
    paymentNote: 'Оплата курьеру картой или наличными.',
    slots: ['12:00', '12:30', '13:00', '13:30'],   // время доставки на выбор
    slotStart: '12:30',

    // Меню. category — вкладка; available: false — «Закончилось»
    menu: [
      { id: 'm1', category: 'Комплексы', icon: 'plate', name: 'Комплекс «Рабочий»', price: 390, available: true },
      { id: 'm2', category: 'Комплексы', icon: 'green_salad', name: 'Комплекс «Лёгкий»',  price: 320, available: true },
      { id: 'm3', category: 'Супы',      icon: 'pot_of_food', name: 'Борщ',               price: 160, available: true },
      { id: 'm4', category: 'Супы',      icon: 'bowl_with_spoon', name: 'Солянка',            price: 190, available: true },
      { id: 'm5', category: 'Горячее',   icon: 'meat_on_bone', name: 'Котлета с пюре',     price: 230, available: true },
      { id: 'm6', category: 'Горячее',   icon: 'curry_rice', name: 'Плов',               price: 260, available: false },
      { id: 'm7', category: 'Горячее',   icon: 'spaghetti', name: 'Паста с курицей',    price: 250, available: true },
      { id: 'm8', category: 'Салаты',    icon: 'green_salad', name: 'Цезарь',             price: 240, available: true },
      { id: 'm9', category: 'Напитки',   icon: 'beverage_box', name: 'Морс',               price: 70,  available: true },
    ],

    doneTitle: 'Заказ принят',
  },

  /* ───────────── 5. ДЕМО «ПОСУТОЧНАЯ АРЕНДА» ───────────── */
  rent: {
    title: 'Квартиры посуточно',
    subtitle: 'демо',
    note: 'В рабочей версии здесь будут настоящие фото.',

    // price — ₽ за ночь; maxGuests — максимум гостей; show: false — скрыть
    // color1/color2 — градиент обложки вместо фото
    flats: [
      { id: 'f1', icon: 'couch_and_lamp', name: 'Студия у набережной', address: 'Центр · 7 мин до метро',    maxGuests: 2, price: 3200, show: true, color1: '#12463E', color2: '#2F9C84' },
      { id: 'f2', icon: 'bed', name: 'Двушка для семьи',    address: 'Спальный район · парковка', maxGuests: 4, price: 4600, show: true, color1: '#4A2E14', color2: '#B9803F' },
      { id: 'f3', icon: 'cityscape_at_dusk', name: 'Лофт с видом',        address: 'Деловой квартал · 18 этаж', maxGuests: 3, price: 5900, show: true, color1: '#1C2550', color2: '#5167C9' },
    ],

    bookingNote: 'Хозяин подтвердит даты и пришлёт реквизиты для предоплаты.',
    doneTitle: 'Заявка отправлена',
    doneText: 'Хозяин подтвердит бронь и пришлёт реквизиты для предоплаты.',
  },

  /* ───────────── 6. ДЕМО «ДОМА И БАНИ ПОД КЛЮЧ» ───────────── */
  build: {
    title: 'Дома и бани',
    subtitle: 'демо · строительство под ключ',
    note: 'В рабочей версии здесь будут фото и планировки проектов.',

    // Проекты. area — площадь, м² (на неё умножается цена комплектации)
    // show: false — скрыть; color1/color2 — градиент обложки вместо фото
    houses: [
      { id: 'h1', icon: 'hut', name: 'Баня 6×4',            info: 'Брус · парная, мойка, комната отдыха', area: 36,  show: true, color1: '#3B2414', color2: '#A86B3C' },
      { id: 'h2', icon: 'house_with_garden', name: 'Каркасный дом 98 м²', info: '1 этаж · 3 спальни · терраса',         area: 98,  show: true, color1: '#173A2A', color2: '#4E9B6F' },
      { id: 'h3', icon: 'house', name: 'Дом из бруса 140 м²', info: '2 этажа · 4 спальни · котельная',      area: 140, show: true, color1: '#2A2340', color2: '#7A68C4' },
    ],

    // Комплектации: цена за 1 м² площади проекта; months — срок стройки
    packages: [
      { id: 'box',  icon: 'brick', name: 'Коробка',       pricePerM2: 22000, months: 2 },
      { id: 'warm', icon: 'fire', name: 'Тёплый контур', pricePerM2: 32000, months: 3 },
      { id: 'key',  icon: 'key', name: 'Под ключ',      pricePerM2: 48000, months: 5 },
    ],
    packageStart: 'warm',           // какая комплектация выбрана сразу

    // Дополнительные работы — фиксированная цена, ₽. Можно добавлять свои строки
    extras: [
      { id: 'found',   name: 'Свайный фундамент',     text: 'Сваи, обвязка, монтаж',   price: 280000 },
      { id: 'terrace', name: 'Терраса 20 м²',         text: 'Лиственница, ограждение', price: 190000 },
      { id: 'project', name: 'Привязка к участку',    text: 'Выезд, план, разметка',   price: 45000 },
    ],

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
