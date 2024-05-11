import { ELanguageCode } from 'App/enums';
import { EMapType } from 'App/enums/map';
import { EReduxAppAction, ESagaAppAction, ESagaUserAction } from 'App/enums/redux';
import { IRealtimeLocation } from 'App/types';
import {
  IConversationResDto,
  IReduxUpdateConversation,
  IMessageResDto,
  IFilterConversationStatRes,
} from 'App/types/chat';
import { IError } from 'App/types/error';

import {
  IPlayerNearbyResDto,
  IResponseTerryCheckins,
  ITerryCheckinInputDto,
  ITerryFilterInputDto,
  Location,
} from 'App/types/terry';
import { ICreateAccountDto, IUser } from 'App/types/user';
import { LatLng } from 'react-native-maps';

const reduxAppAction = {
  resetAppStates: () => {
    return {
      type: EReduxAppAction.RESET_APP_STATES,
      payload: {},
    };
  },

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
  mergeTerryCheckins: (terryCheckins: IResponseTerryCheckins[]) => {
    return {
      type: EReduxAppAction.MERGE_TERRY_CHECKINS,
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

  setCurrentUserLocation: (location: Location) => {
    return {
      type: EReduxAppAction.SET_USER_CURRENT_LOCATION,
      payload: { currentLocation: location },
    };
  },

  setTerryVerifyCode: (terryId: string, code: string) => {
    return {
      type: EReduxAppAction.SET_TERRY_VERIFY_CODE,
      payload: { terryVerifyCodes: { [terryId]: code } },
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
  setConversationStat: (data: IFilterConversationStatRes) => {
    return {
      type: EReduxAppAction.SET_CONVERSATION_STAT,
      payload: { conversationStat: data },
    };
  },
  setConversations: (data: Record<string, IConversationResDto>) => {
    return {
      type: EReduxAppAction.SET_CONVERSATIONS,
      payload: { conversations: data },
    };
  },
  mergeConversations: (data: Record<string, IConversationResDto>, sort?: boolean) => {
    return {
      type: EReduxAppAction.MERGE_CONVERSATIONS,
      payload: { conversations: data, sort },
    };
  },
  // to update conversation saved in redux store
  updateConversation: (data: IReduxUpdateConversation) => {
    return {
      type: EReduxAppAction.UPDATE_CONVERSATION,
      payload: { conversationUpdateData: data },
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
  setNearbyPlayerLocation: (data: Record<string, LatLng>) => {
    return {
      type: EReduxAppAction.SET_NEARBY_PLAYER_LOCATION,
      payload: { nearbyPlayerLocation: data },
    };
  },
};

export { reduxAppAction };
