import { ELanguageCode } from 'App/enums';
import { EMapType } from 'App/enums/map';
import { EReduxAppAction } from 'App/enums/redux';
import { IRealtimeLocation } from 'App/types';
import { IError } from 'App/types/error';

import { IResponseTerryCheckins, ITerryCheckinInputDto, ITerryFilterInputDto } from 'App/types/terry';
import { ICreateAccountDto, IUser } from 'App/types/user';

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
  setPublicCategories: (publicCategories: any) => {
    return {
      type: EReduxAppAction.SET_PUBLIC_CATEGORIES,
      payload: { publicCategories },
    };
  },
  setPublicTerries: (publicTerries: any) => {
    return {
      type: EReduxAppAction.SET_PUBLIC_TERRIES,
      payload: { publicTerries },
    };
  },
  setPublicFilterTerries: (publicTerryFilter: ITerryFilterInputDto) => {
    return {
      type: EReduxAppAction.SET_PUBLIC_FILTER_TERRIES,
      payload: { publicTerryFilter },
    };
  },
  setPublicTerry: (publicTerry: any) => {
    return {
      type: EReduxAppAction.SET_PUBLIC_TERRY,
      payload: { publicTerry },
    };
  },
  setTerryCheckins: (terryCheckins: IResponseTerryCheckins[]) => {
    return {
      type: EReduxAppAction.SET_TERRY_CHECKINS,
      payload: { terryCheckins },
    };
  },
  setCheckinTerryData: (terryCheckinInput: Partial<ITerryCheckinInputDto>) => {
    return {
      type: EReduxAppAction.SET_CHECKIN_TERRY_DATA,
      payload: { terryCheckinInput },
    };
  },
  setCoordinatesPath: (coordinatesPath: { [key: string]: IRealtimeLocation[] }) => {
    return {
      type: EReduxAppAction.SET_COORDINATES_PATH,
      payload: { coordinatesPath },
    };
  },

  setOtherUserProfileToDisplay: (otherUserProfileToDisplay: IUser) => {
    return {
      type: EReduxAppAction.SET_OTHER_USER_PROFILE_TO_DISPLAY,
      payload: { otherUserProfileToDisplay },
    };
  },
};

export { reduxAppAction };
