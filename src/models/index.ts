export enum ProductType {
  WorkingLoan = 0,
  RevolvingLine = 1,
  GovContract = 2
}

export interface RangeItem {
  title: string;
  value: number;
}

export enum StepType {
  One = 0,
  Two,
  Three,
  Four,
  Five,
  Six,
  Seven,
  Eight,
  Nine
};

export interface CompanyInfo {
  title: string;
  inn: string;
};

export interface PersonalManager {
  name: string;
  phone: string;
  email: string;
  avatarUrl: string;
};

export interface AccountInfo {
  company: CompanyInfo;
  personalManager: PersonalManager;
};

export interface WizardState {
  step: number;
  allowedSteps: number[];
  product: number;
};

export enum WizardDocStatus {
  None = 0,
  Done = 1
};

export enum WizardDocType {
  Mvp,
  Bill
}

export interface WizardDoc {
  id: number;
  title: string;
  status: WizardDocStatus;
  type: WizardDocType;
}

export interface WizardDocs {
  mvpDocs: WizardDoc[];
  mvpStatus: WizardDocStatus;
  billDocs: WizardDoc[];
  billStatus: WizardDocStatus;
  calendar: CalendarModel;
  warning: boolean;
};

export enum CalendarMonthStatus {
  Require = 0,
  Ok = 1,
  Warning = 2
};

export interface CalendarMonth {
  title: string;
  year: string;
  status: CalendarMonthStatus;
};

export interface CalendarModel {
  months: CalendarMonth[];
};

export interface CalcData {
  amount: number;
  time: number;
}

export interface CalcResponse {
  monthPay: number;
  percents: number;
  interest: number;
}

export enum RatingType {
  AAAP = 'AAA+',
  AAA = 'AAA',
  AAP = 'AA+',
  AA = 'AA',
  AP = 'A+',
  A = 'A',
  BBBP = 'BBB+',
  BBB = 'BBB',
  BBP = 'BB+',
  BB = 'BB',
  BP = 'B+',
  B = 'B',
  CCCP = 'CCC+',
  CCC = 'CCC',
  CCP = 'CC+',
  CC = 'CC',
  CP = 'C+',
  C = 'C'
};

export interface Conditions {
  amount: number;
  time: number;
  period: number;
}

export interface Details {
  allOverpay: number;
  percents: number;
  percentsOverpay: number;
  commission: number;
  director: string;
  payments: PaymentItems;
}

export interface Limits {
  rating: RatingType;
  amount: number;
  percents: number;
  time: number;
  conditions: Conditions;
  details: Details;
}

export enum PeriodicPay {
  PerDay = 0,
  OnePerWeek = 1,
  TwicePerMonth = 2,
  PerMonth = 3
}

export interface ListItem {
  text: string;
}

export interface Total {
  sum: string;
  dept: string;
  percents: string;
}

export interface PaymentItem {
  id: string;
  date: string;
  sum: string;
  dept: string;
  percents: string;
  balance: string;
}

export interface PaymentItems {
  className?: string;
  items: PaymentItem[];
  total: Total;
}

export interface DenyModel {
  date: string;
}

export interface VerificationLegal {
  aprove: boolean;
  title: string;
}

export interface Verification {
  interview: {
    date: string | null;
  };
  transaction: boolean;
  legals: VerificationLegal[];
}

export enum PickerTimeStatus {
  Allow = 0,
  Deny = 1
}

export interface PickerTime {
  id: number;
  from: string;
  to: string;
  status: PickerTimeStatus;
}

export interface PickerDay {
  times: PickerTime[];
  title: string;
}

export interface PickerWeek {
  days: PickerDay[];
  title: string;
}

export interface PickerModel {
  week: PickerWeek;
  allowNext: boolean;
  allowPrev: boolean;
}

export interface VerificationProgress {
  title: string;
  from: string;
  to: string;
  percents: number;
}

export interface FinanceProgress {
  title: string;
  status: string;
  to: string;
  percents: number;
  summ: string;
  interest: number;
  raiting: string;
  date: string;
}

export interface DocumentForm {
  scan_with_photo: File;
  scan_with_reg: File;
  family: string;
  name: string;
  lastname: string;
  serial: string;
  birth_date: string;
  birth_place: string;
  reg_date: string;
  code: string;
  reg_org: string;
  reg_adress: string;
}
