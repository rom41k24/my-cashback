// Данные по умолчанию (если нет в localStorage)
const DEFAULT_CARDS = [
  {
    id: "mts_debit",
    name: "МТС-дебетовая",
    bankClass: "mts",
    bankName: "МТС БАНК",
    cardType: "Дебетовая",
    network: "visa",
    categories: [
      { name: "Спорттовары", value: 5 },
      { name: "Заправки", value: 2 },
      { name: "Детские товары*", value: 5 },
      { name: "Отели", value: 2 },
      { name: "Дом и ремонт", value: 3 }
    ]
  },
  {
    id: "mts_credit",
    name: "МТС-кредитка",
    bankClass: "mts",
    bankName: "МТС БАНК",
    cardType: "Кредитная",
    network: "mastercard",
    categories: [
      { name: "На все", value: 1 },
      { name: "Одежда", value: 5 },
      { name: "Фастфуд", value: 3 },
      { name: "Рестораны и доставки", value: 5 },
      { name: "Супермаркеты", value: 5 }
    ]
  },
  {
    id: "tinkoff",
    name: "Тинькофф",
    bankClass: "tinkoff",
    bankName: "Т-БАНК",
    cardType: "Black",
    network: "mir",
    categories: [
      { name: "Аптеки", value: 5 },
      { name: "Развлечения", value: 5 },
      { name: "Жд-билеты", value: 5 },
      { name: "На все", value: 1 }
    ]
  },
  {
    id: "alfa",
    name: "Альфа-Банк",
    bankClass: "alfa",
    bankName: "АЛЬФА-БАНК",
    cardType: "Classic",
    network: "visa",
    categories: [
      { name: "На все", value: 1 },
      { name: "Цветы", value: 5 },
      { name: "Дикси-доставка", value: 19 },
      { name: "Красота", value: 3 }
    ]
  },
  {
    id: "yandex",
    name: "Яндекс Карта",
    bankClass: "yandex",
    bankName: "ЯНДЕКС БАНК",
    cardType: "Плюс",
    network: "mir",
    categories: [
      { name: "Яндекс Еда и Деливери", value: 7 },
      { name: "Билеты на концерты", value: 10 },
      { name: "Такси", value: 5 },
      { name: "Книги", value: 10 },
      { name: "Развлечения", value: 5 }
    ]
  }
];

const DEFAULT_SUBSCRIPTIONS = [
  {
    id: "sub_1",
    name: "Яндекс Плюс",
    cost: 299,
    period: "monthly",
    date: "2026-06-25",
    cardId: "yandex"
  },
  {
    id: "sub_2",
    name: "Telegram Premium",
    cost: 329,
    period: "monthly",
    date: "2026-06-18",
    cardId: "tinkoff"
  },
  {
    id: "sub_3",
    name: "Фитнес-клуб",
    cost: 2500,
    period: "monthly",
    date: "2026-06-15",
    cardId: "mts_credit"
  }
];

const DEFAULT_PAYMENTS = [
  {
    id: "pay_1",
    type: "credit",
    name: "Кредитка Т-Банк",
    amount: 15000,
    date: "2026-06-25",
    note: "Минимальный платеж без %"
  },
  {
    id: "pay_2",
    type: "debt",
    name: "Игорь (вернет долг)",
    amount: 5000,
    date: "2026-06-20",
    note: "За аренду дачи"
  },
  {
    id: "pay_3",
    type: "savings",
    name: "Вклад Альфа-Банк",
    amount: 100000,
    date: "2026-07-15",
    note: "Закрытие счета под 18%"
  }
];

// Справочник MCC кодов и их привязка к категориям
const MCC_DIRECTORY = {
  "5411": { name: "Супермаркеты", desc: "Бакалейные магазины, супермаркеты, универсамы, сетевые продуктовые", categories: ["супермаркеты", "продукты"] },
  "5499": { name: "Разные продовольственные магазины", desc: "Специализированные продуктовые, рынки, кондитерские, фермерские лавки", categories: ["супермаркеты", "продукты"] },
  "5814": { name: "Фастфуд", desc: "Рестораны быстрого обслуживания, закусочные, пиццерии, кофейни, бургерные", categories: ["фастфуд", "кафе и рестораны"] },
  "5812": { name: "Рестораны и кафе", desc: "Места общественного питания, рестораны, бары, кафе с полным обслуживанием", categories: ["рестораны и доставки", "кафе и рестораны"] },
  "5813": { name: "Бары и ночные клубы", desc: "Питейные заведения, таверны, бары, дискотеки, ночные клубы", categories: ["рестораны и доставки", "развлечения"] },
  "4121": { name: "Такси", desc: "Услуги такси, трансферы, каршеринг, лимузины", categories: ["такси", "транспорт"] },
  "5541": { name: "Заправки (АЗС)", desc: "Станции техобслуживания, продажа топлива, АЗС с персоналом", categories: ["заправки", "авто"] },
  "5542": { name: "Автоматические АЗС", desc: "Автоматические топливозаправочные терминалы самообслуживания", categories: ["заправки", "авто"] },
  "5912": { name: "Аптеки", desc: "Аптеки, продажа лекарств, рецептурных препаратов и оптики", categories: ["аптеки", "здоровье"] },
  "5691": { name: "Одежда и обувь", desc: "Магазины мужской и женской одежды, розничная торговля гардеробом", categories: ["одежда"] },
  "5621": { name: "Женская одежда", desc: "Специализированные бутики женской одежды и аксессуаров", categories: ["одежда"] },
  "5651": { name: "Семейная одежда", desc: "Магазины одежды для всей семьи, универмаги одежды", categories: ["одежда"] },
  "5661": { name: "Обувные магазины", desc: "Магазины обуви, галантереи и средств по уходу за обувью", categories: ["одежда"] },
  "5941": { name: "Спорттовары", desc: "Магазины спортивного оборудования, инвентаря, одежды и обуви", categories: ["спорттовары", "одежда"] },
  "5977": { name: "Косметика и парфюмерия", desc: "Магазины косметики, парфюмерии, гигиены и бьюти-товаров", categories: ["красота"] },
  "7230": { name: "Салоны красоты", desc: "Парикмахерские, спа-центры, косметологические салоны, маникюр", categories: ["красота"] },
  "7996": { name: "Парки развлечений", desc: "Аттракционы, парки развлечений, выставки, карнававы", categories: ["развлечения"] },
  "7832": { name: "Кинотеатры", desc: "Прокат и показ кинофильмов, кинотеатры", categories: ["развлечения", "кино"] },
  "4111": { name: "Общественный транспорт", desc: "Пригородные электрички, метро, автобусы, трамваи, троллейбусы", categories: ["транспорт"] },
  "4112": { name: "Пассажирские ж/д билеты", desc: "Железнодорожные билеты, кассы вокзалов (РЖД)", categories: ["жд-билеты", "путешествия"] },
  "4511": { name: "Авиалинии", desc: "Покупка авиабилетов, регулярные и чартерные рейсы, авиакомпании", categories: ["путешествия", "отели"] },
  "7011": { name: "Отели и гостиницы", desc: "Аренда жилья, гостиницы, хостелы, мотели, кемпинги", categories: ["отели", "путешествия"] },
  "5200": { name: "Товары для дома и ремонта", desc: "Магазины строительных материалов, Leroy Merlin, OBI, крепеж", categories: ["дом и ремонт"] },
  "5712": { name: "Мебель и декор", desc: "Магазины мебели, фурнитуры, штор, ковров и домашнего декора", categories: ["дом и ремонт"] },
  "5992": { name: "Флористика и цветы", desc: "Доставка цветов, цветочные салоны, букеты, растения", categories: ["цветы"] },
  "5945": { name: "Игрушки и хобби", desc: "Магазины детских игрушек, настольных игр, товаров для хобби", categories: ["детские товары*"] },
  "5942": { name: "Книжные магазины", desc: "Продажа книг, журналов, учебников, канцелярии", categories: ["книги"] },
  "5995": { name: "Зоомагазины", desc: "Продажа кормов, аксессуаров и товаров для домашних животных", categories: ["зоотовары"] }
};

// Типичные MCC коды для известных сетей и сервисов
const STORE_MCCS = {
  "магнит": "5411 (Супермаркеты)",
  "пятерочка": "5411 (Супермаркеты)",
  "ашан": "5411 (Супермаркеты)",
  "вкусвилл": "5411, 5499 (Супермаркеты / Продукты)",
  "дикси": "5411 (Супермаркеты)",
  "лента": "5411 (Супермаркеты)",
  "перекресток": "5411 (Супермаркеты)",
  "метро": "5411 (Супермаркеты)",
  "окей": "5411 (Супермаркеты)",
  "яндекс го": "4121 (Такси)",
  "uber": "4121 (Такси)",
  "yandex go": "4121 (Такси)",
  "додо": "5814 (Фастфуд)",
  "макдоналдс": "5814 (Фастфуд)",
  "вкусно и точка": "5814 (Фастфуд)",
  "kfc": "5814 (Фастфуд)",
  "ростикс": "5814 (Фастфуд)",
  "бургер кинг": "5814 (Фастфуд)",
  "самокат": "5411 (Супермаркеты)",
  "яндекс еда": "5812, 5814 (Рестораны / Доставка)",
  "дикси-доставка": "5411 (Супермаркеты)",
  "зоозавр": "5995 (Зоомагазины)",
  "четыре лапы": "5995 (Зоомагазины)",
  "леруа": "5200 (Строительные материалы)",
  "leroy": "5200 (Строительные материалы)",
  "оби": "5200 (Строительные материалы)",
  "obi": "5200 (Строительные материалы)",
  "спортмастер": "5941 (Спорттовары)",
  "wildberries": "5691, 5945 (Одежда / Игрушки)",
  "вайлдберриз": "5691, 5945 (Одежда / Игрушки)",
  "ozon": "5691, 5945 (Одежда / Игрушки)",
  "озон": "5691, 5945 (Одежда / Игрушки)",
  "аптека.ру": "5912 (Аптеки)",
  "ригла": "5912 (Аптеки)"
};

