import { ELanguageCode } from 'App/enums';

export interface IUser {
  displayName?: string;
  email?: string;
  phoneNumber?: string;
  bio?: string;
  logoUrl?: string;
  languageCode?: ELanguageCode;
}
