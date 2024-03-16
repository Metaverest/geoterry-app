import { RADIUS_TO_GET_NEARBY_TERRY } from 'App/constants/common';
import { ELanguageCode } from 'App/enums';
import { EMapType } from 'App/enums/map';
import { EReduxAppAction } from 'App/enums/redux';
import { IAppState, IReduxAction } from 'App/types/redux';
import _ from 'lodash';
import { reduce } from 'lodash';

const defaultAppState: IAppState = {
  language: ELanguageCode.VN,
  registerData: {},
  error: [],
  recoveryCode: '',
  mapType: EMapType.STANDARD,
  publicCategories: [],
  publicTerries: [],
  publicTerryFilter: {
    categoryIds: undefined,
    size: { min: 1, max: 5 },
    difficulty: { min: 1, max: 5 },
    rate: { min: 1, max: 5 },
    terrain: { min: 1, max: 5 },
    distance: { min: 0, max: RADIUS_TO_GET_NEARBY_TERRY },
  },
  publicTerry: undefined,
  terryCheckins: [],
  // Used to store data for checkin terry flow
  terryCheckinInput: {
    rate: 5,
  },
  coordinatesPath: {},
  otherUserProfileToDisplay: undefined,
  nearbyPlayers: [],
  loadingStates: {},
  terryVerifyCodes: {},
  conversations: undefined,
  messages: {},
  selectedConversationId: undefined,
  conversationStat: {},
  nearbyPlayerLocation: {},
};
const appReducer = (state = defaultAppState, action: IReduxAction<EReduxAppAction, IAppState>): IAppState => {
  switch (action.type) {
    case EReduxAppAction.SET_LANGUAGE_CODE:
      return {
        ...state,
        language: action.payload?.language,
      };
    case EReduxAppAction.SET_REGISTER_DATA:
      return {
        ...state,
        registerData: {
          ...state.registerData,
          ...action.payload?.registerData,
        },
      };
    case EReduxAppAction.MERGE_ERROR:
      return {
        ...state,
        error: [...(state.error || []), ...(action.payload?.error || [])],
      };
    case EReduxAppAction.CLEAR_ERROR:
      return {
        ...state,
        error: [],
      };
    case EReduxAppAction.SET_RECOVERY_CODE:
      return {
        ...state,
        recoveryCode: action.payload?.recoveryCode,
      };
    case EReduxAppAction.SET_MAP_TYPE:
      return {
        ...state,
        mapType: action.payload?.mapType,
      };
    case EReduxAppAction.SET_PUBLIC_CATEGORIES:
      return {
        ...state,
        publicCategories: action.payload?.publicCategories,
      };
    case EReduxAppAction.SET_PUBLIC_TERRIES:
      return {
        ...state,
        publicTerries: action.payload?.publicTerries,
      };
    case EReduxAppAction.SET_PUBLIC_FILTER_TERRIES:
      return {
        ...state,
        publicTerryFilter: {
          ...state.publicTerryFilter,
          ...action.payload?.publicTerryFilter,
        },
      };
    case EReduxAppAction.SET_PUBLIC_TERRY:
      return {
        ...state,
        publicTerry: action.payload?.publicTerry,
      };
    case EReduxAppAction.SET_TERRY_CHECKINS:
      return {
        ...state,
        terryCheckins: [
          ...(state.terryCheckins || []),
          ...(action.payload?.terryCheckins?.filter(item => !state.terryCheckins?.some(e => item.id === e.id)) || []),
        ],
      };
    case EReduxAppAction.SET_CHECKIN_TERRY_DATA:
      return {
        ...state,
        terryCheckinInput: {
          ...state.terryCheckinInput,
          ...action.payload?.terryCheckinInput,
        },
      };

    case EReduxAppAction.SET_COORDINATES_PATH:
      return {
        ...state,
        coordinatesPath: {
          ...state.coordinatesPath,
          ...action.payload?.coordinatesPath,
        },
      };
    case EReduxAppAction.SET_OTHER_USER_PROFILE_TO_DISPLAY:
      return {
        ...state,
        otherUserProfileToDisplay: action.payload?.otherUserProfileToDisplay,
      };
    case EReduxAppAction.SET_USER_NEARBY_PLAYERS:
      return {
        ...state,
        nearbyPlayers: action.payload?.nearbyPlayers,
      };
    case EReduxAppAction.SET_TERRY_VERIFY_CODE:
      return {
        ...state,
        terryVerifyCodes: {
          ...state.terryVerifyCodes,
          ...action.payload?.terryVerifyCodes,
        },
      };
    case EReduxAppAction.SET_LOADING_STATES:
      return {
        ...state,
        loadingStates: {
          ...state.loadingStates,
          ...action.payload?.loadingStates,
        },
      };
    case EReduxAppAction.SET_CONVERSATION_STAT:
      return {
        ...state,
        conversationStat: action.payload?.conversationStat,
      };
    case EReduxAppAction.SET_CONVERSATIONS:
      return {
        ...state,
        conversations: {
          ...action.payload?.conversations,
        },
      };
    case EReduxAppAction.MERGE_CONVERSATIONS:
      const conversationIdListToBeMerged = Object.values(action.payload?.conversations || {})?.map(
        conversation => conversation.id,
      );
      return {
        ...state,
        conversations: {
          ...action.payload?.conversations,
          ..._.omit(state.conversations, conversationIdListToBeMerged),
        },
      };
    case EReduxAppAction.UPDATE_CONVERSATION:
      const conversationToUpdate = state?.conversations?.[action.payload?.conversationUpdateData?.conversationId!];
      if (!conversationToUpdate) {
        return state;
      }
      if (action.payload?.conversationUpdateData?.markConversationAsRead) {
        return {
          ...state,
          conversations: {
            ...state.conversations,
            [conversationToUpdate.id]: {
              ...conversationToUpdate,
              participants: conversationToUpdate.participants.map(participant => {
                return {
                  ...participant,
                  unreadMsgCnt:
                    participant.profileId === action.payload?.conversationUpdateData?.markConversationAsRead?.profileId
                      ? 0
                      : participant.unreadMsgCnt,
                };
              }),
            },
          },
        };
      }

      if (action.payload?.conversationUpdateData?.markConversationAsUnRead) {
        return {
          ...state,
          conversations: {
            ...state.conversations,
            [conversationToUpdate.id]: {
              ...conversationToUpdate,
              participants: conversationToUpdate.participants.map(participant => {
                return {
                  ...participant,
                  unreadMsgCnt:
                    participant.profileId ===
                    action.payload?.conversationUpdateData?.markConversationAsUnRead?.profileId
                      ? participant.unreadMsgCnt +
                        action.payload?.conversationUpdateData?.markConversationAsUnRead.increaseUnreadMsgCntBy
                      : participant.unreadMsgCnt,
                };
              }),
            },
          },
        };
      }

      if (action.payload?.conversationUpdateData?.updateConversationSnippet) {
        return {
          ...state,
          conversations: {
            [conversationToUpdate.id]: {
              ...conversationToUpdate,
              lastMsg: {
                ...conversationToUpdate.lastMsg,
                ...action.payload?.conversationUpdateData?.updateConversationSnippet,
              },
            },
            // to make sure that this conversation should be stand at the top of the conversation list
            ..._.omit(state.conversations, conversationToUpdate.id),
          },
        };
      }
      return state;
    case EReduxAppAction.SET_CONVERSATION_MESSAGES:
      // List of conversation ids that have messages need to be merged
      const conversationIdsNeedToBeSet = Object.keys(action.payload?.messages || {});
      const newMessagesNeedToBeSet = reduce(
        conversationIdsNeedToBeSet,
        (result, conversationId) => {
          return {
            ...result,
            [conversationId]: {
              ...(action.payload?.messages || {})[conversationId],
            },
          };
        },
        {},
      );
      return {
        ...state,
        messages: {
          ...state.messages,
          ...newMessagesNeedToBeSet,
        },
      };
    case EReduxAppAction.MERGE_CONVERSATION_MESSAGES:
      // List of conversation ids that have messages need to be set
      const conversationIdsNeedToBeMerged = Object.keys(action.payload?.messages || {});
      const newMessages = reduce(
        conversationIdsNeedToBeMerged,
        (result, conversationId) => {
          return {
            ...result,
            [conversationId]: {
              ...(state.messages[conversationId] || {}),
              ...(action.payload?.messages || {})[conversationId],
            },
          };
        },
        {},
      );

      return {
        ...state,
        messages: {
          ...state.messages,
          ...newMessages,
        },
      };
    case EReduxAppAction.SET_SELECTED_CONVERSATION_ID:
      return {
        ...state,
        selectedConversationId: action?.payload?.selectedConversationId,
      };
    case EReduxAppAction.SET_NEARBY_PLAYER_LOCATION:
      return {
        ...state,
        nearbyPlayerLocation: {
          ...state?.nearbyPlayerLocation,
          ...action?.payload?.nearbyPlayerLocation,
        },
      };
    default:
      return state;
  }
};
export { appReducer };