// Словарь синонимов и брендов для умного поиска по категориям
const SYNONYMS_MAP = {
  // Продукты / Супермаркеты
  "магнит": ["супермаркеты", "продукты"],
  "пятерочка": ["супермаркеты", "продукты"],
  "ашан": ["супермаркеты", "продукты"],
  "вкусвилл": ["супермаркеты", "продукты"],
  "дикси": ["дикси-доставка", "супермаркеты", "продукты"],
  "лента": ["супермаркеты", "продукты"],
  "перекресток": ["супермаркеты", "продукты"],
  "метро": ["супермаркеты", "продукты"],
  "окей": ["супермаркеты", "продукты"],
  "продукты": ["супермаркеты", "продукты"],
  "еда": ["супермаркеты", "фастфуд", "рестораны и доставки", "дикси-доставка", "яндекс еда и деливери"],
  
  // Общепит / Рестораны
  "бургер": ["фастфуд", "рестораны и доставки", "яндекс еда и деливери"],
  "макдоналдс": ["фастфуд", "рестораны и доставки"],
  "вкусно и точка": ["фастфуд", "рестораны и доставки"],
  "kfc": ["фастфуд", "рестораны и доставки"],
  "ростикс": ["фастфуд", "рестораны и доставки"],
  "додо": ["фастфуд", "рестораны и доставки"],
  "пицца": ["фастфуд", "рестораны и доставки", "яндекс еда и деливери"],
  "кафе": ["рестораны и доставки", "фастфуд"],
  "ресторан": ["рестораны и доставки"],
  "кофе": ["фастфуд", "рестораны и доставки"],
  "кофейня": ["фастфуд", "рестораны и доставки"],
  "суши": ["рестораны и доставки", "яндекс еда и деливери"],
  "роллы": ["рестораны и доставки", "яндекс еда и деливери"],
  "деливери": ["яндекс еда и деливери", "рестораны и доставки"],
  "доставка": ["рестораны и доставки", "дикси-доставка", "яндекс еда и деливери"],
  
  // Транспорт / Такси / Заправки
  "такси": ["такси", "заправки", "на все"],
  "taxi": ["такси", "заправки"],
  "uber": ["такси"],
  "яндекс го": ["такси"],
  "yandex go": ["такси"],
  "заправка": ["заправки"],
  "азс": ["заправки"],
  "бензин": ["заправки"],
  "луккойл": ["заправки"],
  "газпромнефть": ["заправки"],
  "роснефть": ["заправки"],
  "дизель": ["заправки"],
  "машина": ["заправки", "такси"],
  "авто": ["заправки", "такси"],
  
  // Одежда / Обувь
  "одежда": ["одежда", "спорттовары"],
  "обувь": ["одежда", "спорттовары"],
  "куртка": ["одежда", "спорттовары"],
  "джинсы": ["одежда"],
  "платье": ["одежда"],
  "кроссовки": ["спорттовары", "одежда"],
  "спортмастер": ["спорттовары"],
  "декатлон": ["спорттовары"],
  "wildberries": ["одежда", "детские товары*"],
  "вайлдберриз": ["одежда", "детские товары*"],
  "ozon": ["одежда", "детские товары*"],
  "озон": ["одежда", "детские товары*"],
  "lamoda": ["одежда"],
  "ламода": ["одежда"],
  
  // Аптеки / Здоровье / Красота
  "аптека": ["аптеки", "красота"],
  "лекарства": ["аптеки"],
  "таблетки": ["аптеки"],
  "ригла": ["аптеки"],
  "горздрав": ["аптеки"],
  "красота": ["красота"],
  "косметика": ["красота"],
  "салон красоты": ["красота"],
  "парикмахерская": ["красота"],
  "здоровье": ["аптеки", "красота"],
  
  // Развлечения / Культура / Книги
  "кино": ["развлечения", "билеты на концерты"],
  "театр": ["развлечения", "билеты на концерты"],
  "концерт": ["билеты на концерты", "развлечения"],
  "выставка": ["развлечения", "билеты на концерты"],
  "музей": ["развлечения"],
  "аттракционы": ["развлечения"],
  "игры": ["развлечения"],
  "книги": ["книги"],
  "литрес": ["книги", "развлечения"],
  "читай-город": ["книги"],
  "музыка": ["развлечения"],
  
  // Путешествия
  "жд": ["жд-билеты", "отели"],
  "поезд": ["жд-билеты"],
  "ржд": ["жд-билеты"],
  "билеты": ["жд-билеты", "билеты на концерты", "развлечения"],
  "самолет": ["отели", "жд-билеты"],
  "авиа": ["отели", "жд-билеты"],
  "отель": ["отели"],
  "гостиница": ["отели"],
  "хостел": ["отели"],
  
  // Дом и ремонт
  "дом": ["дом и ремонт"],
  "ремонт": ["дом и ремонт"],
  "мебель": ["дом и ремонт"],
  "леруа": ["дом и ремонт"],
  "leroy": ["дом и ремонт"],
  "обои": ["дом и ремонт"],
  "стройка": ["дом и ремонт"],
  
  // Цветы
  "цветы": ["цветы"],
  "букет": ["цветы"],
  "розы": ["цветы"],
  
  // Детские товары
  "детские": ["детские товары*"],
  "детский мир": ["детские товары*"],
  "игрушки": ["детские товары*"],
  "подгузники": ["детские товары*"],
  "памперсы": ["детские товары*"],

  // --- Новые тематические маппинги (для пользовательских категорий) ---
  // Рыбалка
  "спиннинг": ["рыбалка"],
  "спининг": ["рыбалка"],
  "удочка": ["рыбалка"],
  "леска": ["рыбалка"],
  "приманка": ["рыбалка"],
  "крючок": ["рыбалка"],
  "блесна": ["рыбалка"],
  "рыболов": ["рыбалка"],
  "рыба": ["рыбалка"],

  // Зоотовары
  "корм": ["зоотовары", "животные"],
  "кошка": ["зоотовары", "животные"],
  "собака": ["зоотовары", "животные"],
  "ветеринар": ["зоотовары"],
  "зоомагазин": ["зоотовары"],
  "наполнитель": ["зоотовары"],

  // Электроника
  "телефон": ["электроника", "техника"],
  "смартфон": ["электроника", "техника"],
  "ноутбук": ["электроника", "техника"],
  "компьютер": ["электроника", "техника"],
  "пк": ["электроника", "техника"],
  "наушники": ["электроника", "техника"],
  "телевизор": ["электроника", "техника"],
  "dns": ["электроника", "техника"],
  "мвидео": ["электроника", "техника"],
  "эльдорадо": ["электроника", "техника"],

  // Автоуслуги
  "мойка": ["автоуслуги", "авто"],
  "автомойка": ["автоуслуги", "авто"],
  "автосервис": ["автоуслуги", "авто"],
  "шиномонтаж": ["автоуслуги", "авто"],
  "запчасти": ["автоуслуги", "авто"],
  "шины": ["автоуслуги", "авто"],

  // Ювелирные изделия
  "золото": ["ювелирные изделия", "украшения"],
  "серебро": ["ювелирные изделия", "украшения"],
  "кольцо": ["ювелирные изделия", "украшения"],
  "серьги": ["ювелирные изделия", "украшения"],
  "браслет": ["ювелирные изделия", "украшения"],
  "sunlight": ["ювелирные изделия", "украшения"],
  "sokolov": ["ювелирные изделия", "украшения"]
};


// Состояние приложения
let state = {
  cards: [],
  subscriptions: [],
  payments: [],
  activeTab: "cashback-screen",
  sortMode: "date-asc", // Сортировка подписок: date-asc, date-desc, cost-asc, cost-desc
  userSynonyms: {} // Пользовательские синонимы, связанные вручную
};

let draggedCardId = null;
let cvvVisible = false;
let revealedCardIds = new Set();

// Инициализация данных
function initApp() {
  const storedCards = localStorage.getItem("cashback_cards");
  const storedSubs = localStorage.getItem("cashback_subs");
  const storedPayments = localStorage.getItem("cashback_payments");
  const storedUserSynonyms = localStorage.getItem("cashback_user_synonyms");

  state.cards = storedCards ? JSON.parse(storedCards) : DEFAULT_CARDS;
  state.subscriptions = storedSubs ? JSON.parse(storedSubs) : DEFAULT_SUBSCRIPTIONS;
  state.payments = storedPayments ? JSON.parse(storedPayments) : DEFAULT_PAYMENTS;
  state.userSynonyms = storedUserSynonyms ? JSON.parse(storedUserSynonyms) : {};
  state.sortMode = localStorage.getItem("sub_sort_mode") || "date-asc";

  updateMonthTitle();
  setupNavigation();
  renderCards();
  renderSubscriptions();
  renderPayments();
  setupEventListeners();
}

// Установка динамического названия месяца в заголовке
function updateMonthTitle() {
  const monthNamesPrepositional = [
    "январе", "феврале", "марте", "апреле", "мае", "июне",
    "июле", "августе", "сентябре", "октябре", "ноябре", "декабре"
  ];
  const currentMonthName = monthNamesPrepositional[new Date().getMonth()];
  const titleEl = document.getElementById("cashback-title");
  if (titleEl) {
    titleEl.textContent = `Кешбэк в ${currentMonthName}`;
  }
  
  // Подсчет общего сэкономленного кэшбэка
  const totalCashback = state.cards.reduce((sum, card) => sum + (Number(card.accumulated) || 0), 0);
  const subtitleEl = document.querySelector("#cashback-screen .subtitle");
  if (subtitleEl) {
    subtitleEl.innerHTML = `Ваши карты • Сэкономлено: <strong>${totalCashback.toLocaleString('ru-RU')} ₽</strong>`;
  }
}

// -------------------------------------------------------------
// Рендеринг интерфейса
// -------------------------------------------------------------

