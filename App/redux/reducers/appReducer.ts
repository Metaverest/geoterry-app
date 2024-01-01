import { RADIUS_TO_GET_NEARBY_TERRY } from 'App/constants/common';
import { ELanguageCode } from 'App/enums';
import { EMapType } from 'App/enums/map';
import { EReduxAppAction } from 'App/enums/redux';
import { IAppState, IReduxAction } from 'App/types/redux';

const defaultAppState: IAppState = {
  language: ELanguageCode.VN,
  registerData: {},
  isLoading: false,
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
    case EReduxAppAction.SET_IS_LOADING:
      return {
        ...state,
        isLoading: action.payload?.isLoading,
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
    case EReduxAppAction.SET_LOADING_STATES:
      return {
        ...state,
        loadingStates: {
          ...state.loadingStates,
          ...action.payload?.loadingStates,
        },
      };
    default:
      return state;
  }
};
export { appReducer };
