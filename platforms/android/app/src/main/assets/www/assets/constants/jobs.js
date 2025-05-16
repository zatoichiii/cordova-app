const JOBS = [
  {
    id: 1,
    status: 'in-progress',
    date: '2025-05-20',
    timeStart: '13:00',
    timeEnd: '14:00',
    title: 'Первичный выезд',
    address: 'Ростов-на-Дону, ул. Максима Горького, д. 117',
    description: 'Выполнение технического обслуживания системы отопления.',
    coords: [47.232898, 39.703412],
    person: 'Павлов Алексей',
    dispatcher: 'Королева  Марина',
    service: 'Капельница',
    age: '22',
    tel: '+7(999)-999-00-00'
  },
  {
    id: 2,
    status: 'completed',
    date: '2025-05-16',
    timeStart: '14:30',
    timeEnd: '15:30',
    title: 'Вторичный выезд',
    address: 'Ростов-на-Дону, ул. Социалистическая, д. 125',
    description: 'Установка нового оборудования на объекте.',
    coords: [47.229101, 39.714678],
    person: 'Павлов Алексей',
    dispatcher: 'Королева  Марина',
    service: 'Какая-то услуга',
    age: '22',
    tel: '+7(999)-999-00-00'
  },
  {
    id: 3,
    status: 'pending',
    date: '2025-04-29',
    timeStart: '10:00',
    timeEnd: '11:00',
    title: 'Третий выезд',
    address: 'Ростов-на-Дону, пр. Стачки, д. 184/2',
    description: 'Замена изношенного кабеля питания.',
    coords: [47.244321, 39.732109],
    person: 'Павлов Алексей',
    dispatcher: 'Королева  Марина',
    service: 'Вывод из запоя',
    age: '22',
    tel: '+7(999)-999-00-00'
  },
  {
    id: 4,
    status: 'canceled',
    date: '2025-04-21',
    timeStart: '11:00',
    timeEnd: '12:00',
    title: 'Отменённый выезд',
    address: 'Ростов-на-Дону, ул. Береговая, д. 25',
    description: 'Клиент отменил заявку по личным причинам.',
    coords: [47.218765, 39.701234],
    person: 'Павлов Алексей',
    dispatcher: 'Королева  Марина',
    service: 'Вывод из запоя',
    age: '22',
    tel: '+7(999)-999-00-00'
  },
  {
    id: 5,
    status: 'option',
    date: '2025-04-08',
    timeStart: '15:00',
    timeEnd: '16:00',
    title: 'Резервное задание',
    address: 'Ростов-на-Дону, ул. Красноармейская, д. 143',
    description: 'Ожидает подтверждения клиента для выезда.',
    coords: [47.225678, 39.724321],
    person: 'Павлов Алексей',
    dispatcher: 'Королева  Марина',
    service: 'Вывод из запоя',
    age: '22',
    tel: '+7(999)-999-00-00'
  },
  {
    id: 6,
    status: 'option',
    date: '2025-04-09',
    timeStart: '09:00',
    timeEnd: '12:22',
    title: 'Резервный вызов',
    address: 'Ростов-на-Дону, ул. Левобережная, д. 11',
    description: 'Предварительная запись на обслуживание.',
    coords: [47.237890, 39.741234],
    person: 'Павлов Алексей',
    dispatcher: 'Королева  Марина',
    service: 'Вывод из запоя',
    age: '22',
    tel: '+7(999)-999-00-00'
  }
];

const STATUS_ICONS = {
  'in-progress': './assets/images/icons/in-progress.svg',
  'completed': './assets/images/icons/completed.svg',
  'pending': './assets/images/icons/pending.svg',
  'canceled': './assets/images/icons/canceled.svg',
  'option': './assets/images/icons/option.svg',

};

const STATUS_COLOR_BG = {
  'in-progress': '#F2F4F7',
  'completed': '#FEF0C7',
  'pending': '#F9F5FF',
  'canceled': '#FEE4E2',
  'option': '#F2F4F7',
}

const STATUS_COLOR_TEXT = {
  'in-progress': '#344054',
  'completed': '#DC6803',
  'pending': '#6941C6',
  'canceled': '#D92D20',
  'option': '#344054',
}

const STATUS_COLORS = {
  'in-progress': './assets/images/icons/pins/purple.png',
  'completed': './assets/images/icons/pins/green.png',
  'pending': './assets/images/icons/pins/gray.png',
  'canceled': './assets/images/icons/pins/gray.png',
  'option': './assets/images/icons/pins/gray.png',
}

export { JOBS, STATUS_ICONS, STATUS_COLORS, STATUS_COLOR_BG, STATUS_COLOR_TEXT };