// Функция генерации SVG-логотипа платежной системы
function getNetworkLogoSvg(network) {
  if (!network) return '';
  switch (network.toLowerCase()) {
    case 'mir':
      return `
        <svg viewBox="0 0 400 120" class="network-logo logo-mir" width="37" height="11">
          <defs>
            <linearGradient id="mir-gradient" x1="370" x2="290" gradientUnits="userSpaceOnUse">
              <stop stop-color="#1F5CD7"/>
              <stop stop-color="#02AEFF" offset="1"/>
            </linearGradient>
          </defs>
          <path d="m31 13h33c3 0 12-1 16 13 3 9 7 23 13 44h2c6-22 11-37 13-44 4-14 14-13 18-13h31v96h-32v-57h-2l-17 57h-24l-17-57h-3v57h-31m139-96h32v57h3l21-47c4-9 13-10 13-10h30v96h-32v-57h-2l-21 47c-4 9-14 10-14 10h-30m142-29v29h-30v-50h98c-4 12-18 21-34 21" fill="#0f754e"/>
          <path d="m382 53c4-18-8-40-34-40h-68c2 21 20 40 39 40" fill="url(#mir-gradient)"/>
        </svg>
      `;
    case 'visa':
      return `
        <svg viewBox="0 0 100 40" class="network-logo logo-visa" width="32" height="13">
          <text x="10" y="30" font-family="'Outfit', sans-serif" font-weight="900" font-style="italic" font-size="28" fill="currentColor">VISA</text>
        </svg>
      `;
    case 'mastercard':
      return `
        <svg viewBox="0 0 100 40" class="network-logo logo-mastercard" width="28" height="16">
          <circle cx="35" cy="20" r="16" fill="#eb001b" opacity="0.95"/>
          <circle cx="58" cy="20" r="16" fill="#ff5f00" opacity="0.95"/>
        </svg>
      `;
    case 'unionpay':
      return `
        <svg viewBox="0 0 100 40" class="network-logo logo-unionpay" width="32" height="13">
          <rect x="15" y="8" width="70" height="24" rx="4" fill="#00707b"/>
          <text x="50" y="25" font-family="sans-serif" font-weight="bold" font-size="11" fill="#fff" text-anchor="middle">UnionPay</text>
        </svg>
      `;
    default:
      return '';
  }
}

// Отрисовка карточек кэшбэка
function renderCards() {
  const container = document.getElementById("cards-container");
  container.innerHTML = "";

  state.cards.forEach((card, index) => {
    const hasNetworkLogo = card.network && card.network !== 'none';
    const cardEl = document.createElement("div");
    cardEl.className = `bank-card ${card.bankClass} ${hasNetworkLogo ? 'has-network-logo' : ''}`;
    cardEl.setAttribute("draggable", "true");
    cardEl.setAttribute("data-id", card.id);
    
    // Предотвращаем клик при перетаскивании или нажатии на кнопки перемещения/реквизиты
    cardEl.onclick = (e) => {
      if (e.target.closest('.card-move-btn') || e.target.closest('.card-credentials-bar')) return;
      openCardModal(card.id);
    };

    const categoriesHtml = card.categories
      .map(cat => `
        <div class="category-item">
          <span class="category-name">${cat.name}</span>
          <span class="category-percent">${cat.value}%</span>
        </div>
      `).join("");

    // Формируем блок реквизитов, если введен номер карты
    let credentialsBarHtml = "";
    if (card.number) {
      const cleanNum = card.number.replace(/\s+/g, '');
      const lastFour = cleanNum.slice(-4);
      const isRevealed = revealedCardIds.has(card.id);
      
      let displayNumber = "";
      if (isRevealed) {
        let formatted = "";
        for (let i = 0; i < cleanNum.length; i++) {
          if (i > 0 && i % 4 === 0) formatted += " ";
          formatted += cleanNum[i];
        }
        displayNumber = formatted;
      } else {
        displayNumber = cleanNum.length > 4 ? `•••• •••• •••• ${lastFour}` : `•••• ${lastFour}`;
      }

      const displayCvv = isRevealed ? (card.cvv || '•••') : '•••';
      
      const eyeIconSvg = `<svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" stroke-width="2.5" fill="none"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>`;
      const eyeOffIconSvg = `<svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" stroke-width="2.5" fill="none"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>`;

      credentialsBarHtml = `
        <div class="card-credentials-bar" title="Реквизиты карты (клик для копирования)">
          <div class="card-cred-number" onclick="copyCardNumberDirect('${card.id}', event)" title="Скопировать номер карты">
            <span>${displayNumber}</span>
            <svg class="copy-small-icon" viewBox="0 0 24 24" width="10" height="10" stroke="currentColor" stroke-width="2.5" fill="none"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
          </div>
          <div class="card-cred-details">
            <span class="card-cred-expiry" onclick="copyCardExpiryDirect('${card.id}', event)" title="Скопировать срок действия">
              ${card.expiry || 'MM/YY'}
            </span>
            <span class="card-cred-cvv" onclick="copyCardCvvDirect('${card.id}', event)" title="Скопировать CVV-код">
              CVV: ${displayCvv}
            </span>
            <button class="card-cred-toggle" onclick="toggleCardReveal('${card.id}', event)" title="Показать/скрыть реквизиты">
              ${isRevealed ? eyeOffIconSvg : eyeIconSvg}
            </button>
          </div>
        </div>
      `;
    }

    // Логотип платежной системы
    const networkLogoHtml = card.network && card.network !== 'none' 
      ? `<div class="card-network-container">${getNetworkLogoSvg(card.network)}</div>`
      : '';

    cardEl.innerHTML = `
      <div class="card-header-visual">
        <span class="bank-name">${card.bankName}</span>
        <div class="card-actions-row">
          ${card.accumulated ? `<span class="card-cashback-badge">🎁 ${card.accumulated} ₽</span>` : ''}
          <button class="card-move-btn" onclick="moveCardUp('${card.id}', event)" title="Переместить вверх">↑</button>
          <button class="card-move-btn" onclick="moveCardDown('${card.id}', event)" title="Переместить вниз">↓</button>
          <span class="card-label">${card.cardType}</span>
        </div>
      </div>
      ${credentialsBarHtml}
      <div class="categories-list">
        ${categoriesHtml}
      </div>
      ${networkLogoHtml}
    `;
    container.appendChild(cardEl);
  });

  // Навешиваем обработчики Drag & Drop
  setupCardDragAndDrop();

  // Обновление выпадающего списка карт в форме подписок
  updateCardSelectOptions();

  // Если активен поиск, обновляем результаты поиска
  const searchInput = document.getElementById("search-input");
  if (searchInput && searchInput.value.trim()) {
    handleSearch(searchInput.value);
  }
}

// Перемещение карт стрелочками
window.moveCardUp = (cardId, event) => {
  event.stopPropagation();
  const index = state.cards.findIndex(c => c.id === cardId);
  if (index > 0) {
    const temp = state.cards[index];
    state.cards[index] = state.cards[index - 1];
    state.cards[index - 1] = temp;
    localStorage.setItem("cashback_cards", JSON.stringify(state.cards));
    renderCards();
  }
};

window.moveCardDown = (cardId, event) => {
  event.stopPropagation();
  const index = state.cards.findIndex(c => c.id === cardId);
  if (index !== -1 && index < state.cards.length - 1) {
    const temp = state.cards[index];
    state.cards[index] = state.cards[index + 1];
    state.cards[index + 1] = temp;
    localStorage.setItem("cashback_cards", JSON.stringify(state.cards));
    renderCards();
  }
};

window.toggleCardReveal = (cardId, event) => {
  event.stopPropagation();
  if (revealedCardIds.has(cardId)) {
    revealedCardIds.delete(cardId);
  } else {
    revealedCardIds.add(cardId);
  }
  
  const searchInput = document.getElementById("search-input");
  if (searchInput && searchInput.value.trim()) {
    handleSearch(searchInput.value);
  } else {
    renderCards();
  }
};

// Сохранение пользовательских связок в LocalStorage
function saveUserSynonyms() {
  localStorage.setItem("cashback_user_synonyms", JSON.stringify(state.userSynonyms));
}

// Возвращает список всех уникальных категорий, созданных пользователем на картах
function getAllUniqueCategories() {
  const categories = new Set();
  state.cards.forEach(card => {
    card.categories.forEach(cat => {
      // Исключаем базовые "На все", так как они и так выходят по умолчанию
      const nameLower = cat.name.toLowerCase();
      if (nameLower !== "на все" && nameLower !== "все покупки" && nameLower !== "все") {
        categories.add(cat.name);
      }
    });
  });
  return Array.from(categories).sort();
}

// Связывает поисковый запрос с категорией
function linkQueryToCategory(query, category) {
  const cleanQ = query.toLowerCase().trim();
  if (!cleanQ) return;
  
  if (!state.userSynonyms[cleanQ]) {
    state.userSynonyms[cleanQ] = [];
  }
  if (!state.userSynonyms[cleanQ].includes(category)) {
    state.userSynonyms[cleanQ].push(category);
  }
  saveUserSynonyms();
}

