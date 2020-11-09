import {
  WizardDocs,
  WizardDocStatus,
  WizardDocType,
  CalendarMonthStatus,
  CalendarMonth,
  RatingType,
  Conditions,
  Details,
  Limits,
  PaymentItems,
  DenyModel,
  Verification,
  PickerModel,
  PickerWeek,
  PickerDay,
  PickerTime,
  PickerTimeStatus,
  VerificationProgress,
  FinanceProgress} from '../models';

export const docs: WizardDocs = {
  mvpDocs: [
    {id: 11, title: 'Иванов Иван Иванович', status: WizardDocStatus.None, type: WizardDocType.Mvp},
    {id: 12, title: 'Петров Петр Петрович', status: WizardDocStatus.None, type: WizardDocType.Mvp},
    {id: 13, title: 'Александров Александр Александрович', status: WizardDocStatus.None, type: WizardDocType.Mvp}
  ],
  mvpStatus: WizardDocStatus.None,
  billDocs: [
    {id: 14, title: '', status: WizardDocStatus.None, type: WizardDocType.Bill}
  ],
  billStatus: WizardDocStatus.None,
  calendar: {
    months: []
  },
  warning: false
};

export const docsSuccess: WizardDocs = {
  mvpDocs: [
    {id: 11, title: 'Иванов Иван Иванович', status: WizardDocStatus.Done, type: WizardDocType.Mvp},
    {id: 12, title: 'Петров Петр Петрович', status: WizardDocStatus.Done, type: WizardDocType.Mvp},
    {id: 13, title: 'Александров Александр Александрович', status: WizardDocStatus.Done, type: WizardDocType.Mvp}
  ],
  mvpStatus: WizardDocStatus.Done,
  billDocs: [
    {id: 14, title: '40702810301500023683 (АО "ТИНЬКОФФ БАНК")', status: WizardDocStatus.Done, type: WizardDocType.Bill},
    {id: 15, title: '40702810301500023683 ("МОДУЛЬБАНК")', status: WizardDocStatus.Done, type: WizardDocType.Bill},
    {id: 16, title: '40702810301500023683 (ПАО "Совкомбанк" (Москва))', status: WizardDocStatus.Done, type: WizardDocType.Bill}
  ],
  billStatus: WizardDocStatus.Done,
  calendar: {
    months: []
  },
  warning: true
};

const MONTHS = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь',
];

const YEARS = ['2019', '2020', '2021'];

YEARS.forEach((year: string, index: number) => {
  let status = CalendarMonthStatus.Ok;
  if(index === 1) status = CalendarMonthStatus.Require;
  if(index === 2) status = CalendarMonthStatus.Warning;
  MONTHS.forEach((month: string) => {
    const monthItem: CalendarMonth = {
      title: month,
      year: year,
      status
    };
    docsSuccess.calendar.months.push(monthItem);
  });
});

export const conditions: Conditions = {
  amount: 500000,
  time: 1,
  period: 1
}

const payments: PaymentItems = {
  items: [{
    id: '001254', date: '01.02.2018', sum: '1 500,98 руб.', dept: '2 500,98 руб.', percents: '500,98 руб.', balance: '151 500,98 руб.'
  }, {
    id: '001255', date: '01.03.2018', sum: '1 500,98 руб.', dept: '2 500,98 руб.', percents: '500,98 руб.', balance: '151 500,98 руб.'
  }, {
    id: '001256', date: '01.04.2018', sum: '1 500,98 руб.', dept: '2 500,98 руб.', percents: '500,98 руб.', balance: '151 500,98 руб.'
  }, {
    id: '001257', date: '01.05.2018', sum: '1 500,98 руб.', dept: '2 500,98 руб.', percents: '500,98 руб.', balance: '151 500,98 руб.'
  }],
  total: {dept: '10 000,98 руб.', percents: '3 500,98 руб.', sum: '6 000,98 руб.'}
};

export const startDetails: Details = {
  allOverpay: 123000,
  percents: 39,
  percentsOverpay: 55000,
  commission: 11000,
  director: 'Иванова Ивана Ивановича',
  payments
}

export const limits: Limits = {
  rating: RatingType.BB,
  amount: 1300000,
  percents: 19,
  time: 9,
  conditions,
  details: startDetails
}

export const details: Details = {
  allOverpay: 204000,
  percents: 11,
  percentsOverpay: 155000,
  commission: 9000,
  director: 'Иванова Ивана Ивановича',
  payments
};

const nextDate = new Date(new Date().setDate(new Date().getDate() + 30));
const nextDay = nextDate.getDate().toString().padStart(2, '0');
const nextMonth = (nextDate.getMonth() + 1).toString().padStart(2, '0');
const nextYear = nextDate.getFullYear();
const nextDateStr = `${nextDay}.${nextMonth}.${nextYear}`;
export const deny: DenyModel = {
  date: nextDateStr
};

