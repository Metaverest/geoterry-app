import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Config from 'react-native-config';
import { getDefaultLanguageCode } from './localize';
import { getStoredProperty } from '../storage/storage';
import { EDataStorageKey } from '../storage/keys';
import { ELanguageCode } from '../../Types/common';

const languageDetector: any = {
  type: 'languageDetector',
  async: true,
  detect: (callback: any) => {
    getStoredProperty<string>(EDataStorageKey.LANGUAGE).then((savedLanguageCode?: string) => {
      if (savedLanguageCode) {
        callback(savedLanguageCode);
      } else {
        callback(getDefaultLanguageCode());
      }
    });
  },
  init: () => {},
  cacheUserLanguage: () => {},
};

const setupI18N = () => {
  i18n
    .use(languageDetector)
    .use(initReactI18next)
    .init({
      compatibilityJSON: 'v3',
      fallbackLng: ELanguageCode.VIETNAMESE,
      resources: {
        [ELanguageCode.ENGLISH]: {
          common: require('./locales/en.json'),
        },
        [ELanguageCode.VIETNAMESE]: {
          common: require('./locales/vn.json'),
        },
      },
      ns: ['common'],
      defaultNS: 'common',
      debug: !!Config.LOCAL,
      cache: {
        enabled: true,
      },
      interpolation: {
        escapeValue: false,
      },
      keySeparator: '->',
    });
};

export default setupI18N;