// Функция поиска по кешбэку
function handleSearch(query) {
  const cardsContainer = document.getElementById("cards-container");
  const resultsContainer = document.getElementById("search-results-container");
  const clearBtn = document.getElementById("btn-clear-search");
  
  const cleanQuery = query.toLowerCase().trim();
  
  if (!cleanQuery) {
    // Если запрос пустой, показываем сетку карт и скрываем результаты
    if (clearBtn) clearBtn.style.display = "none";
    if (cardsContainer) cardsContainer.style.display = "flex";
    if (resultsContainer) {
      resultsContainer.style.display = "none";
      resultsContainer.innerHTML = "";
    }
    return;
  }
  
  // Показываем кнопку очистки
  if (clearBtn) clearBtn.style.display = "flex";
  
  // Определяем, какие категории нас интересуют
  const targetCategories = new Set();

  // Проверяем, является ли запрос 4-значным MCC-кодом
  const isMccQuery = /^\d{4}$/.test(cleanQuery);
  let mccInfoHtml = "";
  
  if (isMccQuery) {
    const mccInfo = MCC_DIRECTORY[cleanQuery];
    if (mccInfo) {
      // Автоматически добавляем категории этого MCC в список целей поиска
      mccInfo.categories.forEach(cat => targetCategories.add(cat.toLowerCase()));
      
      const displayCategory = mccInfo.categories.map(c => c.charAt(0).toUpperCase() + c.slice(1)).join(", ");
      mccInfoHtml = `
        <div class="mcc-info-card">
          <div class="mcc-info-card-badge">Справка по MCC</div>
          <div class="mcc-info-card-title">MCC ${cleanQuery}: ${mccInfo.name}</div>
          <div class="mcc-info-card-desc">${mccInfo.desc}</div>
          <div class="mcc-info-card-category">🏷️ Категории кэшбэка: ${displayCategory}</div>
        </div>
      `;
    }
  }

  // Ищем типичный MCC для магазина
  let storeMccHint = "";
  if (!isMccQuery) {
    for (const [store, mccStr] of Object.entries(STORE_MCCS)) {
      if (cleanQuery.includes(store) || store.includes(cleanQuery)) {
        storeMccHint = ` (обычно MCC: ${mccStr})`;
        break;
      }
    }
  }
  
  // 1. Поиск точных или частичных совпадений в словаре синонимов
  for (const [key, categories] of Object.entries(SYNONYMS_MAP)) {
    if (key.includes(cleanQuery) || cleanQuery.includes(key)) {
      categories.forEach(cat => targetCategories.add(cat.toLowerCase()));
    }
  }

  // 1.5. Поиск точных или частичных совпадений в пользовательском словаре синонимов
  if (state.userSynonyms) {
    for (const [key, categories] of Object.entries(state.userSynonyms)) {
      if (key === cleanQuery || key.includes(cleanQuery) || cleanQuery.includes(key)) {
        categories.forEach(cat => targetCategories.add(cat.toLowerCase()));
      }
    }
  }
  
  // 2. Также добавляем сам запрос в качестве возможной категории
  targetCategories.add(cleanQuery);
  
  // Собираем результаты по всем картам
  const results = [];
  
  state.cards.forEach(card => {
    let bestMatch = null;
    
    // Ищем лучшее совпадение среди повышенных категорий карты
    card.categories.forEach(cat => {
      const catNameLower = cat.name.toLowerCase();
      
      // Проверяем прямое совпадение или совпадение через синонимы
      let isMatch = false;
      
      // Проверка 1: Категория карты содержит наш поисковый запрос (например "Спорт" в "Спорттовары")
      if (catNameLower.includes(cleanQuery)) {
        isMatch = true;
      }
      
      // Проверка 2: Категория карты совпадает с категориями из словаря синонимов
      if (targetCategories.has(catNameLower) || targetCategories.has(catNameLower.replace(/[\*\s]/g, ''))) {
        isMatch = true;
      }
      
      if (isMatch) {
        if (!bestMatch || cat.value > bestMatch.value) {
          bestMatch = {
            categoryName: cat.name,
            value: cat.value
          };
        }
      }
    });
    
    // Если повышенных категорий не найдено, проверяем базовую "На все"
    if (!bestMatch) {
      const baseCat = card.categories.find(cat => 
        cat.name.toLowerCase() === "на все" || 
        cat.name.toLowerCase() === "все покупки" || 
        cat.name.toLowerCase() === "все"
      );
      if (baseCat) {
        bestMatch = {
          categoryName: baseCat.name,
          value: baseCat.value,
          isBase: true
        };
      }
    }
    
    if (bestMatch) {
      results.push({
        card: card,
        categoryName: bestMatch.categoryName,
        value: bestMatch.value,
        isBase: bestMatch.isBase || false
      });
    }
  });
  
  // Сортируем: сначала те, у которых больше процент кэшбэка
  results.sort((a, b) => b.value - a.value);
  
  // Скрываем обычную сетку и показываем результаты
  if (cardsContainer) cardsContainer.style.display = "none";
  if (resultsContainer) {
    resultsContainer.style.display = "flex";
    renderSearchResults(results, query, mccInfoHtml, storeMccHint);
  }
}

// Вспомогательная функция для получения HTML формы связывания
function getLinkFormHtml(query) {
  const uniqueCats = getAllUniqueCategories();
  if (uniqueCats.length === 0) return "";
  
  const optionsHtml = uniqueCats.map(cat => `<option value="${escapeHtml(cat)}">${escapeHtml(cat)}</option>`).join("");
  return `
    <div class="search-link-helper" style="margin-top: 20px; padding: 16px; background: rgba(255,255,255,0.02); border: 1px dashed var(--border-color); border-radius: 12px; text-align: left;">
      <p style="font-size: 13px; font-weight: 600; margin-bottom: 10px; color: var(--text-primary);">
        Связать запрос «${escapeHtml(query.trim())}» с категорией:
      </p>
      <div style="display: flex; gap: 8px;">
        <select id="search-link-select" style="padding: 8px 12px; font-size: 13px; border-radius: 8px; flex: 1; background: var(--bg-secondary); border: 1px solid var(--border-color); color: #fff;">
          ${optionsHtml}
        </select>
        <button id="btn-link-search" class="btn btn-primary" style="padding: 8px 16px; font-size: 13px; border-radius: 8px; width: auto; height: auto; display: inline-flex;">Связать</button>
      </div>
    </div>
  `;
}

// Вспомогательная функция для привязки события кнопки "Связать"
function bindLinkButton(query) {
  const btnLink = document.getElementById("btn-link-search");
  if (btnLink) {
    btnLink.onclick = () => {
      const select = document.getElementById("search-link-select");
      if (select) {
        const selectedCat = select.value;
        linkQueryToCategory(query, selectedCat);
        // Сразу запускаем поиск заново, чтобы отобразить результат!
        handleSearch(query);
        showCopyNotification(`Запрос связан с категорией "${selectedCat}"`);
      }
    };
  }
}

// Отрисовка результатов поиска
function renderSearchResults(results, query, mccInfoHtml = "", storeMccHint = "") {
  const container = document.getElementById("search-results-container");
  container.innerHTML = "";

  // Если есть карточка информации по MCC, выводим её в самом верху!
  if (mccInfoHtml) {
    const mccDiv = document.createElement("div");
    mccDiv.innerHTML = mccInfoHtml;
    container.appendChild(mccDiv);
  }

  const hasElevatedMatch = results.some(item => !item.isBase);

  if (results.length === 0) {
    const linkUiHtml = getLinkFormHtml(query);
    container.innerHTML = `
      <div class="no-results-card">
        <svg viewBox="0 0 24 24" width="48" height="48" stroke="currentColor" stroke-width="1.5" fill="none" style="margin-bottom: 12px; opacity: 0.5;">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          <line x1="8" y1="11" x2="14" y2="11"></line>
        </svg>
        <p>Ничего не найдено по запросу <strong>"${escapeHtml(query.trim())}"</strong></p>
        <p style="font-size: 12px; margin-top: 8px; opacity: 0.7; max-width: 280px; margin-left: auto; margin-right: auto;">
          Вы можете привязать это слово к любой из ваших категорий кэшбэка, чтобы поиск находил её в будущем.
        </p>
        ${linkUiHtml}
      </div>
    `;

    bindLinkButton(query);
    return;
  }

  // Заголовок хит-парада
  const titleEl = document.createElement("div");
  titleEl.className = "search-results-title";
  titleEl.textContent = `Лучший кэшбэк по запросу: "${query.trim()}"${storeMccHint}`;
  container.appendChild(titleEl);

  results.forEach((item, index) => {
    const isBest = index === 0 && item.value > 0;
    const card = item.card;
    const resultItem = document.createElement("div");
    resultItem.className = `search-result-item ${isBest ? 'best-choice' : ''}`;
    
    // Предотвращаем клик, если нажали на реквизиты или копирование
    resultItem.onclick = (e) => {
      if (e.target.closest('.search-result-credentials') || e.target.closest('.btn-copy-visual') || e.target.closest('.card-cred-toggle')) return;
      openCardModal(card.id);
    };

    // Блок реквизитов, если они есть
    let credentialsHtml = "";
    if (card.number) {
      const cleanNum = card.number.replace(/\s+/g, '');
      const lastFour = cleanNum.slice(-4);
      const isRevealed = revealedCardIds.has(card.id);
      
      let displayNumber = "";
      if (isRevealed) {
        let formatted = "";
        for (let i = 0; i < cleanNum.length; i++) {
          if (i > 0 && i % 4 === 0) formatted += " ";
          formatted += cleanNum[i];
        }
        displayNumber = formatted;
      } else {
        displayNumber = cleanNum.length > 4 ? `•••• •••• •••• ${lastFour}` : `•••• ${lastFour}`;
      }

      const displayCvv = isRevealed ? (card.cvv || '•••') : '•••';
      const eyeIconSvg = `<svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" stroke-width="2.5" fill="none"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>`;
      const eyeOffIconSvg = `<svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" stroke-width="2.5" fill="none"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>`;

      credentialsHtml = `
        <div class="search-result-credentials" title="Реквизиты карты">
          <div class="search-result-number" onclick="copyCardNumberDirect('${card.id}', event)" title="Скопировать номер">
            <span>${displayNumber}</span>
            <svg class="copy-small-icon" viewBox="0 0 24 24" width="10" height="10" stroke="currentColor" stroke-width="2.5" fill="none"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
          </div>
          <div class="search-result-details">
            <span class="search-result-expiry" onclick="copyCardExpiryDirect('${card.id}', event)" title="Скопировать срок">
              ${card.expiry || 'MM/YY'}
            </span>
            <span class="search-result-cvv" onclick="copyCardCvvDirect('${card.id}', event)" title="Скопировать CVV">
              CVV: ${displayCvv}
            </span>
            <button class="card-cred-toggle" onclick="toggleCardReveal('${card.id}', event)" title="Показать/скрыть реквизиты" style="background:none; border:none; color:inherit; cursor:pointer; display:flex; align-items:center; padding:0 2px;">
              ${isRevealed ? eyeOffIconSvg : eyeIconSvg}
            </button>
          </div>
        </div>
      `;
    }

    resultItem.innerHTML = `
      <div class="search-result-main">
        <div class="search-result-left">
          <div class="bank-badge-dot ${card.bankClass}"></div>
          <div class="search-result-info">
            <span class="search-result-card-name">${card.name} (${card.bankName})</span>
            <span class="search-result-category">в категории "${item.categoryName}"</span>
          </div>
        </div>
        <div class="search-result-right">
          <span class="search-result-percent">${item.value}%</span>
        </div>
      </div>
      ${credentialsHtml}
    `;
    container.appendChild(resultItem);
  });

  // Если нет повышенных категорий, а только базовые (1%), то выводим форму связывания внизу списка!
  if (!hasElevatedMatch) {
    const linkDiv = document.createElement("div");
    linkDiv.innerHTML = getLinkFormHtml(query);
    container.appendChild(linkDiv);
    bindLinkButton(query);
  }
}

