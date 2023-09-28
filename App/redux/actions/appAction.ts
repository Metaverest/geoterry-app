import { ELanguageCode } from 'App/enums';
import { EMapType } from 'App/enums/map';
import { EReduxAppAction } from 'App/enums/redux';
import { IError } from 'App/types/error';
import { ICreateAccountDto } from 'App/types/user';

const reduxAppAction = {
  setLanguage: (language: ELanguageCode) => {
    return {
      type: EReduxAppAction.SET_LANGUAGE_CODE,
      payload: { language },
    };
  },
  setRegisterData: (data: Partial<ICreateAccountDto>) => {
    return {
      type: EReduxAppAction.SET_REGISTER_DATA,
      payload: { registerData: data },
    };
  },
  setIsLoading: (isLoading: boolean) => {
    return {
      type: EReduxAppAction.SET_IS_LOADING,
      payload: { isLoading },
    };
  },
  mergeError: (error: IError) => {
    return {
      type: EReduxAppAction.MERGE_ERROR,
      payload: { error: [error] },
    };
  },
  clearError: () => {
    return {
      type: EReduxAppAction.CLEAR_ERROR,
      payload: { error: [] },
    };
  },
  setRecoveryCode: (recoveryCode: string) => {
    return {
      type: EReduxAppAction.SET_RECOVERY_CODE,
      payload: { recoveryCode },
    };
  },
  setMapType: (mapType: EMapType) => {
    return {
      type: EReduxAppAction.SET_MAP_TYPE,
      payload: { mapType },
    };
  },
};

export { reduxAppAction };