export const verificationOne: Verification = {
  interview: {
    date: null
  },
  transaction: false,
  legals: [{
    aprove: false,
    title: '40702810301500023683 (АО "ТИНЬКОФФ БАНК")'
  }, {
    aprove: false,
    title: '40702810301500023683 (МОСКОВСКИЙ ФИЛИАЛ АО КБ "МОДУЛЬБАНК")'
  }, {
    aprove: false,
    title: '40702810301500023683 (Филиал "Бизнес" ПАО "Совкомбанк" (Москва))'
  }]
}

export const verificationTwo: Verification = {
  interview: {
    date: '13.30 - 15.00 28.08.2020'
  },
  transaction: false,
  legals: [{
    aprove: false,
    title: '40702810301500023683 (АО "ТИНЬКОФФ БАНК")'
  }, {
    aprove: false,
    title: '40702810301500023683 (МОСКОВСКИЙ ФИЛИАЛ АО КБ "МОДУЛЬБАНК")'
  }, {
    aprove: false,
    title: '40702810301500023683 (Филиал "Бизнес" ПАО "Совкомбанк" (Москва))'
  }]
}

export const verificationThree: Verification = {
  interview: {
    date: '13.30 - 15.00 28.08.2020'
  },
  transaction: true,
  legals: [{
    aprove: false,
    title: '40702810301500023683 (АО "ТИНЬКОФФ БАНК")'
  }, {
    aprove: false,
    title: '40702810301500023683 (МОСКОВСКИЙ ФИЛИАЛ АО КБ "МОДУЛЬБАНК")'
  }, {
    aprove: false,
    title: '40702810301500023683 (Филиал "Бизнес" ПАО "Совкомбанк" (Москва))'
  }]
}

export const verificationFour: Verification = {
  interview: {
    date: '13.30 - 15.00 28.08.2020'
  },
  transaction: true,
  legals: [{
    aprove: true,
    title: '40702810301500023683 (АО "ТИНЬКОФФ БАНК")'
  }, {
    aprove: true,
    title: '40702810301500023683 (МОСКОВСКИЙ ФИЛИАЛ АО КБ "МОДУЛЬБАНК")'
  }, {
    aprove: true,
    title: '40702810301500023683 (Филиал "Бизнес" ПАО "Совкомбанк" (Москва))'
  }]
}

const getTimes = (): PickerTime[] => {
  return [
    {from: '10:00', to: '11:30', status: PickerTimeStatus.Allow, id: 0},
    {from: '11:30', to: '13:00', status: PickerTimeStatus.Allow, id: 0},
    {from: '13:00', to: '14:30', status: PickerTimeStatus.Allow, id: 0},
    {from: '14:30', to: '16:00', status: PickerTimeStatus.Deny, id: 0},
    {from: '16:00', to: '17:30', status: PickerTimeStatus.Deny, id: 0},
    {from: '17:30', to: '19:00', status: PickerTimeStatus.Deny, id: 0},
  ];
}

const getDayOfWeek = (index: number): string => {
  switch(index) {
    case 0: return 'ПН';
    case 1: return 'ВТ';
    case 2: return 'СР';
    case 3: return 'ЧТ';
    case 4: return 'ПТ';
  }
  return '';
}

const getDays = (startDay: number): PickerDay[] => {
  const result = [];
  for(let index = 0; index < 5; index++) {
    const day = startDay + index;
    const dayStr = getDayOfWeek(index);
    const times = getTimes();
    result.push({title: `${dayStr}, ${day}`, times});
  }
  return result;
}

const getMonth = (month: string): PickerWeek => {
  const startDay = 1;
  const days = getDays(startDay);
  return {days, title: `${startDay}-${startDay+6} ${month}`};
}

export const pickerData: PickerModel = {
  week: getMonth('июля'),
  allowNext: true,
  allowPrev: true
};

export const verificationProgress: VerificationProgress = {
  title: 'ООО "Ромашка обыкновенная" ИНН 012345678910 №1234567891012345678910 (МОСКОВСКИЙ ФИЛИАЛ АО КБ "МОДУЛЬ БАНК")',
  from: '10.06.2019 15:45',
  to: '11.06.2019 15:45',
  percents: 0
};

export const financeProgress: FinanceProgress = {
  title: 'ООО "КЭБ" ',
  status: 'сбор финансирования',
  to: '19.02.2020 12:00',
  percents: 0,
  summ: '1 000 000',
  interest: 25,
  raiting: 'BB',
  date: '182 дня'
};