// Вспомогательная функция для экранирования HTML
function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Генерация справочника MCC кодов
function renderMccGuide() {
  const container = document.getElementById("mcc-guide-container");
  if (!container) return;
  container.innerHTML = "";
  
  const groups = {
    "🛒 Супермаркеты и продукты": ["5411", "5499"],
    "🍔 Общепит (кафе, фастфуд, бары)": ["5812", "5813", "5814"],
    "🚕 Транспорт и такси": ["4121", "4111"],
    "⛽ Авто и АЗС": ["5541", "5542"],
    "💊 Здоровье и аптеки": ["5912"],
    "💄 Красота и уход": ["5977", "7230"],
    "👕 Одежда и обувь": ["5691", "5621", "5651", "5661"],
    "⚽ Спорт и фитнес": ["5941"],
    "✈️ Путешествия и отели": ["4112", "4511", "7011"],
    "🏠 Дом, мебель и ремонт": ["5200", "5712"],
    "🎨 Развлечения, цветы, хобби, книги": ["7996", "7832", "5992", "5945", "5942", "5995"]
  };
  
  for (const [groupTitle, codes] of Object.entries(groups)) {
    const groupEl = document.createElement("div");
    groupEl.className = "mcc-guide-group";
    
    const titleEl = document.createElement("div");
    titleEl.className = "mcc-guide-group-title";
    titleEl.textContent = groupTitle;
    groupEl.appendChild(titleEl);
    
    const itemsEl = document.createElement("div");
    itemsEl.className = "mcc-guide-items";
    
    codes.forEach(code => {
      const info = MCC_DIRECTORY[code];
      if (!info) return;
      
      const itemEl = document.createElement("div");
      itemEl.className = "mcc-guide-item";
      itemEl.style.cursor = "pointer";
      itemEl.title = "Кликните, чтобы вставить в поиск";
      
      const displayCategory = info.categories.map(c => c.charAt(0).toUpperCase() + c.slice(1)).join(", ");
      
      itemEl.innerHTML = `
        <div class="mcc-guide-item-code">${code}</div>
        <div class="mcc-guide-item-info">
          <span class="mcc-guide-item-name">${info.name}</span>
          <span class="mcc-guide-item-desc">${info.desc}</span>
        </div>
        <span class="mcc-guide-item-category">${displayCategory}</span>
      `;
      
      itemEl.onclick = () => {
        const searchInput = document.getElementById("search-input");
        if (searchInput) {
          searchInput.value = code;
          handleSearch(code);
          closeModal("mcc-modal");
        }
      };
      
      itemsEl.appendChild(itemEl);
    });
    
    groupEl.appendChild(itemsEl);
    container.appendChild(groupEl);
  }
}

// Настройка Drag & Drop для десктопа
function setupCardDragAndDrop() {
  const cards = document.querySelectorAll(".bank-card");
  
  cards.forEach(card => {
    card.addEventListener("dragstart", (e) => {
      draggedCardId = card.getAttribute("data-id");
      card.classList.add("dragging");
      e.dataTransfer.effectAllowed = "move";
    });

    card.addEventListener("dragover", (e) => {
      e.preventDefault();
      card.classList.add("dragging-over");
    });

    card.addEventListener("dragleave", () => {
      card.classList.remove("dragging-over");
    });

    card.addEventListener("drop", (e) => {
      e.preventDefault();
      card.classList.remove("dragging-over");
      const targetId = card.getAttribute("data-id");
      
      if (draggedCardId && draggedCardId !== targetId) {
        const indexDrag = state.cards.findIndex(c => c.id === draggedCardId);
        const indexTarget = state.cards.findIndex(c => c.id === targetId);
        
        if (indexDrag !== -1 && indexTarget !== -1) {
          // Меняем местами в массиве
          const temp = state.cards[indexDrag];
          state.cards[indexDrag] = state.cards[indexTarget];
          state.cards[indexTarget] = temp;
          
          localStorage.setItem("cashback_cards", JSON.stringify(state.cards));
          renderCards();
        }
      }
    });

    card.addEventListener("dragend", () => {
      card.classList.remove("dragging");
      cards.forEach(c => c.classList.remove("dragging-over"));
    });
  });
}

// Отрисовка списка подписок
function renderSubscriptions() {
  const container = document.getElementById("subs-container");
  container.innerHTML = "";

  // Сортировка подписок
  const sortedSubs = [...state.subscriptions].sort((a, b) => {
    if (state.sortMode === "date-asc") {
      return new Date(a.date) - new Date(b.date);
    } else if (state.sortMode === "date-desc") {
      return new Date(b.date) - new Date(a.date);
    } else if (state.sortMode === "cost-desc") {
      return Number(b.cost) - Number(a.cost);
    } else if (state.sortMode === "cost-asc") {
      return Number(a.cost) - Number(b.cost);
    }
    return 0;
  });

  // Расчет суммарных расходов за месяц
  let totalMonthly = 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  sortedSubs.forEach(sub => {
    // Подсчет суммы
    if (sub.period === "monthly") {
      totalMonthly += Number(sub.cost);
    } else if (sub.period === "yearly") {
      totalMonthly += Math.round(Number(sub.cost) / 12);
    }

    // Определение критичности даты (ближайшие 3 дня)
    const subDate = new Date(sub.date);
    const diffTime = subDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const isUpcoming = diffDays >= 0 && diffDays <= 3;

    // Поиск привязанной карты для пилла
    const linkedCard = state.cards.find(c => c.id === sub.cardId) || { name: "Не указана", bankClass: "default" };

    const cardEl = document.createElement("div");
    cardEl.className = `sub-card ${isUpcoming ? "warning" : ""}`;
    cardEl.onclick = () => openSubModal(sub.id);

    // Локализация даты платежа
    const dateOptions = { day: 'numeric', month: 'short' };
    const formattedDate = subDate.toLocaleDateString('ru-RU', dateOptions);

    let warningPill = "";
    if (isUpcoming) {
      warningPill = diffDays === 0 ? "Сегодня" : (diffDays === 1 ? "Завтра" : `Через ${diffDays} дн.`);
    }

    cardEl.innerHTML = `
      <div class="sub-left">
        <span class="sub-title">${sub.name}</span>
        <div class="sub-info">
          <span class="date-pill">${isUpcoming ? warningPill : formattedDate}</span>
          <span class="card-pill ${linkedCard.bankClass}-pill">${linkedCard.name}</span>
        </div>
      </div>
      <div class="sub-right">
        <span class="sub-price">${sub.cost} ₽</span>
        <span class="sub-period-text">${sub.period === "monthly" ? "в месяц" : "в год"}</span>
      </div>
    `;
    container.appendChild(cardEl);
  });

  // Обновление сводки
  document.getElementById("total-spend").textContent = `${totalMonthly.toLocaleString('ru-RU')} ₽`;
  document.getElementById("sub-count").textContent = getSubscriptionCountWord(state.subscriptions.length);
}

// Склонение слова "подписка"
function getSubscriptionCountWord(count) {
  if (count % 10 === 1 && count % 100 !== 11) return `${count} подписка`;
  if ([2, 3, 4].includes(count % 10) && ![12, 13, 14].includes(count % 100)) return `${count} подписки`;
  return `${count} подписок`;
}

// Отрисовка списка важных платежей
function renderPayments() {
  const container = document.getElementById("payments-container");
  if (!container) return;
  container.innerHTML = "";

  // Сортировка по дате (ближайшие в начале)
  const sortedPayments = [...state.payments].sort((a, b) => {
    return new Date(a.date) - new Date(b.date);
  });

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let upcomingCount = 0;
  let overdueCount = 0;

  sortedPayments.forEach(pay => {
    const payDate = new Date(pay.date);
    payDate.setHours(0, 0, 0, 0);

    const diffTime = payDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    const isOverdue = diffDays < 0;
    const isNear = diffDays >= 0 && diffDays <= 7;

    if (isOverdue) overdueCount++;
    if (isNear) upcomingCount++;

    // Локализация даты
    const dateOptions = { day: 'numeric', month: 'short' };
    const formattedDate = payDate.toLocaleDateString('ru-RU', dateOptions);

    let statusText = "";
    if (isOverdue) {
      const absDays = Math.abs(diffDays);
      statusText = absDays === 1 ? "Вчера" : `Просрочено на ${absDays} дн.`;
    } else if (diffDays === 0) {
      statusText = "Сегодня";
    } else if (diffDays === 1) {
      statusText = "Завтра";
    } else if (diffDays <= 7) {
      statusText = `Через ${diffDays} дн.`;
    } else {
      statusText = `Через ${diffDays} дн.`;
    }

    const cardEl = document.createElement("div");
    cardEl.className = `payment-card type-${pay.type} ${isOverdue ? "overdue" : ""}`;
    cardEl.onclick = () => openPaymentModal(pay.id);

    // Подбор иконки на основе типа
    let iconSvg = "";
    if (pay.type === "credit") {
      // Иконка кредитной карты
      iconSvg = `<svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2.5" fill="none"><rect x="2" y="5" width="20" height="14" rx="2" ry="2"></rect><line x1="2" y1="10" x2="22" y2="10"></line></svg>`;
    } else if (pay.type === "debt") {
      // Иконка долга (пользователь со стрелкой/часами)
      iconSvg = `<svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2.5" fill="none"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><polyline points="17 11 19 13 23 9"></polyline></svg>`;
    } else if (pay.type === "savings") {
      // Иконка вклада (сейф или график)
      iconSvg = `<svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2.5" fill="none"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>`;
    }

    cardEl.innerHTML = `
      <div class="payment-card-content">
        <div class="payment-icon-wrapper">
          ${iconSvg}
        </div>
        <div class="payment-details">
          <span class="payment-title">${pay.name}</span>
          <div class="payment-meta">
            <span class="payment-date-pill">${formattedDate}</span>
            ${pay.note ? `<span class="payment-note-pill">${pay.note}</span>` : ""}
          </div>
        </div>
      </div>
      <div class="payment-right">
        <span class="payment-price">${pay.amount.toLocaleString('ru-RU')} ₽</span>
        <span class="payment-status-text">${statusText}</span>
      </div>
    `;

    container.appendChild(cardEl);
  });

  // Обновление сводки на экране
  const summaryValEl = document.getElementById("payments-summary-value");
  const summarySubEl = document.getElementById("payments-summary-sub");
  
  if (summaryValEl && summarySubEl) {
    if (overdueCount > 0) {
      summaryValEl.textContent = overdueCount;
      summaryValEl.style.color = "#ff4a4a";
      summarySubEl.textContent = `Внимание! Требуется действие для ${overdueCount} просроченных событий`;
      summarySubEl.style.color = "#ff4a4a";
    } else if (upcomingCount > 0) {
      summaryValEl.textContent = upcomingCount;
      summaryValEl.style.color = ""; // Сброс цвета
      summarySubEl.textContent = `Важных событий в ближайшие 7 дней: ${upcomingCount}`;
      summarySubEl.style.color = "";
    } else {
      summaryValEl.textContent = "0";
      summaryValEl.style.color = "";
      summarySubEl.textContent = "Нет важных событий в ближайшие 7 дней";
      summarySubEl.style.color = "";
    }
  }
}

