import { ELanguageCode } from 'App/enums';

export const getDefaultLanguageCode = () => {
  // TODO: config default language code based on device language or divice region
  return ELanguageCode.VIETNAMESE;
};
