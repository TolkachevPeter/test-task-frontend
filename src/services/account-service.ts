import {testResponse} from "./util";
import {AccountInfo} from '../models';

const NAME_TEXT = 'Азамат Хугаев';
const PHONE_TEXT = '+7 (968) 865-65-26';
const EMAIL_TEXT = 'ak@jetlend.ru';
const PHOTO_IMG = `${process.env.PUBLIC_URL}/assets/face.png`;

const TITLE_TEXT = 'ООО "Ромашка обыкновенная"';
const INN_TEXT = 'ИНН 123456789101';

const accountInfo: AccountInfo = {
  company: {
    title: TITLE_TEXT,
    inn: INN_TEXT
  },
  personalManager: {
    name: NAME_TEXT,
    phone: PHONE_TEXT,
    email: EMAIL_TEXT,
    avatarUrl: PHOTO_IMG
  }
};

export function apiGetAccountInfo() {
  return testResponse(accountInfo, 'account');
}