// Заполнение выпадающего списка карт
function updateCardSelectOptions() {
  const select = document.getElementById("sub-card");
  select.innerHTML = "";
  state.cards.forEach(card => {
    const opt = document.createElement("option");
    opt.value = card.id;
    opt.textContent = card.name;
    select.appendChild(opt);
  });
}

// -------------------------------------------------------------
// Взаимодействие и навигация
// -------------------------------------------------------------
function setupNavigation() {
  const navItems = document.querySelectorAll(".nav-item");
  const screens = document.querySelectorAll(".screen");

  navItems.forEach(item => {
    item.addEventListener("click", () => {
      const targetScreenId = item.getAttribute("data-screen");
      
      // Переключаем активный таб на кнопках
      navItems.forEach(btn => btn.classList.remove("active"));
      item.classList.add("active");

      // Переключаем экраны
      screens.forEach(screen => {
        if (screen.id === targetScreenId) {
          screen.classList.add("active");
        } else {
          screen.classList.remove("active");
        }
      });
      
      state.activeTab = targetScreenId;
    });
  });
}

// -------------------------------------------------------------
// Работа с модальными окнами
// -------------------------------------------------------------

// Открытие модалки карты
let currentCardEditingId = null;

function openCardModal(cardId = null) {
  currentCardEditingId = cardId;
  cvvVisible = false;
  
  const deleteBtn = document.getElementById("btn-delete-card");
  const listContainer = document.getElementById("modal-categories-list");
  listContainer.innerHTML = "";
  
  if (cardId) {
    // Редактирование
    const card = state.cards.find(c => c.id === cardId);
    if (!card) return;

    document.getElementById("modal-card-title").textContent = "Изменить карту";
    document.getElementById("edit-card-bank").value = card.bankName || "";
    document.getElementById("edit-card-name").value = card.name || "";
    document.getElementById("edit-card-type").value = card.cardType || "";
    document.getElementById("edit-card-number").value = card.number || "";
    document.getElementById("edit-card-expiry").value = card.expiry || "";
    document.getElementById("edit-card-cvv").value = card.cvv || "";
    document.getElementById("edit-card-accumulated").value = card.accumulated || "";
    document.getElementById("edit-card-theme").value = card.bankClass || "mts";
    document.getElementById("edit-card-network").value = card.network || "none";

    card.categories.forEach(cat => {
      addCategoryRow(cat.name, cat.value);
    });

    deleteBtn.style.display = "block";
  } else {
    // Добавление новой
    document.getElementById("modal-card-title").textContent = "Новая карта";
    document.getElementById("edit-card-bank").value = "";
    document.getElementById("edit-card-name").value = "";
    document.getElementById("edit-card-type").value = "";
    document.getElementById("edit-card-number").value = "";
    document.getElementById("edit-card-expiry").value = "";
    document.getElementById("edit-card-cvv").value = "";
    document.getElementById("edit-card-accumulated").value = "";
    document.getElementById("edit-card-theme").value = "mts";
    document.getElementById("edit-card-network").value = "none";

    addCategoryRow("", 0); // Добавим одну пустую категорию по умолчанию

    deleteBtn.style.display = "none";
  }

  // Обновить визуальный превью
  syncCardPreview();
  openModal("card-modal");
}

function syncCardPreview() {
  const bankName = document.getElementById("edit-card-bank").value.trim() || "БАНК";
  const cardType = document.getElementById("edit-card-type").value.trim() || "Тип карты";
  const theme = document.getElementById("edit-card-theme").value;
  const network = document.getElementById("edit-card-network").value;
  
  // Форматирование номера карты
  let numVal = document.getElementById("edit-card-number").value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
  let formattedNum = "";
  for (let i = 0; i < numVal.length; i++) {
    if (i > 0 && i % 4 === 0) formattedNum += " ";
    formattedNum += numVal[i];
  }
  document.getElementById("edit-card-number").value = formattedNum;

  // Форматирование срока действия
  let expVal = document.getElementById("edit-card-expiry").value.replace(/\//g, '').replace(/[^0-9]/gi, '');
  if (expVal.length > 2) {
    document.getElementById("edit-card-expiry").value = expVal.substring(0, 2) + '/' + expVal.substring(2, 4);
  } else {
    document.getElementById("edit-card-expiry").value = expVal;
  }

  // Форматирование CVV
  let cvvVal = document.getElementById("edit-card-cvv").value.replace(/[^0-9]/gi, '').substring(0, 3);
  document.getElementById("edit-card-cvv").value = cvvVal;

  // Вывод на превью карты
  document.getElementById("modal-card-bank-name").textContent = bankName.toUpperCase();
  document.getElementById("modal-card-type-name").textContent = cardType;
  
  let maskNum = "•••• •••• •••• ••••";
  if (formattedNum) {
    maskNum = formattedNum;
  }
  document.getElementById("modal-card-number-display").textContent = maskNum;
  document.getElementById("modal-card-expiry-display").textContent = document.getElementById("edit-card-expiry").value || "MM/YY";
  document.getElementById("modal-card-cvv-display").textContent = cvvVisible ? (cvvVal || "•••") : "•••";

  const visualCard = document.getElementById("modal-card-visual");
  visualCard.className = `bank-card-visual ${theme}`;

  // Обновление логотипа в превью модалки
  let networkLogoContainer = document.getElementById("modal-card-network-logo");
  if (!networkLogoContainer) {
    const bottomContainer = document.querySelector("#modal-card-visual .card-visual-bottom");
    if (bottomContainer) {
      networkLogoContainer = document.createElement("div");
      networkLogoContainer.className = "card-visual-network";
      networkLogoContainer.id = "modal-card-network-logo";
      bottomContainer.appendChild(networkLogoContainer);
    }
  }
  if (networkLogoContainer) {
    networkLogoContainer.innerHTML = getNetworkLogoSvg(network);
  }
}

function addCategoryRow(name = "", value = 0) {
  const listContainer = document.getElementById("modal-categories-list");
  const row = document.createElement("div");
  row.className = "category-edit-row";
  row.innerHTML = `
    <input type="text" class="input-cat-name" value="${name}" placeholder="Название категории" required>
    <input type="number" class="input-cat-value" value="${value}" placeholder="%" required min="0" max="100">
    <span class="percent-symbol">%</span>
    <button class="btn-delete-row" onclick="this.parentElement.remove()">&times;</button>
  `;
  listContainer.appendChild(row);
}

// Сохранение изменений в карте
function saveCardEdits() {
  const bankNameInput = document.getElementById("edit-card-bank").value.trim();
  const cardNameInput = document.getElementById("edit-card-name").value.trim();
  const cardTypeInput = document.getElementById("edit-card-type").value.trim();
  const themeInput = document.getElementById("edit-card-theme").value;
  const networkInput = document.getElementById("edit-card-network").value;
  const numberInput = document.getElementById("edit-card-number").value.trim();
  const expiryInput = document.getElementById("edit-card-expiry").value.trim();
  const cvvInput = document.getElementById("edit-card-cvv").value.trim();
  const accumulatedInput = parseInt(document.getElementById("edit-card-accumulated").value, 10) || 0;

  if (!bankNameInput || !cardNameInput || !cardTypeInput) {
    alert("Пожалуйста, заполните название банка, карты и ее тип.");
    return;
  }

  const rows = document.querySelectorAll("#modal-categories-list .category-edit-row");
  const newCategories = [];
  
  let isValid = true;
  rows.forEach(row => {
    const name = row.querySelector(".input-cat-name").value.trim();
    const value = row.querySelector(".input-cat-value").value;
    
    if (name && value !== "") {
      newCategories.push({
        name: name,
        value: parseInt(value, 10)
      });
    } else if (name || value !== "") {
      isValid = false;
    }
  });

  if (!isValid) {
    alert("Пожалуйста, заполните и название категории, и процент кэшбэка.");
    return;
  }

  if (currentCardEditingId) {
    // Редактирование существующей
    const card = state.cards.find(c => c.id === currentCardEditingId);
    if (card) {
      card.name = cardNameInput;
      card.bankName = bankNameInput.toUpperCase();
      card.cardType = cardTypeInput;
      card.bankClass = themeInput;
      card.network = networkInput;
      card.number = numberInput;
      card.expiry = expiryInput;
      card.cvv = cvvInput;
      card.accumulated = accumulatedInput;
      card.categories = newCategories;
    }
  } else {
    // Добавление новой карты
    const newId = "card_" + Date.now();
    state.cards.push({
      id: newId,
      name: cardNameInput,
      bankName: bankNameInput.toUpperCase(),
      cardType: cardTypeInput,
      bankClass: themeInput,
      network: networkInput,
      number: numberInput,
      expiry: expiryInput,
      cvv: cvvInput,
      accumulated: accumulatedInput,
      categories: newCategories
    });
  }

  localStorage.setItem("cashback_cards", JSON.stringify(state.cards));
  
  updateMonthTitle(); // Обновить общую сумму в шапке
  renderCards();
  renderSubscriptions(); // Обновить подписки на случай пересчета
  closeModal("card-modal");
}

// Удаление карты
function deleteCard() {
  if (!currentCardEditingId) return;

  if (confirm("Вы действительно хотите удалить эту карту? Это отвяжет её от привязанных подписок.")) {
    // Удаляем карту
    state.cards = state.cards.filter(c => c.id !== currentCardEditingId);
    localStorage.setItem("cashback_cards", JSON.stringify(state.cards));

    // Обновляем подписки, которые ссылались на эту карту
    state.subscriptions.forEach(sub => {
      if (sub.cardId === currentCardEditingId) {
        sub.cardId = ""; // Сбрасываем привязанную карту
      }
    });
    localStorage.setItem("cashback_subs", JSON.stringify(state.subscriptions));

    renderCards();
    renderSubscriptions();
    closeModal("card-modal");
  }
}

// Копирование реквизитов напрямую с главного экрана
window.copyCardNumberDirect = (cardId, event) => {
  event.stopPropagation();
  const card = state.cards.find(c => c.id === cardId);
  if (card && card.number) {
    const cleanNum = card.number.replace(/\s+/g, '');
    navigator.clipboard.writeText(cleanNum);
    showCopyNotification("Номер карты скопирован");
  }
};

window.copyCardExpiryDirect = (cardId, event) => {
  event.stopPropagation();
  const card = state.cards.find(c => c.id === cardId);
  if (card && card.expiry) {
    navigator.clipboard.writeText(card.expiry);
    showCopyNotification("Срок действия скопирован");
  }
};

window.copyCardCvvDirect = (cardId, event) => {
  event.stopPropagation();
  const card = state.cards.find(c => c.id === cardId);
  if (card && card.cvv) {
    navigator.clipboard.writeText(card.cvv);
    showCopyNotification("CVV-код скопирован");
  }
};

// Копирование и отображение CVV
function setupCopyActions() {
  document.getElementById("btn-copy-number").onclick = () => {
    const num = document.getElementById("edit-card-number").value.replace(/\s+/g, '');
    if (num) {
      navigator.clipboard.writeText(num);
      showCopyNotification("Номер карты скопирован");
    }
  };

  document.getElementById("btn-copy-expiry").onclick = () => {
    const exp = document.getElementById("edit-card-expiry").value;
    if (exp) {
      navigator.clipboard.writeText(exp);
      showCopyNotification("Срок действия скопирован");
    }
  };

  document.getElementById("btn-copy-cvv").onclick = () => {
    const cvv = document.getElementById("edit-card-cvv").value;
    if (cvv) {
      navigator.clipboard.writeText(cvv);
      showCopyNotification("CVV-код скопирован");
    }
  };

  document.getElementById("btn-toggle-cvv").onclick = () => {
    cvvVisible = !cvvVisible;
    const cvvInputVal = document.getElementById("edit-card-cvv").value || "";
    document.getElementById("modal-card-cvv-display").textContent = cvvVisible ? (cvvInputVal || "•••") : "•••";
    
    const btn = document.getElementById("btn-toggle-cvv");
    if (cvvVisible) {
      btn.innerHTML = `<svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" stroke-width="2.5" fill="none"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>`;
    } else {
      btn.innerHTML = `<svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" stroke-width="2.5" fill="none"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>`;
    }
  };
}

function showCopyNotification(message) {
  const existing = document.querySelector(".toast-notification");
  if (existing) existing.remove();

  const toast = document.createElement("div");
  toast.className = "toast-notification";
  toast.style.position = "fixed";
  toast.style.bottom = "100px";
  toast.style.left = "50%";
  toast.style.transform = "translateX(-50%)";
  toast.style.background = "rgba(99, 102, 241, 0.9)";
  toast.style.color = "#fff";
  toast.style.padding = "10px 20px";
  toast.style.borderRadius = "10px";
  toast.style.fontSize = "13px";
  toast.style.fontWeight = "600";
  toast.style.zIndex = "2000";
  toast.style.backdropFilter = "blur(8px)";
  toast.style.boxShadow = "0 8px 16px rgba(0,0,0,0.3)";
  toast.style.animation = "fadeIn 0.2s ease";
  toast.textContent = message;
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.style.animation = "fadeOut 0.2s ease forwards";
    setTimeout(() => toast.remove(), 200);
  }, 1800);
}

