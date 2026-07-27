// Данные по умолчанию (если нет в localStorage)
const DEFAULT_CARDS = [
  {
    id: "yandex",
    name: "Яндекс Карта",
    bankClass: "yandex",
    bankName: "ЯНДЕКС БАНК",
    cardType: "Плюс",
    network: "mir",
    categories: [
      { name: "Все покупки", value: 2 },
      { name: "Яндекс Такси (Комфорт, Комфорт+, Ultima)", value: 5 },
      { name: "Яндекс Лавка", value: 5 },
      { name: "Яндекс Еда и Деливери", value: 100 },
      { name: "Самокаты", value: 7 }
    ]
  },
  {
    id: "mts_debit",
    name: "МТС Банк (дебет)",
    bankClass: "mts",
    bankName: "МТС БАНК",
    cardType: "Дебетовая",
    network: "visa",
    categories: [
      { name: "Супермаркеты", value: 5 },
      { name: "Здоровье", value: 3 },
      { name: "Рестораны", value: 5 },
      { name: "Техника", value: 7 },
      { name: "Спорттовары", value: 5 }
    ]
  },
  {
    id: "mts_credit",
    name: "МТС Банк (кредит)",
    bankClass: "mts",
    bankName: "МТС БАНК",
    cardType: "Кредитная",
    network: "mastercard",
    categories: [
      { name: "Супермаркеты", value: 5 },
      { name: "Рестораны и доставка еды", value: 3 },
      { name: "Фастфуд", value: 3 },
      { name: "Одежда", value: 3 },
      { name: "Детские товары", value: 3 },
      { name: "Все покупки", value: 1 }
    ]
  },
  {
    id: "tinkoff",
    name: "Т-Банк",
    bankClass: "tinkoff",
    bankName: "Т-БАНК",
    cardType: "Black",
    network: "mir",
    categories: [
      { name: "Все покупки", value: 1 },
      { name: "Аптеки", value: 5 },
      { name: "Одежда и обувь", value: 5 },
      { name: "Развлечения", value: 5 }
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
      { name: "Цветы", value: 5 },
      { name: "Красота", value: 5 },
      { name: "Дикси Доставка", value: 20 },
      { name: "Цифровые товары", value: 6 }
    ]
  },
  {
    id: "vtb",
    name: "ВТБ",
    bankClass: "vtb",
    bankName: "ВТБ",
    cardType: "Дебетовая",
    network: "mir",
    categories: [
      { name: "Кафе и рестораны", value: 5 },
      { name: "Почта России", value: 10 },
      { name: "Театры и кино", value: 15 },
      { name: "Все остальные покупки", value: 1 },
      { name: "Транспорт", value: 5 }
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
  cashbackHistory: [], // [{ id, monthKey, label, totalCashback, byCard, timestamp }]
  deposits: [], // [{ id, bank, name, amount, rate, payoutDay, calcType, history }]
  analyticsPeriod: 'month', // 'month', '3months', '6months', 'all'
  activeTab: "cashback-screen",
  sortMode: "date-asc", // Сортировка подписок: date-asc, date-desc, cost-asc, cost-desc
  userSynonyms: {} // Пользовательские синонимы, связанные вручную
};

let draggedCardId = null;
let cvvVisible = false;
let revealedCardIds = new Set();

// Функция миграции категорий карт на новые значения за июль
function migrateCardCategories(cards) {
  if (!Array.isArray(cards)) return false;
  
  const newCategoriesMap = {
    yandex: [
      { name: "Все покупки", value: 2 },
      { name: "Яндекс Такси (Комфорт, Комфорт+, Ultima)", value: 5 },
      { name: "Яндекс Лавка", value: 5 },
      { name: "Яндекс Еда и Деливери", value: 100 },
      { name: "Самокаты", value: 7 }
    ],
    mts_debit: [
      { name: "Супермаркеты", value: 5 },
      { name: "Здоровье", value: 3 },
      { name: "Рестораны", value: 5 },
      { name: "Техника", value: 7 },
      { name: "Спорттовары", value: 5 }
    ],
    mts_credit: [
      { name: "Супермаркеты", value: 5 },
      { name: "Рестораны и доставка еды", value: 3 },
      { name: "Фастфуд", value: 3 },
      { name: "Одежда", value: 3 },
      { name: "Детские товары", value: 3 },
      { name: "Все покупки", value: 1 }
    ],
    tinkoff: [
      { name: "Все покупки", value: 1 },
      { name: "Аптеки", value: 5 },
      { name: "Одежда и обувь", value: 5 },
      { name: "Развлечения", value: 5 }
    ],
    alfa: [
      { name: "Цветы", value: 5 },
      { name: "Красота", value: 5 },
      { name: "Дикси Доставка", value: 20 },
      { name: "Цифровые товары", value: 6 }
    ],
    vtb: [
      { name: "Кафе и рестораны", value: 5 },
      { name: "Почта России", value: 10 },
      { name: "Театры и кино", value: 15 },
      { name: "Все остальные покупки", value: 1 },
      { name: "Транспорт", value: 5 }
    ]
  };

  let updatedAny = false;
  cards.forEach(card => {
    let key = null;
    if (card.bankClass === "yandex" || card.id === "yandex") key = "yandex";
    else if (card.id === "mts_credit" || (card.bankClass === "mts" && (card.cardType === "Кредитная" || card.name.toLowerCase().includes("кредит") || card.name.toLowerCase().includes("деньги")))) key = "mts_credit";
    else if (card.bankClass === "mts" || card.id === "mts" || card.id === "mts_debit" || card.id?.startsWith("mts_")) key = "mts_debit";
    else if (card.bankClass === "tinkoff" || card.id === "tinkoff") key = "tinkoff";
    else if (card.bankClass === "alfa" || card.id === "alfa") key = "alfa";
    else if (card.bankClass === "vtb" || card.id === "vtb") key = "vtb";

    if (key && newCategoriesMap[key]) {
      const currentCategoriesStr = JSON.stringify(card.categories);
      const newCategoriesStr = JSON.stringify(newCategoriesMap[key]);
      if (currentCategoriesStr !== newCategoriesStr) {
        card.categories = newCategoriesMap[key];
        updatedAny = true;
      }
    }
  });

  return updatedAny;
}

// Инициализация данных
function initApp() {
  const storedCards = localStorage.getItem("cashback_cards");
  const storedSubs = localStorage.getItem("cashback_subs");
  const storedPayments = localStorage.getItem("cashback_payments");
  const storedUserSynonyms = localStorage.getItem("cashback_user_synonyms");
  const storedHistory = localStorage.getItem("cashback_history");
  const storedDeposits = localStorage.getItem("cashback_deposits");

  state.cards = storedCards ? JSON.parse(storedCards) : DEFAULT_CARDS;
  state.subscriptions = storedSubs ? JSON.parse(storedSubs) : DEFAULT_SUBSCRIPTIONS;
  state.payments = storedPayments ? JSON.parse(storedPayments) : DEFAULT_PAYMENTS;
  state.userSynonyms = storedUserSynonyms ? JSON.parse(storedUserSynonyms) : {};
  state.cashbackHistory = storedHistory ? JSON.parse(storedHistory) : [];
  state.deposits = storedDeposits ? JSON.parse(storedDeposits) : [];
  state.sortMode = localStorage.getItem("sub_sort_mode") || "date-asc";

  // Запуск миграции для локально загруженных карт (выполняется только один раз для версии v4)
  if (!localStorage.getItem("cashback_v4_categories_updated")) {
    const didMigrate = migrateCardCategories(state.cards);
    if (didMigrate) {
      localStorage.setItem("cashback_cards", JSON.stringify(state.cards));
    }
    // Если облачная синхронизация отключена, сразу помечаем миграцию как выполненную
    if (!localStorage.getItem("sync_key")) {
      localStorage.setItem("cashback_v4_categories_updated", "true");
    }
  }

  updateMonthTitle();
  setupNavigation();
  renderCards();
  renderSubscriptions();
  renderPayments();
  renderAnalytics();
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
    subtitleEl.innerHTML = `Сэкономлено: <strong>${totalCashback.toLocaleString('ru-RU')} ₽</strong>`;
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
    saveState("cashback_cards", JSON.stringify(state.cards));
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
    saveState("cashback_cards", JSON.stringify(state.cards));
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
  saveState("cashback_user_synonyms", JSON.stringify(state.userSynonyms));
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
          
          saveState("cashback_cards", JSON.stringify(state.cards));
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

// Генерация градиента на основе имени подписки для уникальной fallback иконки
function getGradientByName(name) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue1 = Math.abs(hash) % 360;
  const hue2 = (hue1 + 40) % 360;
  return `linear-gradient(135deg, hsl(${hue1}, 70%, 55%) 0%, hsl(${hue2}, 75%, 45%) 100%)`;
}

// Автоматическое определение бренда и категории по имени подписки
function getSubscriptionBrand(name) {
  const lowerName = name.toLowerCase();
  
  let category = "Другое";
  let logoHtml = "";

  if (lowerName.includes("янндекс") || lowerName.includes("яндекс") || lowerName.includes("yandex")) {
    category = "Экосистема";
    logoHtml = `<div style="background: #E60000; color: #fff; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; font-family: var(--font-title); font-weight: 800; font-size: 22px;">Я</div>`;
  } else if (lowerName.includes("spotify")) {
    category = "Музыка";
    logoHtml = `<div style="background: #1DB954; color: #fff; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; font-family: var(--font-title); font-weight: 800; font-size: 20px;">S</div>`;
  } else if (lowerName.includes("netflix")) {
    category = "Видео";
    logoHtml = `<div style="background: #000; color: #E50914; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; font-family: var(--font-title); font-weight: 800; font-size: 22px;">N</div>`;
  } else if (lowerName.includes("youtube") || lowerName.includes("ютуб")) {
    category = "Видео";
    logoHtml = `<div style="background: #FF0000; color: #fff; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;"><svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M8 5v14l11-7z"/></svg></div>`;
  } else if (lowerName.includes("telegram") || lowerName.includes("телеграм")) {
    category = "Общение";
    logoHtml = `<div style="background: #229ED9; color: #fff; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4Z"/></svg></div>`;
  } else if (lowerName.includes("apple") || lowerName.includes("icloud") || lowerName.includes("айклауд")) {
    category = "Экосистема";
    logoHtml = `<div style="background: #1a1a1a; color: #fff; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;"><svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-.96.04-2.13.64-2.82 1.45-.6.69-1.12 1.83-.98 2.94.1.08.2.12.3.12.92 0 2.01-.59 2.51-1.45z"/></svg></div>`;
  } else if (lowerName.includes("chatgpt") || lowerName.includes("openai") || lowerName.includes("gpt") || lowerName.includes("клауд") || lowerName.includes("claude")) {
    category = "ИИ / Софт";
    logoHtml = `<div style="background: #10a37f; color: #fff; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; font-family: var(--font-title); font-weight: 800; font-size: 20px;">G</div>`;
  } else if (lowerName.includes("кинопоиск")) {
    category = "Видео";
    logoHtml = `<div style="background: #FF6600; color: #fff; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; font-family: var(--font-title); font-weight: 800; font-size: 20px;">К</div>`;
  } else if (lowerName.includes("мтс") || lowerName.includes("mts")) {
    category = "Связь";
    logoHtml = `<div style="background: #ff001c; color: #fff; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; font-family: var(--font-title); font-weight: 800; font-size: 13px;">МТС</div>`;
  } else if (lowerName.includes("тинькофф") || lowerName.includes("tinkoff") || lowerName.includes("т-банк") || lowerName.includes("t-bank")) {
    category = "Финансы";
    logoHtml = `<div style="background: #ffdd2d; color: #000; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; font-family: var(--font-title); font-weight: 800; font-size: 22px;">Т</div>`;
  } else if (lowerName.includes("сбер") || lowerName.includes("sber")) {
    category = "Финансы";
    logoHtml = `<div style="background: #07a844; color: #fff; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; font-family: var(--font-title); font-weight: 800; font-size: 20px;">С</div>`;
  } else if (lowerName.includes("иви") || lowerName.includes("ivi")) {
    category = "Видео";
    logoHtml = `<div style="background: #EC184E; color: #fff; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; font-family: var(--font-title); font-weight: 800; font-size: 20px;">И</div>`;
  } else if (lowerName.includes("adobe") || lowerName.includes("photoshop") || lowerName.includes("адоб")) {
    category = "Софт";
    logoHtml = `<div style="background: #FA0F00; color: #fff; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; font-family: var(--font-title); font-weight: 800; font-size: 20px;">A</div>`;
  } else if (lowerName.includes("gym") || lowerName.includes("фитнес") || lowerName.includes("спорт") || lowerName.includes("ddx") || lowerName.includes("зал")) {
    category = "Спорт";
    logoHtml = `<div style="background: #111; color: #fff; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6.5 6.5h11M6.5 17.5h11M3 10v4M21 10v4M6.5 6.5v11M17.5 6.5v11"/></svg></div>`;
  } else {
    const gradient = getGradientByName(name);
    const letter = name.charAt(0).toUpperCase() || "?";
    
    if (lowerName.includes("книга") || lowerName.includes("book") || lowerName.includes("строки") || lowerName.includes("литрес")) {
      category = "Книги";
    } else if (lowerName.includes("домен") || lowerName.includes("хостинг") || lowerName.includes("server") || lowerName.includes("vds") || lowerName.includes("vpn") || lowerName.includes("впн")) {
      category = "IT / Хостинг";
    } else if (lowerName.includes("музыка") || lowerName.includes("music")) {
      category = "Музыка";
    } else if (lowerName.includes("кино") || lowerName.includes("сериал") || lowerName.includes("tv")) {
      category = "Видео";
    } else if (lowerName.includes("игр") || lowerName.includes("game") || lowerName.includes("playstation") || lowerName.includes("xbox") || lowerName.includes("steam")) {
      category = "Игры";
    } else if (lowerName.includes("обуч") || lowerName.includes("курс") || lowerName.includes("school") || lowerName.includes("edu") || lowerName.includes("урок")) {
      category = "Образование";
    } else if (lowerName.includes("облак") || lowerName.includes("cloud") || lowerName.includes("drive") || lowerName.includes("диск")) {
      category = "Облако";
    }

    logoHtml = `<div style="background: ${gradient}; color: #fff; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; font-family: var(--font-title); font-weight: 800; font-size: 20px;">${letter}</div>`;
  }

  return { category, logoHtml };
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

  // Расчет суммарных расходов за месяц и год (только для активных подписок)
  let totalMonthly = 0;
  let totalYearly = 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  sortedSubs.forEach(sub => {
    const isActive = sub.active !== false;

    if (isActive) {
      if (sub.period === "monthly") {
        totalMonthly += Number(sub.cost);
        totalYearly += Number(sub.cost) * 12;
      } else if (sub.period === "yearly") {
        totalMonthly += Math.round(Number(sub.cost) / 12);
        totalYearly += Number(sub.cost);
      }
    }

    // Определение критичности даты и дней до списания (в локальном часовом поясе)
    const [year, month, day] = sub.date.split('-').map(Number);
    const subDate = new Date(year, month - 1, day);
    const diffTime = subDate - today;
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
    
    // Подписка считается предупреждающей (warning), только если она активна и до списания <= 3 дней (или просрочена)
    const isUpcoming = isActive && (diffDays <= 3);

    // Поиск привязанной карты для пилла
    const linkedCard = state.cards.find(c => c.id === sub.cardId) || { name: "Не указана", bankClass: "default" };

    const cardEl = document.createElement("div");
    cardEl.className = `sub-card ${!isActive ? "paused" : (isUpcoming ? "warning" : "")}`;
    cardEl.onclick = () => openSubModal(sub.id);

    // Локализация даты платежа
    const dateOptions = { day: 'numeric', month: 'short' };
    const formattedDate = subDate.toLocaleDateString('ru-RU', dateOptions);

    // Расчет текста и класса для индикатора дней
    let daysLeftText = "";
    let daysLeftClass = "";

    if (!isActive) {
      daysLeftText = "На паузе";
      daysLeftClass = "days-paused";
    } else {
      if (diffDays < 0) {
        const absDays = Math.abs(diffDays);
        daysLeftText = absDays === 1 ? "Вчера" : `Просрочено на ${absDays} дн.`;
        daysLeftClass = "days-overdue";
      } else if (diffDays === 0) {
        daysLeftText = "Сегодня";
        daysLeftClass = "days-today";
      } else if (diffDays === 1) {
        daysLeftText = "Завтра";
        daysLeftClass = "days-tomorrow";
      } else if (diffDays <= 7) {
        daysLeftText = `Через ${diffDays} дн.`;
        daysLeftClass = "days-soon";
      } else {
        daysLeftText = `Через ${diffDays} дн.`;
        daysLeftClass = "days-future";
      }
    }

    // Получение автоопределенного бренда и категории
    const brand = getSubscriptionBrand(sub.name);

    cardEl.innerHTML = `
      <div class="sub-brand-logo">
        ${brand.logoHtml}
      </div>
      <div class="sub-left">
        <span class="sub-title">${sub.name}</span>
        <div class="sub-info">
          <span class="date-pill">${formattedDate}</span>
          <span class="days-pill ${daysLeftClass}">${daysLeftText}</span>
          <span class="card-pill ${linkedCard.bankClass}-pill">${linkedCard.name}</span>
        </div>
      </div>
      <div class="sub-right">
        <span class="sub-price">${sub.cost} ₽</span>
        <span class="sub-period-text">${sub.period === "monthly" ? "в месяц" : "в год"}</span>
      </div>
      ${isActive && diffDays <= 3 ? `
        <button class="btn-sub-check" title="Отметить как оплаченную (перенести дату)" onclick="event.stopPropagation(); confirmSubscriptionPayment('${sub.id}');">
          <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="3" fill="none">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </button>
      ` : ''}
    `;
    container.appendChild(cardEl);
  });

  // Обновление сводки
  document.getElementById("total-spend").textContent = `${totalMonthly.toLocaleString('ru-RU')} ₽`;
  document.getElementById("total-spend-yearly").textContent = `~${totalYearly.toLocaleString('ru-RU')} ₽ в год`;
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

  saveState("cashback_cards", JSON.stringify(state.cards));
  
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
    saveState("cashback_cards", JSON.stringify(state.cards));

    // Обновляем подписки, которые ссылались на эту карту
    state.subscriptions.forEach(sub => {
      if (sub.cardId === currentCardEditingId) {
        sub.cardId = ""; // Сбрасываем привязанную карту
      }
    });
    saveState("cashback_subs", JSON.stringify(state.subscriptions));

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

// Функция сдвига даты списания при оплате подписки
function shiftSubscriptionDate(dateStr, period) {
  const [year, month, day] = dateStr.split('-').map(Number);
  
  if (period === "monthly") {
    let nextMonth = month;
    let nextYear = year;
    if (month === 12) {
      nextMonth = 1;
      nextYear += 1;
    } else {
      nextMonth += 1;
    }
    const daysInNextMonth = new Date(nextYear, nextMonth, 0).getDate();
    const nextDay = Math.min(day, daysInNextMonth);
    
    const formattedMonth = String(nextMonth).padStart(2, '0');
    const formattedDay = String(nextDay).padStart(2, '0');
    return `${nextYear}-${formattedMonth}-${formattedDay}`;
  } else if (period === "yearly") {
    let nextYear = year + 1;
    let nextDay = day;
    if (month === 2 && day === 29) {
      const isLeap = (nextYear % 4 === 0 && nextYear % 100 !== 0) || (nextYear % 400 === 0);
      if (!isLeap) {
        nextDay = 28;
      }
    }
    const formattedMonth = String(month).padStart(2, '0');
    const formattedDay = String(nextDay).padStart(2, '0');
    return `${nextYear}-${formattedMonth}-${formattedDay}`;
  }
  return dateStr;
}

// Подтверждение оплаты подписки и перенос даты на следующий период
function confirmSubscriptionPayment(subId) {
  const sub = state.subscriptions.find(s => s.id === subId);
  if (!sub) return;

  const nextDateStr = shiftSubscriptionDate(sub.date, sub.period);
  sub.date = nextDateStr;

  saveState("cashback_subs", JSON.stringify(state.subscriptions));
  renderSubscriptions();

  // Уведомление о продлении
  const [ny, nm, nd] = nextDateStr.split('-').map(Number);
  const nextDateObj = new Date(ny, nm - 1, nd);
  const nextDateFormatted = nextDateObj.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' });
  showCopyNotification(`Подписка "${sub.name}" продлена до ${nextDateFormatted}`);
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
    document.getElementById("sub-active").checked = sub.active !== false;

    deleteBtn.style.display = "block";
  } else {
    // Добавление новой
    document.getElementById("modal-sub-title").textContent = "Новая подписка";
    document.getElementById("edit-sub-id").value = "";
    document.getElementById("sub-active").checked = true;
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
  const active = document.getElementById("sub-active").checked;

  if (id) {
    // Редактирование существующей
    const subIndex = state.subscriptions.findIndex(s => s.id === id);
    if (subIndex !== -1) {
      state.subscriptions[subIndex] = { id, name, cost, period, date, cardId, active };
    }
  } else {
    // Добавление новой
    const newId = "sub_" + Date.now();
    state.subscriptions.push({ id: newId, name, cost, period, date, cardId, active });
  }

  saveState("cashback_subs", JSON.stringify(state.subscriptions));
  renderSubscriptions();
  closeModal("sub-modal");
}

// Удаление подписки
function deleteSubscription() {
  const id = document.getElementById("edit-sub-id").value;
  if (!id) return;

  if (confirm("Вы действительно хотите удалить эту подписку?")) {
    state.subscriptions = state.subscriptions.filter(s => s.id !== id);
    saveState("cashback_subs", JSON.stringify(state.subscriptions));
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

  saveState("cashback_payments", JSON.stringify(state.payments));
  renderPayments();
  closeModal("payment-modal");
}

// Удаление платежа
function deletePayment() {
  const id = document.getElementById("edit-payment-id").value;
  if (!id) return;

  if (confirm("Вы действительно хотите удалить этот платеж?")) {
    state.payments = state.payments.filter(p => p.id !== id);
    saveState("cashback_payments", JSON.stringify(state.payments));
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

// Функция обновления индикатора синхронизации
function updateSyncIndicator(status) {
  const indicator = document.getElementById("sync-indicator");
  if (!indicator) return;

  // Сбрасываем анимацию пульсации
  indicator.classList.remove("sync-pulse");

  if (status === "disconnected") {
    indicator.style.background = "#a0a0ab";
    indicator.title = "Синхронизация отключена";
  } else if (status === "syncing") {
    indicator.style.background = "#ff9800";
    indicator.title = "Синхронизация с облаком...";
    indicator.classList.add("sync-pulse");
  } else if (status === "synced") {
    indicator.style.background = "#4caf50";
    indicator.title = "Синхронизировано с облаком";
  } else if (status === "error") {
    indicator.style.background = "#f44336";
    indicator.title = "Ошибка авто-сохранения (проверьте интернет)";
  }
}

// Функция-обертка для сохранения данных с авто-синхронизацией
function saveState(key, value) {
  localStorage.setItem(key, value);
  if (!isSyncing && ["cashback_cards", "cashback_subs", "cashback_payments", "cashback_user_synonyms", "cashback_history", "cashback_deposits"].includes(key)) {
    pushDataToCloud();
  }
}

async function pushDataToCloud() {
  if (isSyncing) return;
  const key = localStorage.getItem("sync_key");
  if (!key) return;

  updateSyncIndicator("syncing");

  const data = {
    cashback_cards: JSON.parse(localStorage.getItem("cashback_cards") || "[]"),
    cashback_subs: JSON.parse(localStorage.getItem("cashback_subs") || "[]"),
    cashback_payments: JSON.parse(localStorage.getItem("cashback_payments") || "[]"),
    cashback_user_synonyms: JSON.parse(localStorage.getItem("cashback_user_synonyms") || "{}"),
    cashback_history: JSON.parse(localStorage.getItem("cashback_history") || "[]"),
    cashback_deposits: JSON.parse(localStorage.getItem("cashback_deposits") || "[]")
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
    updateSyncIndicator("synced");
  } catch (error) {
    console.error('Ошибка авто-сохранения в облако:', error);
    updateSyncIndicator("error");
  }
}

async function pullDataFromCloud(key) {
  if (!key) return false;
  
  updateSyncIndicator("syncing");
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
        state.cards = data.cashback_cards;
        
        // Мигрируем подгруженные из облака карты только один раз при первом запуске этой версии (v4)
        if (!localStorage.getItem("cashback_v4_categories_updated")) {
          const didMigrateCloud = migrateCardCategories(state.cards);
          localStorage.setItem("cashback_cards", JSON.stringify(state.cards));
          
          if (didMigrateCloud) {
            // Если категории изменились, сразу отправляем обновленные данные обратно в облако
            setTimeout(() => {
              pushDataToCloud().catch(err => console.error("Ошибка автосинхронизации после облачной миграции:", err));
            }, 500);
          }
          localStorage.setItem("cashback_v4_categories_updated", "true");
        } else {
          localStorage.setItem("cashback_cards", JSON.stringify(state.cards));
        }
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
      if (data.cashback_history) {
        localStorage.setItem("cashback_history", JSON.stringify(data.cashback_history));
        state.cashbackHistory = data.cashback_history;
      }
      if (data.cashback_deposits) {
        localStorage.setItem("cashback_deposits", JSON.stringify(data.cashback_deposits));
        state.deposits = data.cashback_deposits;
      }
      
      isSyncing = false;
      
      // Обновляем UI
      renderCards();
      renderSubscriptions();
      renderPayments();
      renderAnalytics();
      updateMonthTitle();
      
      updateSyncIndicator("synced");
      return true;
    }
    updateSyncIndicator("synced");
    return false;
  } catch (error) {
    console.error('Ошибка загрузки данных из облака:', error);
    updateSyncIndicator("error");
    throw error;
  }
}

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
      updateSyncIndicator("disconnected");
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
        cashback_user_synonyms: JSON.parse(localStorage.getItem("cashback_user_synonyms") || "{}"),
        cashback_history: JSON.parse(localStorage.getItem("cashback_history") || "[]"),
        cashback_deposits: JSON.parse(localStorage.getItem("cashback_deposits") || "[]")
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
      reader.onload = async function(evt) {
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
          if (data.cashback_history) {
            localStorage.setItem("cashback_history", JSON.stringify(data.cashback_history));
          }
          if (data.cashback_deposits) {
            localStorage.setItem("cashback_deposits", JSON.stringify(data.cashback_deposits));
          }
          
          const statusMsg = document.getElementById("settings-status-msg");
          if (statusMsg) {
            statusMsg.style.display = "block";
            statusMsg.style.color = "#4caf50";
            statusMsg.innerText = "Данные импортированы! Синхронизация с облаком...";
          }

          const storedKey = localStorage.getItem("sync_key");
          if (storedKey) {
            try {
              await pushDataToCloud();
              if (statusMsg) {
                statusMsg.innerText = "Данные импортированы и синхронизированы! Перезагрузка...";
              }
            } catch (syncErr) {
              console.error("Ошибка синхронизации после импорта:", syncErr);
            }
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

  // Инициализация интерфейса аналитики и вкладов
  setupAnalyticsEventListeners();
}

// -------------------------------------------------------------
// Аналитика, История кешбэка и Учёт вкладов
// -------------------------------------------------------------

// Открытие модалки завершения месяца
function openCloseMonthModal() {
  const summaryContainer = document.getElementById("close-month-cards-summary");
  if (!summaryContainer) return;

  const totalCashback = state.cards.reduce((sum, c) => sum + (Number(c.accumulated) || 0), 0);
  
  if (state.cards.length === 0) {
    summaryContainer.innerHTML = `<p style="color: var(--text-secondary); text-align: center;">У вас нет добавленных карт</p>`;
  } else {
    let cardsHtml = state.cards.map(c => `
      <div style="display: flex; justify-content: space-between; align-items: center; padding: 6px 0; border-bottom: 1px dashed rgba(255,255,255,0.06); font-size: 13px;">
        <span style="color: var(--text-primary); font-weight: 500;">${c.bank ? c.bank + ' — ' : ''}${c.name}</span>
        <strong style="color: var(--accent-color);">${(Number(c.accumulated) || 0).toLocaleString('ru-RU')} ₽</strong>
      </div>
    `).join('');

    cardsHtml += `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 10px; padding-top: 6px; font-weight: 700; font-size: 14px;">
        <span>Итого за месяц:</span>
        <span style="color: #30d158; font-size: 16px;">${totalCashback.toLocaleString('ru-RU')} ₽</span>
      </div>
    `;
    summaryContainer.innerHTML = cardsHtml;
  }

  openModal("close-month-modal");
}

// Завершение текущего месяца и сохранение итогов
function confirmCloseMonth() {
  const monthNames = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
  const now = new Date();
  const monthKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  const label = `${monthNames[now.getMonth()]} ${now.getFullYear()}`;

  let totalCashback = 0;
  const byCard = {};
  
  state.cards.forEach(c => {
    const amt = Number(c.accumulated) || 0;
    byCard[c.id] = { name: c.name, bank: c.bank, amount: amt };
    totalCashback += amt;
    c.accumulated = 0; // Сброс накопительного кешбэка по карте для нового месяца
  });

  const existingIdx = state.cashbackHistory.findIndex(h => h.monthKey === monthKey);
  if (existingIdx >= 0) {
    state.cashbackHistory[existingIdx].totalCashback += totalCashback;
    state.cashbackHistory[existingIdx].byCard = { ...state.cashbackHistory[existingIdx].byCard, ...byCard };
    state.cashbackHistory[existingIdx].timestamp = Date.now();
  } else {
    state.cashbackHistory.unshift({
      id: Date.now().toString(),
      monthKey,
      label,
      totalCashback,
      byCard,
      timestamp: Date.now()
    });
  }

  saveState("cashback_history", JSON.stringify(state.cashbackHistory));
  saveState("cashback_cards", JSON.stringify(state.cards));

  closeModal("close-month-modal");
  renderCards();
  updateMonthTitle();
  renderAnalytics();
}

// Открытие модалки добавления/редактирования вклада
function openDepositModal(depositId = null) {
  const form = document.getElementById("deposit-form");
  const titleEl = document.getElementById("deposit-modal-title");
  const deleteBtn = document.getElementById("btn-delete-deposit");
  if (!form) return;

  form.reset();
  document.getElementById("deposit-id").value = "";

  if (depositId) {
    const deposit = state.deposits.find(d => d.id === depositId);
    if (deposit) {
      document.getElementById("deposit-id").value = deposit.id;
      document.getElementById("deposit-bank").value = deposit.bank || "";
      document.getElementById("deposit-name").value = deposit.name || "";
      document.getElementById("deposit-amount").value = deposit.amount || 0;
      document.getElementById("deposit-rate").value = deposit.rate || 0;
      document.getElementById("deposit-payout-day").value = deposit.payoutDay || 1;
      document.getElementById("deposit-calc-type").value = deposit.calcType || "auto";

      if (titleEl) titleEl.textContent = "Редактировать вклад";
      if (deleteBtn) deleteBtn.style.display = "block";
    }
  } else {
    if (titleEl) titleEl.textContent = "Добавить вклад";
    if (deleteBtn) deleteBtn.style.display = "none";
  }

  openModal("deposit-modal");
}

// Сохранение вклада
function saveDeposit(e) {
  if (e) e.preventDefault();
  
  const id = document.getElementById("deposit-id").value;
  const bank = document.getElementById("deposit-bank").value.trim();
  const name = document.getElementById("deposit-name").value.trim();
  const amount = Number(document.getElementById("deposit-amount").value) || 0;
  const rate = Number(document.getElementById("deposit-rate").value) || 0;
  const payoutDay = Number(document.getElementById("deposit-payout-day").value) || 1;
  const calcType = document.getElementById("deposit-calc-type").value || "auto";

  if (!bank || !name) return;

  if (id) {
    const deposit = state.deposits.find(d => d.id === id);
    if (deposit) {
      deposit.bank = bank;
      deposit.name = name;
      deposit.amount = amount;
      deposit.rate = rate;
      deposit.payoutDay = payoutDay;
      deposit.calcType = calcType;
    }
  } else {
    state.deposits.push({
      id: Date.now().toString(),
      bank,
      name,
      amount,
      rate,
      payoutDay,
      calcType,
      history: []
    });
  }

  saveState("cashback_deposits", JSON.stringify(state.deposits));
  closeModal("deposit-modal");
  renderAnalytics();
}

// Удаление вклада
function deleteDeposit() {
  const id = document.getElementById("deposit-id").value;
  if (!id) return;

  if (confirm("Вы уверены, что хотите удалить этот вклад?")) {
    state.deposits = state.deposits.filter(d => d.id !== id);
    saveState("cashback_deposits", JSON.stringify(state.deposits));
    closeModal("deposit-modal");
    renderAnalytics();
  }
}

// Открытие модалки выплаты или изменения баланса вклада
function openDepositActionModal(depositId, mode = "payout") {
  const form = document.getElementById("deposit-action-form");
  if (!form) return;

  form.reset();
  document.getElementById("deposit-action-id").value = depositId;
  document.getElementById("deposit-action-mode").value = mode;

  const deposit = state.deposits.find(d => d.id === depositId);
  if (!deposit) return;

  const titleEl = document.getElementById("deposit-action-modal-title");
  const payoutFields = document.getElementById("deposit-action-payout-fields");
  const balanceFields = document.getElementById("deposit-action-balance-fields");
  const hintEl = document.getElementById("deposit-action-calc-hint");

  const now = new Date();
  const currentMonthKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;

  if (mode === "payout") {
    if (titleEl) titleEl.textContent = `Выплата — ${deposit.name}`;
    if (payoutFields) payoutFields.style.display = "block";
    if (balanceFields) balanceFields.style.display = "none";

    const expectedMonthly = Math.round((deposit.amount * (deposit.rate / 100)) / 12);
    document.getElementById("deposit-action-amount").value = expectedMonthly;
    document.getElementById("deposit-action-month").value = currentMonthKey;
    if (hintEl) hintEl.textContent = `Авторасчёт по ставке ${deposit.rate}%: ${expectedMonthly.toLocaleString('ru-RU')} ₽`;
  } else {
    if (titleEl) titleEl.textContent = `Баланс — ${deposit.name}`;
    if (payoutFields) payoutFields.style.display = "none";
    if (balanceFields) balanceFields.style.display = "block";

    document.getElementById("deposit-new-balance").value = deposit.amount;
  }

  openModal("deposit-action-modal");
}

// Сохранение действия с вкладом (выплата или новый баланс)
function saveDepositAction(e) {
  if (e) e.preventDefault();

  const depositId = document.getElementById("deposit-action-id").value;
  const mode = document.getElementById("deposit-action-mode").value;
  const deposit = state.deposits.find(d => d.id === depositId);
  if (!deposit) return;

  if (mode === "payout") {
    const amount = Number(document.getElementById("deposit-action-amount").value) || 0;
    const monthKey = document.getElementById("deposit-action-month").value;

    if (!monthKey) return;

    deposit.history = deposit.history || [];
    const existingIdx = deposit.history.findIndex(h => h.monthKey === monthKey);
    if (existingIdx >= 0) {
      deposit.history[existingIdx].amount = amount;
      deposit.history[existingIdx].timestamp = Date.now();
    } else {
      deposit.history.push({
        id: Date.now().toString(),
        monthKey,
        amount,
        timestamp: Date.now()
      });
    }
  } else if (mode === "balance") {
    const newBalance = Number(document.getElementById("deposit-new-balance").value) || 0;
    deposit.amount = newBalance;
  }

  saveState("cashback_deposits", JSON.stringify(state.deposits));
  closeModal("deposit-action-modal");
  renderAnalytics();
}

// Главная функция рендеринга аналитики
function renderAnalytics() {
  const period = state.analyticsPeriod || "month";
  const now = new Date();
  
  // Генерация ключевых месяцев в зависимости от периода
  const monthKeys = [];
  let monthsCount = 1;
  if (period === "month") monthsCount = 1;
  else if (period === "3months") monthsCount = 3;
  else if (period === "6months") monthsCount = 6;
  else if (period === "all") monthsCount = 12;

  for (let i = 0; i < monthsCount; i++) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    monthKeys.push(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`);
  }

  // Расчёт кешбэка за выбранный период
  let totalCashback = 0;
  state.cashbackHistory.forEach(h => {
    if (period === "all" || monthKeys.includes(h.monthKey)) {
      totalCashback += Number(h.totalCashback) || 0;
    }
  });

  // Добавляем текущий накопленный кешбэк по картам, если рассматриваем текущий месяц или всё время
  const currentCardsAccumulated = state.cards.reduce((sum, c) => sum + (Number(c.accumulated) || 0), 0);
  if (period === "month" || period === "all") {
    totalCashback += currentCardsAccumulated;
  }

  // Расчёт выплат по вкладам
  let totalDeposits = 0;
  state.deposits.forEach(dep => {
    if (Array.isArray(dep.history)) {
      dep.history.forEach(h => {
        if (period === "all" || monthKeys.includes(h.monthKey)) {
          totalDeposits += Number(h.amount) || 0;
        }
      });
    }
    // Если выплат в истории ещё нет, но вклад активен, прибавляем ожидания для текущего месяца
    if (dep.calcType === "auto" && dep.amount > 0 && dep.rate > 0) {
      const currentMonthKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
      const hasHistoryCurrentMonth = dep.history && dep.history.some(h => h.monthKey === currentMonthKey);
      if (!hasHistoryCurrentMonth && (period === "month" || period === "all")) {
        totalDeposits += Math.round((dep.amount * (dep.rate / 100)) / 12);
      }
    }
  });

  const totalIncome = totalCashback + totalDeposits;

  // Обновление цифр на дашборде
  const totalIncomeEl = document.getElementById("analytics-total-income");
  const cashbackTotalEl = document.getElementById("analytics-cashback-total");
  const depositsTotalEl = document.getElementById("analytics-deposits-total");
  const periodLabelEl = document.getElementById("analytics-period-label");

  if (totalIncomeEl) totalIncomeEl.textContent = `${totalIncome.toLocaleString('ru-RU')} ₽`;
  if (cashbackTotalEl) cashbackTotalEl.textContent = `${totalCashback.toLocaleString('ru-RU')} ₽`;
  if (depositsTotalEl) depositsTotalEl.textContent = `${totalDeposits.toLocaleString('ru-RU')} ₽`;

  if (periodLabelEl) {
    const periodTextMap = {
      month: "За текущий месяц",
      "3months": "За последние 3 месяца",
      "6months": "За последние 6 месяцев",
      all: "За всё время учёта"
    };
    periodLabelEl.textContent = periodTextMap[period] || "За выбранный период";
  }

  // Рендеринг графика
  renderAnalyticsChart(monthsCount);

  // Рендеринг списка вкладов
  renderDepositsList();

  // Рендеринг истории кешбэка
  renderCashbackHistoryList();
}

// Отрисовка столбчатой диаграммы доходов
function renderAnalyticsChart(monthsCount = 6) {
  const chartContainer = document.getElementById("analytics-chart-container");
  if (!chartContainer) return;

  const monthNamesShort = ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"];
  const now = new Date();

  const chartData = [];
  let maxMonthlyVal = 1;

  for (let i = monthsCount - 1; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const monthKey = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    const monthLabel = monthNamesShort[d.getMonth()];

    // Кешбэк за этот месяц
    let monthCashback = 0;
    const historyItem = state.cashbackHistory.find(h => h.monthKey === monthKey);
    if (historyItem) {
      monthCashback = Number(historyItem.totalCashback) || 0;
    } else if (i === 0) {
      monthCashback = state.cards.reduce((sum, c) => sum + (Number(c.accumulated) || 0), 0);
    }

    // Вклады за этот месяц
    let monthDeposits = 0;
    state.deposits.forEach(dep => {
      if (Array.isArray(dep.history)) {
        const payout = dep.history.find(h => h.monthKey === monthKey);
        if (payout) monthDeposits += Number(payout.amount) || 0;
      }
      if (i === 0 && monthDeposits === 0 && dep.calcType === "auto" && dep.amount > 0) {
        monthDeposits += Math.round((dep.amount * (dep.rate / 100)) / 12);
      }
    });

    const monthTotal = monthCashback + monthDeposits;
    if (monthTotal > maxMonthlyVal) maxMonthlyVal = monthTotal;

    chartData.push({
      monthLabel,
      monthCashback,
      monthDeposits,
      monthTotal
    });
  }

  if (chartData.length === 0 || maxMonthlyVal <= 1) {
    chartContainer.innerHTML = `
      <div style="width: 100%; text-align: center; color: var(--text-secondary); padding: 30px 0; font-size: 13px;">
        Нет данных для построения графика. Завершите месяц или добавьте вклад.
      </div>
    `;
    return;
  }

  const chartHtml = chartData.map(item => {
    const cashbackPct = Math.round((item.monthCashback / maxMonthlyVal) * 100);
    const depositPct = Math.round((item.monthDeposits / maxMonthlyVal) * 100);
    const totalHeightPct = Math.min(100, Math.max(12, Math.round((item.monthTotal / maxMonthlyVal) * 100)));

    return `
      <div class="chart-bar-group">
        <span class="chart-bar-val">${item.monthTotal > 0 ? item.monthTotal.toLocaleString('ru-RU') + '₽' : ''}</span>
        <div class="chart-bar-stack" style="height: ${totalHeightPct}%;">
          ${depositPct > 0 ? `<div class="bar-segment-deposit" style="height: ${depositPct}%;" title="Вклады: ${item.monthDeposits} ₽"></div>` : ''}
          ${cashbackPct > 0 ? `<div class="bar-segment-cashback" style="height: ${cashbackPct}%;" title="Кешбэк: ${item.monthCashback} ₽"></div>` : ''}
        </div>
        <span class="chart-bar-month">${item.monthLabel}</span>
      </div>
    `;
  }).join('');

  chartContainer.innerHTML = chartHtml;
}

// Отрисовка списка вкладов
function renderDepositsList() {
  const container = document.getElementById("deposits-container");
  if (!container) return;

  if (!state.deposits || state.deposits.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; color: var(--text-secondary); padding: 24px 12px; background: rgba(255,255,255,0.02); border-radius: 14px; border: 1px dashed var(--border-color);">
        <p style="margin-bottom: 8px; font-weight: 500;">У вас пока нет активных вкладов</p>
        <button class="btn btn-secondary" onclick="openDepositModal()" style="font-size: 12px; padding: 6px 14px;">+ Добавить первый вклад</button>
      </div>
    `;
    return;
  }

  const html = state.deposits.map(d => {
    const monthlyIncome = Math.round((d.amount * (d.rate / 100)) / 12);

    return `
      <div class="deposit-card">
        <div class="deposit-top-row">
          <div>
            <span class="deposit-bank-badge">${d.bank}</span>
            <h3 class="deposit-title">${d.name}</h3>
          </div>
          <button class="btn-icon" onclick="openDepositModal('${d.id}')" title="Редактировать" style="width: 32px; height: 32px;">
            <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2" fill="none"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
          </button>
        </div>

        <div class="deposit-stats-grid">
          <div class="deposit-stat-item">
            <span class="deposit-stat-label">Сумма вклада</span>
            <span class="deposit-stat-value">${Number(d.amount).toLocaleString('ru-RU')} ₽</span>
          </div>
          <div class="deposit-stat-item">
            <span class="deposit-stat-label">Ставка</span>
            <span class="deposit-stat-value" style="color: #30d158;">${d.rate}% годовых</span>
          </div>
          <div class="deposit-stat-item">
            <span class="deposit-stat-label">Доход в месяц</span>
            <span class="deposit-stat-value">~${monthlyIncome.toLocaleString('ru-RU')} ₽</span>
          </div>
          <div class="deposit-stat-item">
            <span class="deposit-stat-label">Выплата</span>
            <span class="deposit-stat-value">${d.payoutDay}-го числа</span>
          </div>
        </div>

        <div class="deposit-card-actions">
          <button class="btn-deposit-action btn-deposit-payout" onclick="openDepositActionModal('${d.id}', 'payout')">
            <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2.5" fill="none"><polyline points="20 6 9 17 4 12"></polyline></svg>
            Зафиксировать выплату
          </button>
          <button class="btn-deposit-action" onclick="openDepositActionModal('${d.id}', 'balance')">
            ± Баланс
          </button>
        </div>
      </div>
    `;
  }).join('');

  container.innerHTML = html;
}

// Отрисовка истории кешбэка по месяцах
function renderCashbackHistoryList() {
  const container = document.getElementById("cashback-history-container");
  if (!container) return;

  if (!state.cashbackHistory || state.cashbackHistory.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; color: var(--text-secondary); padding: 20px 12px; font-size: 13px;">
        История кешбэка пуста. Нажмите <strong>«+ Прошлый месяц»</strong> выше или <strong>«Завершить месяц»</strong> на главном экране.
      </div>
    `;
    return;
  }

  const html = state.cashbackHistory.map(h => {
    let cardsPills = '';
    if (h.byCard && Object.keys(h.byCard).length > 0) {
      cardsPills = Object.values(h.byCard)
        .filter(c => c && c.amount > 0)
        .map(c => `<span class="history-card-pill">${c.bank ? c.bank + ' ' : ''}${c.name}: ${c.amount.toLocaleString('ru-RU')} ₽</span>`)
        .join('');
    } else if (h.note) {
      cardsPills = `<span class="history-card-pill">${h.note}</span>`;
    }

    return `
      <div class="history-item" style="cursor: pointer;" onclick="openHistoryEntryModal('${h.id}')" title="Нажмите для редактирования">
        <div class="history-item-header">
          <span class="history-item-month">${h.label}</span>
          <div style="display: flex; align-items: center; gap: 8px;">
            <span class="history-item-total">+${Number(h.totalCashback).toLocaleString('ru-RU')} ₽</span>
            <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2" fill="none" style="color: var(--text-secondary);"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
          </div>
        </div>
        ${cardsPills ? `<div class="history-item-cards">${cardsPills}</div>` : ''}
      </div>
    `;
  }).join('');

  container.innerHTML = html;
}

// Открытие модалки добавления/редактирования записи кешбэка за прошлый месяц
function openHistoryEntryModal(historyId = null) {
  const form = document.getElementById("history-entry-form");
  const titleEl = document.getElementById("history-entry-modal-title");
  const deleteBtn = document.getElementById("btn-delete-history-entry");
  if (!form) return;

  form.reset();
  document.getElementById("history-entry-id").value = "";

  if (historyId) {
    const entry = state.cashbackHistory.find(h => h.id === historyId);
    if (entry) {
      document.getElementById("history-entry-id").value = entry.id;
      document.getElementById("history-entry-month").value = entry.monthKey || "";
      document.getElementById("history-entry-amount").value = entry.totalCashback || 0;
      document.getElementById("history-entry-note").value = entry.note || "";
      if (titleEl) titleEl.textContent = `Редактировать — ${entry.label}`;
      if (deleteBtn) deleteBtn.style.display = "block";
    }
  } else {
    // По умолчанию прошлый месяц
    const now = new Date();
    const prevMonthDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const prevMonthKey = `${prevMonthDate.getFullYear()}-${String(prevMonthDate.getMonth() + 1).padStart(2, '0')}`;
    document.getElementById("history-entry-month").value = prevMonthKey;

    if (titleEl) titleEl.textContent = "Внести кешбэк за прошлый месяц";
    if (deleteBtn) deleteBtn.style.display = "none";
  }

  openModal("history-entry-modal");
}

// Сохранение записи кешбэка за прошлый месяц
function saveHistoryEntry(e) {
  if (e) e.preventDefault();

  const id = document.getElementById("history-entry-id").value;
  const monthKey = document.getElementById("history-entry-month").value; // "YYYY-MM"
  const amount = Number(document.getElementById("history-entry-amount").value) || 0;
  const note = document.getElementById("history-entry-note").value.trim();

  if (!monthKey) return;

  const monthNames = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
  const [yearStr, monthStr] = monthKey.split('-');
  const monthIdx = parseInt(monthStr, 10) - 1;
  const label = `${monthNames[monthIdx]} ${yearStr}`;

  if (id) {
    const entry = state.cashbackHistory.find(h => h.id === id);
    if (entry) {
      entry.monthKey = monthKey;
      entry.label = label;
      entry.totalCashback = amount;
      entry.note = note;
      entry.timestamp = Date.now();
    }
  } else {
    const existingIdx = state.cashbackHistory.findIndex(h => h.monthKey === monthKey);
    if (existingIdx >= 0) {
      state.cashbackHistory[existingIdx].totalCashback = amount;
      state.cashbackHistory[existingIdx].label = label;
      state.cashbackHistory[existingIdx].note = note;
      state.cashbackHistory[existingIdx].timestamp = Date.now();
    } else {
      state.cashbackHistory.push({
        id: Date.now().toString(),
        monthKey,
        label,
        totalCashback: amount,
        note,
        byCard: note ? { noteCard: { name: note, amount } } : {},
        timestamp: Date.now()
      });
    }
  }

  // Сортировка истории по убыванию даты
  state.cashbackHistory.sort((a, b) => b.monthKey.localeCompare(a.monthKey));

  saveState("cashback_history", JSON.stringify(state.cashbackHistory));
  closeModal("history-entry-modal");
  renderAnalytics();
}

// Удаление записи кешбэка за прошлый месяц
function deleteHistoryEntry() {
  const id = document.getElementById("history-entry-id").value;
  if (!id) return;

  if (confirm("Вы уверены, что хотите удалить эту запись из истории кешбэка?")) {
    state.cashbackHistory = state.cashbackHistory.filter(h => h.id !== id);
    saveState("cashback_history", JSON.stringify(state.cashbackHistory));
    closeModal("history-entry-modal");
    renderAnalytics();
  }
}

// Слушатели событий аналитики
function setupAnalyticsEventListeners() {
  // Кнопка открытия модалки завершения месяца
  const openCloseMonthBtn = document.getElementById("btn-open-close-month-modal");
  if (openCloseMonthBtn) {
    openCloseMonthBtn.onclick = openCloseMonthModal;
  }

  // Подтверждение завершения месяца
  const confirmCloseMonthBtn = document.getElementById("btn-confirm-close-month");
  if (confirmCloseMonthBtn) {
    confirmCloseMonthBtn.onclick = confirmCloseMonth;
  }

  // Закрытие модалки месяца
  const closeMonthCloseBtn = document.getElementById("btn-close-month-modal");
  if (closeMonthCloseBtn) {
    closeMonthCloseBtn.onclick = () => closeModal("close-month-modal");
  }

  // Кнопка добавления кешбэка за прошлый месяц
  const addHistoryBtn = document.getElementById("btn-add-history-entry");
  if (addHistoryBtn) {
    addHistoryBtn.onclick = () => openHistoryEntryModal();
  }

  // Модалка ручного внесения истории кешбэка
  const closeHistoryModalBtn = document.getElementById("btn-close-history-entry-modal");
  if (closeHistoryModalBtn) {
    closeHistoryModalBtn.onclick = () => closeModal("history-entry-modal");
  }

  const historyForm = document.getElementById("history-entry-form");
  if (historyForm) {
    historyForm.onsubmit = saveHistoryEntry;
  }

  const deleteHistoryBtn = document.getElementById("btn-delete-history-entry");
  if (deleteHistoryBtn) {
    deleteHistoryBtn.onclick = deleteHistoryEntry;
  }

  // Переключение периода аналитики
  document.querySelectorAll(".period-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".period-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      state.analyticsPeriod = btn.getAttribute("data-period");
      renderAnalytics();
    });
  });

  // Кнопки добавить вклад
  const addDepositHeaderBtn = document.getElementById("btn-add-deposit-header");
  const addDepositLinkBtn = document.getElementById("btn-add-deposit-link");
  if (addDepositHeaderBtn) addDepositHeaderBtn.onclick = () => openDepositModal();
  if (addDepositLinkBtn) addDepositLinkBtn.onclick = () => openDepositModal();

  // Модалка вклада
  const closeDepositBtn = document.getElementById("btn-close-deposit-modal");
  if (closeDepositBtn) closeDepositBtn.onclick = () => closeModal("deposit-modal");

  const depositForm = document.getElementById("deposit-form");
  if (depositForm) depositForm.onsubmit = saveDeposit;

  const deleteDepositBtn = document.getElementById("btn-delete-deposit");
  if (deleteDepositBtn) deleteDepositBtn.onclick = deleteDeposit;

  // Модалка действия с вкладом (выплата / баланс)
  const closeDepositActionBtn = document.getElementById("btn-close-deposit-action-modal");
  if (closeDepositActionBtn) closeDepositActionBtn.onclick = () => closeModal("deposit-action-modal");

  const depositActionForm = document.getElementById("deposit-action-form");
  if (depositActionForm) depositActionForm.onsubmit = saveDepositAction;
}

// Инициализация при загрузке страницы
window.onload = () => {
  initApp();
  
  // Автозагрузка данных из облака при наличии ключа
  const storedKey = localStorage.getItem("sync_key");
  if (storedKey) {
    updateSyncIndicator("synced");
    pullDataFromCloud(storedKey).catch(err => {
      console.error("Ошибка автозагрузки при запуске:", err);
      updateSyncIndicator("error");
    });
  } else {
    updateSyncIndicator("disconnected");
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
