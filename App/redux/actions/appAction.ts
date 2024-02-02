import { ELanguageCode } from 'App/enums';
import { EMapType } from 'App/enums/map';
import { EReduxAppAction, ESagaAppAction, ESagaUserAction } from 'App/enums/redux';
import { IRealtimeLocation } from 'App/types';
import { IConversationResDto, IMarkConversationAsRead, IMessageResDto } from 'App/types/chat';
import { IError } from 'App/types/error';

import {
  IPlayerNearbyResDto,
  IResponseTerryCheckins,
  ITerryCheckinInputDto,
  ITerryFilterInputDto,
} from 'App/types/terry';
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

  setNearbyPlayers: (nearbyPlayers: IPlayerNearbyResDto[]) => {
    return {
      type: EReduxAppAction.SET_USER_NEARBY_PLAYERS,
      payload: { nearbyPlayers },
    };
  },

  setLoadingStates: (loadingStates: {
    [key in ESagaUserAction | ESagaAppAction]?: boolean;
  }) => {
    return {
      type: EReduxAppAction.SET_LOADING_STATES,
      payload: { loadingStates },
    };
  },
  setConversations: (data: Record<string, IConversationResDto>) => {
    return {
      type: EReduxAppAction.SET_CONVERSATIONS,
      payload: { conversations: data },
    };
  },
  mergeConversations: (data: Record<string, IConversationResDto>) => {
    return {
      type: EReduxAppAction.MERGE_CONVERSATIONS,
      payload: { conversations: data },
    };
  },
  markConversationAsRead: (data: IMarkConversationAsRead) => {
    return {
      type: EReduxAppAction.MARK_CONVERSATION_AS_READ,
      payload: { markConversationAsRead: data },
    };
  },
  setMessages: (data: Record<string, Record<string, IMessageResDto>>) => {
    return {
      type: EReduxAppAction.SET_CONVERSATION_MESSAGES,
      payload: { messages: data },
    };
  },
  mergeMessages: (data: Record<string, Record<string, IMessageResDto>>) => {
    return {
      type: EReduxAppAction.MERGE_CONVERSATION_MESSAGES,
      payload: { messages: data },
    };
  },
  setSelectedConversationId: (data?: string) => {
    return {
      type: EReduxAppAction.SET_SELECTED_CONVERSATION_ID,
      payload: { selectedConversationId: data },
    };
  },
};

export { reduxAppAction };