// Открытие модалки подписки
function openSubModal(subId = null) {
  const form = document.getElementById("sub-form");
  form.reset();

  const deleteBtn = document.getElementById("btn-delete-sub");

  if (subId) {
    // Редактирование
    const sub = state.subscriptions.find(s => s.id === subId);
    if (!sub) return;

    document.getElementById("modal-sub-title").textContent = "Изменить подписку";
    document.getElementById("edit-sub-id").value = sub.id;
    document.getElementById("sub-name").value = sub.name;
    document.getElementById("sub-cost").value = sub.cost;
    document.getElementById("sub-period").value = sub.period;
    document.getElementById("sub-date").value = sub.date;
    document.getElementById("sub-card").value = sub.cardId;

    deleteBtn.style.display = "block";
  } else {
    // Добавление новой
    document.getElementById("modal-sub-title").textContent = "Новая подписка";
    document.getElementById("edit-sub-id").value = "";
    deleteBtn.style.display = "none";
    
    // Установка сегодняшней даты по умолчанию
    const todayStr = new Date().toISOString().split("T")[0];
    document.getElementById("sub-date").value = todayStr;
  }

  openModal("sub-modal");
}

// Сохранение / Добавление подписки
function saveSubscription() {
  const form = document.getElementById("sub-form");
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const id = document.getElementById("edit-sub-id").value;
  const name = document.getElementById("sub-name").value.trim();
  const cost = parseInt(document.getElementById("sub-cost").value, 10);
  const period = document.getElementById("sub-period").value;
  const date = document.getElementById("sub-date").value;
  const cardId = document.getElementById("sub-card").value;

  if (id) {
    // Редактирование существующей
    const subIndex = state.subscriptions.findIndex(s => s.id === id);
    if (subIndex !== -1) {
      state.subscriptions[subIndex] = { id, name, cost, period, date, cardId };
    }
  } else {
    // Добавление новой
    const newId = "sub_" + Date.now();
    state.subscriptions.push({ id: newId, name, cost, period, date, cardId });
  }

  localStorage.setItem("cashback_subs", JSON.stringify(state.subscriptions));
  renderSubscriptions();
  closeModal("sub-modal");
}

// Удаление подписки
function deleteSubscription() {
  const id = document.getElementById("edit-sub-id").value;
  if (!id) return;

  if (confirm("Вы действительно хотите удалить эту подписку?")) {
    state.subscriptions = state.subscriptions.filter(s => s.id !== id);
    localStorage.setItem("cashback_subs", JSON.stringify(state.subscriptions));
    renderSubscriptions();
    closeModal("sub-modal");
  }
}

// Открытие модалки платежа
function openPaymentModal(paymentId = null) {
  const form = document.getElementById("payment-form");
  form.reset();

  const deleteBtn = document.getElementById("btn-delete-payment");

  if (paymentId) {
    // Редактирование
    const pay = state.payments.find(p => p.id === paymentId);
    if (!pay) return;

    document.getElementById("modal-payment-title").textContent = "Изменить платеж";
    document.getElementById("edit-payment-id").value = pay.id;
    document.getElementById("payment-type").value = pay.type;
    document.getElementById("payment-name").value = pay.name;
    document.getElementById("payment-amount").value = pay.amount;
    document.getElementById("payment-date").value = pay.date;
    document.getElementById("payment-note").value = pay.note || "";

    deleteBtn.style.display = "block";
  } else {
    // Добавление нового
    document.getElementById("modal-payment-title").textContent = "Новый платеж";
    document.getElementById("edit-payment-id").value = "";
    deleteBtn.style.display = "none";
    
    // Установка сегодняшней даты по умолчанию
    const todayStr = new Date().toISOString().split("T")[0];
    document.getElementById("payment-date").value = todayStr;
  }

  openModal("payment-modal");
}

// Сохранение / Добавление платежа
function savePayment() {
  const form = document.getElementById("payment-form");
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const id = document.getElementById("edit-payment-id").value;
  const type = document.getElementById("payment-type").value;
  const name = document.getElementById("payment-name").value.trim();
  const amount = parseInt(document.getElementById("payment-amount").value, 10);
  const date = document.getElementById("payment-date").value;
  const note = document.getElementById("payment-note").value.trim();

  if (id) {
    // Редактирование существующего
    const payIndex = state.payments.findIndex(p => p.id === id);
    if (payIndex !== -1) {
      state.payments[payIndex] = { id, type, name, amount, date, note };
    }
  } else {
    // Добавление нового
    const newId = "pay_" + Date.now();
    state.payments.push({ id: newId, type, name, amount, date, note });
  }

  localStorage.setItem("cashback_payments", JSON.stringify(state.payments));
  renderPayments();
  closeModal("payment-modal");
}

// Удаление платежа
function deletePayment() {
  const id = document.getElementById("edit-payment-id").value;
  if (!id) return;

  if (confirm("Вы действительно хотите удалить этот платеж?")) {
    state.payments = state.payments.filter(p => p.id !== id);
    localStorage.setItem("cashback_payments", JSON.stringify(state.payments));
    renderPayments();
    closeModal("payment-modal");
  }
}

// Вспомогательные функции для модалок
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.classList.add("active");
  document.body.style.overflow = "hidden"; // Блокируем прокрутку фона
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.classList.remove("active");
  document.body.style.overflow = ""; // Разблокируем прокрутку фона
}

// -------------------------------------------------------------
// ОБЛАЧНАЯ СИНХРОНИЗАЦИЯ ДАННЫХ
// -------------------------------------------------------------
let isSyncing = false;

async function pushDataToCloud() {
  if (isSyncing) return;
  const key = localStorage.getItem("sync_key");
  if (!key) return;

  const data = {
    cashback_cards: JSON.parse(localStorage.getItem("cashback_cards") || "[]"),
    cashback_subs: JSON.parse(localStorage.getItem("cashback_subs") || "[]"),
    cashback_payments: JSON.parse(localStorage.getItem("cashback_payments") || "[]"),
    cashback_user_synonyms: JSON.parse(localStorage.getItem("cashback_user_synonyms") || "{}")
  };

  try {
    const response = await fetch('/api/sync', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key, data })
    });
    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.error || 'Ошибка сохранения');
    }
    console.log('Данные успешно сохранены в облаке Vercel KV!');
  } catch (error) {
    console.error('Ошибка авто-сохранения в облако:', error);
  }
}

async function pullDataFromCloud(key) {
  if (!key) return false;
  
  try {
    const res = await fetch(`/api/sync?key=${encodeURIComponent(key)}`);
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Ошибка загрузки');
    }
    const result = await res.json();
    
    if (result.found && result.data) {
      const data = result.data;
      
      isSyncing = true; // Отключаем перехват во время загрузки
      
      if (data.cashback_cards) {
        localStorage.setItem("cashback_cards", JSON.stringify(data.cashback_cards));
        state.cards = data.cashback_cards;
      }
      if (data.cashback_subs) {
        localStorage.setItem("cashback_subs", JSON.stringify(data.cashback_subs));
        state.subscriptions = data.cashback_subs;
      }
      if (data.cashback_payments) {
        localStorage.setItem("cashback_payments", JSON.stringify(data.cashback_payments));
        state.payments = data.cashback_payments;
      }
      if (data.cashback_user_synonyms) {
        localStorage.setItem("cashback_user_synonyms", JSON.stringify(data.cashback_user_synonyms));
        state.userSynonyms = data.cashback_user_synonyms;
      }
      
      isSyncing = false;
      
      // Обновляем UI
      renderCards();
      renderSubscriptions();
      renderPayments();
      updateMonthTitle();
      
      return true;
    }
    return false;
  } catch (error) {
    console.error('Ошибка загрузки данных из облака:', error);
    throw error;
  }
}

