import { EDataStorageKey, ELanguageCode } from 'App/enums';
import i18n from 'i18next';
import { setPropertyInDevice } from '../storage/storage';

export const getDefaultLanguageCode = () => {
  // TODO: config default language code based on device language or device region
  return ELanguageCode.VN;
};

export const i18nChangeLanguage = async (language: ELanguageCode) => {
  i18n.changeLanguage(language);
  await setPropertyInDevice(EDataStorageKey.LANGUAGE, language);
};
