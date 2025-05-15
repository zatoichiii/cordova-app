const DIAGNOSES = [
  {
    id: 1,
    name: 'Алкогольная зависимость',
    description: 'Хроническое заболевание, характеризующееся физической и психологической зависимостью от алкоголя.',
  },
  {
    id: 2,
    name: 'Опиоидная зависимость',
    description: 'Зависимость от опиоидных веществ, таких как героин, морфин, метадон.',
  },
  {
    id: 3,
    name: 'Наркомания неопиоидная',
    description: 'Зависимость от психоактивных веществ, не относящихся к опиоидам.',
  },
  {
    id: 4,
    name: 'Психические расстройства',
    description: 'Сопутствующие расстройства, такие как депрессия, тревожные расстройства, шизофрения.',
  },
  {
    id: 5,
    name: 'Смешанная зависимость',
    description: 'Комбинация нескольких видов зависимости, например, алкогольной и наркотической.',
  },
];


const COMPLEX = [
  {
    id: 1,
    name: 'Первая',
  },
  {
    id: 2,
    name: 'Вторая',
  },
  {
    id: 3,
    name: 'Третья',
  },
  {
    id: 4,
    name: 'Четвертая',
  },
    {
    id: 5,
    name: 'Пятая',
  },
];

const ADMINS = [
  {
    id: 1,
    name: 'Королева Марина',
    role: 'Администратор',
    tel: '+7(999)-999-00-00'
  },
  {
    id: 2,
    name: 'Иванова Ольга',
    role: 'Администратор',
    tel: '+7(999)-999-00-00'
  },
  {
    id: 3,
    name: 'Петрова Татьяна',
    role: 'Диспетчер',
    tel: '+7(999)-999-00-00'
  },
  {
    id: 4,
    name: 'Смирнова Наталья431',
    role: 'Администратор',
    tel: '+7(999)-999-00-00'
  },
    {
    id: 5,
    name: 'Смирнова Наталья21',
    role: 'Администратор',
    tel: '+7(999)-999-00-00'
  },
    {
    id: 6,
    name: 'Смирнова Наталья41',
    role: 'Администратор',
    tel: '+7(999)-999-00-00'
  },
    {
    id: 7,
    name: 'Смирнова Наталья12',
    role: 'Администратор',
    tel: '+7(999)-999-00-00'
  },
    {
    id: 8,
    name: 'Смирнова Наталья2',
    role: 'Администратор',
    tel: '+7(999)-999-00-00'
  },
];

const PARAMEDICS = [
  {
    id: 1,
    name: 'Королева Марина',
    role: 'Администратор',
    tel: '+7(999)-999-00-00'
  },
  {
    id: 2,
    name: 'Иванова Ольга',
    role: 'Администратор',
    tel: '+7(999)-999-00-00'
  },
  {
    id: 3,
    name: 'Петрова Татьяна',
    role: 'Диспетчер',
    tel: '+7(999)-999-00-00'
  },
  {
    id: 4,
    name: 'Смирнова Наталья431',
    role: 'Администратор',
    tel: '+7(999)-999-00-00'
  },
    {
    id: 5,
    name: 'Смирнова Наталья21',
    role: 'Администратор',
    tel: '+7(999)-999-00-00'
  },
    {
    id: 6,
    name: 'Смирнова Наталья41',
    role: 'Администратор',
    tel: '+7(999)-999-00-00'
  },
    {
    id: 7,
    name: 'Смирнова Наталья12',
    role: 'Администратор',
    tel: '+7(999)-999-00-00'
  },
    {
    id: 8,
    name: 'Смирнова Наталья2',
    role: 'Администратор',
    tel: '+7(999)-999-00-00'
  },
];

const STATUSES = [
  {
    value: 'in-progress',
    label: 'В процессе',
    icon: './assets/images/icons/in-progress.svg',
    color: './assets/images/icons/pins/purple.png',
  },
  {
    value: 'completed',
    label: 'Выполнено',
    icon: './assets/images/icons/completed.svg',
    color: './assets/images/icons/pins/green.png',
  },
  {
    value: 'pending',
    label: 'Ожидает',
    icon: './assets/images/icons/pending.svg',
    color: './assets/images/icons/pins/gray.png',
  },
  {
    value: 'canceled',
    label: 'Отменено',
    icon: './assets/images/icons/canceled.svg',
    color: './assets/images/icons/pins/red.png',
  },
  {
    value: 'option',
    label: 'Резерв',
    icon: './assets/images/icons/option.svg',
    color: './assets/images/icons/pins/yellow.png',
  },
];

export { DIAGNOSES, ADMINS, STATUSES, PARAMEDICS, COMPLEX };