// Перехват записи в localStorage для авто-синхронизации
const originalSetItem = localStorage.setItem;
localStorage.setItem = function(key, value) {
  originalSetItem.apply(this, arguments);
  if (["cashback_cards", "cashback_subs", "cashback_payments", "cashback_user_synonyms"].includes(key)) {
    pushDataToCloud();
  }
};

function initSyncUI() {
  const syncKeyInput = document.getElementById("sync-key-input");
  const saveSyncKeyBtn = document.getElementById("btn-save-sync-key");
  const syncActiveActions = document.getElementById("sync-active-actions");
  const syncNowBtn = document.getElementById("btn-sync-now");
  const disconnectSyncBtn = document.getElementById("btn-disconnect-sync");
  const statusMsg = document.getElementById("settings-status-msg");

  const storedKey = localStorage.getItem("sync_key");

  function showStatus(text, isError = false) {
    if (!statusMsg) return;
    statusMsg.style.display = "block";
    statusMsg.style.color = isError ? "#f44336" : "#4caf50";
    statusMsg.innerText = text;
  }

  if (storedKey) {
    if (syncKeyInput) {
      syncKeyInput.value = storedKey;
      syncKeyInput.disabled = true;
    }
    if (saveSyncKeyBtn) saveSyncKeyBtn.style.display = "none";
    if (syncActiveActions) syncActiveActions.style.display = "flex";
  } else {
    if (syncKeyInput) {
      syncKeyInput.value = "";
      syncKeyInput.disabled = false;
    }
    if (saveSyncKeyBtn) saveSyncKeyBtn.style.display = "block";
    if (syncActiveActions) syncActiveActions.style.display = "none";
  }

  if (saveSyncKeyBtn && syncKeyInput) {
    saveSyncKeyBtn.onclick = async () => {
      const key = syncKeyInput.value.trim();
      if (!key) {
        showStatus("Введите ключ!", true);
        return;
      }

      saveSyncKeyBtn.disabled = true;
      showStatus("Подключение к облаку...");

      try {
        const hasData = await pullDataFromCloud(key);
        localStorage.setItem("sync_key", key); // Сохраняем только при успехе
        
        if (hasData) {
          showStatus("Успешно подключено! Загружены данные из облака.");
        } else {
          showStatus("Создан новый ключ! Выгрузка локальных данных...");
          await pushDataToCloud();
          showStatus("Успешно подключено! Локальные данные сохранены в облако.");
        }

        setTimeout(() => {
          location.reload();
        }, 1500);

      } catch (err) {
        localStorage.removeItem("sync_key");
        saveSyncKeyBtn.disabled = false;
        showStatus("Ошибка подключения! Проверьте Storage в Vercel.", true);
      }
    };
  }

  if (disconnectSyncBtn) {
    disconnectSyncBtn.onclick = () => {
      localStorage.removeItem("sync_key");
      showStatus("Синхронизация отключена! Перезагрузка...");
      setTimeout(() => {
        location.reload();
      }, 1200);
    };
  }

  if (syncNowBtn) {
    syncNowBtn.onclick = async () => {
      const key = localStorage.getItem("sync_key");
      if (!key) return;

      syncNowBtn.disabled = true;
      showStatus("Синхронизация...");
      try {
        await pullDataFromCloud(key);
        showStatus("Успешно синхронизировано!");
        setTimeout(() => {
          statusMsg.style.display = "none";
          syncNowBtn.disabled = false;
        }, 2000);
      } catch (err) {
        showStatus("Ошибка загрузки данных!", true);
        syncNowBtn.disabled = false;
      }
    };
  }
}

// -------------------------------------------------------------
// События
// -------------------------------------------------------------
function setupEventListeners() {
  // Закрытие модалок при клике на крестик или бэкдроп
  document.getElementById("btn-close-card").onclick = () => closeModal("card-modal");
  document.getElementById("btn-close-sub").onclick = () => closeModal("sub-modal");
  document.getElementById("btn-close-mcc").onclick = () => closeModal("mcc-modal");
  document.getElementById("btn-close-payment").onclick = () => closeModal("payment-modal");
  document.getElementById("btn-close-settings").onclick = () => closeModal("settings-modal");

  document.querySelectorAll(".modal-backdrop").forEach(backdrop => {
    backdrop.onclick = (e) => {
      const modal = e.target.closest(".modal");
      if (modal) closeModal(modal.id);
    };
  });

  // Действия в модалках
  document.getElementById("btn-save-card").onclick = saveCardEdits;
  document.getElementById("btn-delete-card").onclick = deleteCard;
  document.getElementById("btn-add-category-row").onclick = () => addCategoryRow();
  document.getElementById("btn-save-sub").onclick = saveSubscription;
  document.getElementById("btn-delete-sub").onclick = deleteSubscription;
  document.getElementById("btn-save-payment").onclick = savePayment;
  document.getElementById("btn-delete-payment").onclick = deletePayment;

  // Добавление подписки (FAB)
  document.getElementById("btn-add-sub").onclick = () => openSubModal();

  // Добавление платежа (FAB)
  document.getElementById("btn-add-payment").onclick = () => openPaymentModal();

  // Добавление новой карты
  document.getElementById("btn-add-card").onclick = () => openCardModal();

  // Живое превью в форме карты и форматирование данных
  document.getElementById("edit-card-bank").oninput = syncCardPreview;
  document.getElementById("edit-card-type").oninput = syncCardPreview;
  document.getElementById("edit-card-number").oninput = syncCardPreview;
  document.getElementById("edit-card-expiry").oninput = syncCardPreview;
  document.getElementById("edit-card-cvv").oninput = syncCardPreview;
  document.getElementById("edit-card-theme").onchange = syncCardPreview;
  document.getElementById("edit-card-network").onchange = syncCardPreview;

  // Инициализация кнопок копирования
  setupCopyActions();

  // Сортировка подписок
  const sortSelect = document.getElementById("btn-sort");
  if (sortSelect) {
    sortSelect.value = state.sortMode || "date-asc";
    sortSelect.onchange = (e) => {
      state.sortMode = e.target.value;
      localStorage.setItem("sub_sort_mode", state.sortMode);
      renderSubscriptions();
    };
  }

  // Обработка поиска по кешбэку
  const searchInput = document.getElementById("search-input");
  const clearSearchBtn = document.getElementById("btn-clear-search");
  
  if (searchInput) {
    searchInput.oninput = (e) => {
      handleSearch(e.target.value);
    };
  }
  
  if (clearSearchBtn) {
    clearSearchBtn.onclick = () => {
      if (searchInput) {
        searchInput.value = "";
        handleSearch("");
        searchInput.focus();
      }
    };
  }

  // Кнопка вызова справочника MCC
  const mccBtn = document.getElementById("btn-mcc-guide");
  if (mccBtn) {
    mccBtn.onclick = () => {
      renderMccGuide();
      openModal("mcc-modal");
    };
  }

  // Кнопка вызова настроек
  const openSettingsBtn = document.getElementById("btn-open-settings");
  if (openSettingsBtn) {
    openSettingsBtn.onclick = () => {
      openModal("settings-modal");
    };
  }

  // Экспорт данных
  const exportBtn = document.getElementById("btn-export-data");
  if (exportBtn) {
    exportBtn.onclick = () => {
      const data = {
        cashback_cards: JSON.parse(localStorage.getItem("cashback_cards") || "[]"),
        cashback_subs: JSON.parse(localStorage.getItem("cashback_subs") || "[]"),
        cashback_payments: JSON.parse(localStorage.getItem("cashback_payments") || "[]"),
        cashback_user_synonyms: JSON.parse(localStorage.getItem("cashback_user_synonyms") || "{}")
      };
      
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `cashback_backup_${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    };
  }

  // Импорт данных
  const importTriggerBtn = document.getElementById("btn-import-trigger");
  const importInput = document.getElementById("import-file-input");
  if (importTriggerBtn && importInput) {
    importTriggerBtn.onclick = () => {
      importInput.click();
    };

    importInput.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = function(evt) {
        try {
          const data = JSON.parse(evt.target.result);
          
          if (data.cashback_cards) {
            localStorage.setItem("cashback_cards", JSON.stringify(data.cashback_cards));
          }
          if (data.cashback_subs) {
            localStorage.setItem("cashback_subs", JSON.stringify(data.cashback_subs));
          }
          if (data.cashback_payments) {
            localStorage.setItem("cashback_payments", JSON.stringify(data.cashback_payments));
          }
          if (data.cashback_user_synonyms) {
            localStorage.setItem("cashback_user_synonyms", JSON.stringify(data.cashback_user_synonyms));
          }
          
          const statusMsg = document.getElementById("settings-status-msg");
          if (statusMsg) {
            statusMsg.style.display = "block";
            statusMsg.style.color = "#4caf50";
            statusMsg.innerText = "Данные успешно импортированы! Перезагрузка...";
          }
          
          setTimeout(() => {
            location.reload();
          }, 1500);
          
        } catch (err) {
          console.error("Ошибка импорта:", err);
          const statusMsg = document.getElementById("settings-status-msg");
          if (statusMsg) {
            statusMsg.style.display = "block";
            statusMsg.style.color = "#f44336";
            statusMsg.innerText = "Ошибка: неверный формат файла!";
          }
        }
      };
      reader.readAsText(file);
    };
  }

  // Инициализация интерфейса синхронизации
  initSyncUI();
}

// Инициализация при загрузке страницы
window.onload = () => {
  initApp();
  
  // Автозагрузка данных из облака при наличии ключа
  const storedKey = localStorage.getItem("sync_key");
  if (storedKey) {
    pullDataFromCloud(storedKey).catch(err => console.error("Ошибка автозагрузки при запуске:", err));
  }
  
  // Автоматическое управление Service Worker (выключен на localhost для разработки, включен в сети)
  if ('serviceWorker' in navigator) {
    const isLocal = window.location.hostname === 'localhost' || 
                    window.location.hostname === '127.0.0.1' || 
                    window.location.protocol === 'file:';
                    
    if (isLocal) {
      navigator.serviceWorker.getRegistrations().then(registrations => {
        for (let registration of registrations) {
          registration.unregister().then(() => {
            console.log('Service Worker временно отключен на локальном хосте для разработки');
          });
        }
      });
    } else {
      navigator.serviceWorker.register('./sw.js')
        .then(reg => console.log('Service Worker успешно зарегистрирован!', reg.scope))
        .catch(err => console.error('Ошибка регистрации Service Worker:', err));
    }
  }
};
