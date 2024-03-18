/* eslint-disable max-lines */
import { CommonActions } from '@react-navigation/native';
import { StackActions } from '@react-navigation/routers';
import { FoundProfileImage, NoteImage } from 'App/components/image';
import {
  EDataStorageKey,
  EIdentifierType,
  ENamespace,
  EPublicReadProfileBy,
  EUseRoleRequestStatus,
  EUserRole,
} from 'App/enums';
import { EErrorCode, EStatusCode } from 'App/enums/error';
import {
  ECreateProfileScreen,
  EForgotPasswordScreen,
  EMainGameScreen,
  ENavigationScreen,
  EPopUpModalType,
} from 'App/enums/navigation';
import { ESagaAppAction, ESagaUserAction } from 'App/enums/redux';
import { generateLocalMessageId } from 'App/helpers/common';
import { reduxAppAction } from 'App/redux/actions/appAction';
import { reduxUserAction, sagaUserAction } from 'App/redux/actions/userAction';
import { reduxSelector } from 'App/redux/selectors';
import { IRealtimeLocation } from 'App/types';
import { IFilterTerryCategoryInputDto, ITerryCategoryResDto } from 'App/types/category';
import {
  IConversationResDto,
  IFilterConversationStatRes,
  IMessageResDto,
  IRequestHunterFilterConversationsQueryParams,
  IRequestHunterReadConversationMessagesQueryParams,
  ISendMessageInputDto,
} from 'App/types/chat';
import { IError } from 'App/types/error';
import { IPopupModalParamsProps } from 'App/types/modal';
import { IReduxActionWithNavigation } from 'App/types/redux';
import {
  IFilterTerryCheckins,
  IGetTerryByIdParams,
  IPlayerNearbyResDto,
  IResponseTerryCheckins,
  ITerryCheckinInputDto,
  ITerryCheckinsParams,
  ITerryFilterInputDto,
  ITerryFilterParams,
  ITerryInputDto,
  ITerryResponseDto,
  Location,
} from 'App/types/terry';

import {
  IAccountLoginDto,
  IAccountResponseDto,
  IAccountUpdateCredentialsDto,
  ICreateAccountDto,
  ICreateProfileReqDto,
  IProfileResDto,
  IRecoveryAccountDto,
  IUploadProfileResDto,
  IUser,
  IVerifyAccountRecoverOTPDto,
  IVerifyAccountRecoverOTPResDto,
} from 'App/types/user';
import AXIOS, {
  requestAccountRecover,
  requestBuilderCreateTerry,
  requestCreateAccount,
  requestCreateProfile,
  requestGetNearbyPlayers,
  requestGetOTP,
  requestHunterCheckinTerry,
  requestHunterFilterConversations,
  requestHunterFilterTerryCheckins,
  requestHunterGetTerryById,
  requestHunterReadConversationMessages,
  requestHunterSendMessage,
  requestHunterUpsertTerryUserPath,
  requestLogin,
  requestPublicFilterTerryCategories,
  requestPublicGetTerries,
  requestPublicReadProfile,
  requestPublicReadOtherProfile,
  requestSwitchRole,
  requestUpdateCredentials,
  requestUploadProfileImage,
  requestUserCreateOrUpdateDevice,
  requestUserReadProfile,
  requestUserUpdateProfile,
  requestVerifyAccountRecoveryOTP,
  setAuthorizationRequestHeader,
  requestHunterFilterConversationStat,
  requestHunterVerifyTerry,
} from 'App/utils/axios';
import {
  PopUpModalParams,
  getPopupModalParamsFromErrorCodeAndStatusCode,
  navigateToPopUpModal,
  resetAndNavigateToScreen,
} from 'App/utils/navigation';
import { getStoredProperty, removePropertyInDevice, setPropertyInDevice } from 'App/utils/storage/storage';
import { t } from 'i18next';
import { isEmpty, isNil, last, map, reduce } from 'lodash';
import { all, call, put, select, takeLatest } from 'redux-saga/effects';

function* handleError(error: IError, navigation: any, additionalPopupModalParams?: IPopupModalParamsProps) {
  console.log(`[⚠ ERROR] ${error?.errorCode} - ${error?.statusCode} - ${error?.message}]`);
  const errorPopupParams = getPopupModalParamsFromErrorCodeAndStatusCode(
    error?.errorCode as EErrorCode,
    error?.statusCode as EStatusCode,
    additionalPopupModalParams,
  );
  if (!isEmpty(errorPopupParams)) {
    navigateToPopUpModal(navigation, errorPopupParams);
  }
}

function* createAccount(action: IReduxActionWithNavigation<ESagaUserAction, ICreateAccountDto>) {
  const { data, navigation } = action.payload;
  try {
    navigation.dispatch(StackActions.push(ENavigationScreen.LOADING_MODAL));
    const response: IAccountResponseDto = yield call(requestCreateAccount, data as ICreateAccountDto);
    yield call(setPropertyInDevice, EDataStorageKey.ACCESS_TOKEN, response.credentials?.token);
    yield call(setPropertyInDevice, EDataStorageKey.REFRESH_TOKEN, response.credentials?.refreshToken);
    navigation.dispatch(StackActions.pop());
    navigation.dispatch(CommonActions.navigate(ENavigationScreen.CREATE_PROFILE_NAVIGATOR));
  } catch (error) {
    yield call(handleError, error?.response?.data as IError, navigation);
    yield put(reduxAppAction.mergeError(error?.response?.data as IError));
    navigation.dispatch(StackActions.pop());
  }
}

export function* watchCreateAccountAsync() {
  yield takeLatest(ESagaUserAction.CREATE_ACCOUNT, createAccount);
}

function* login(action: IReduxActionWithNavigation<ESagaUserAction, IAccountLoginDto>) {
  const { data, navigation } = action.payload;
  try {
    navigation.dispatch(StackActions.push(ENavigationScreen.LOADING_MODAL));
    const response: IAccountResponseDto = yield call(requestLogin, data as IAccountLoginDto);
    yield call(setPropertyInDevice, EDataStorageKey.ACCESS_TOKEN, response?.credentials?.token);
    yield call(setPropertyInDevice, EDataStorageKey.REFRESH_TOKEN, response?.credentials?.refreshToken);
    yield call(setPropertyInDevice, EDataStorageKey.NAMESPACE, response?.namespace);
    yield call(setAuthorizationRequestHeader, AXIOS);
    navigation.dispatch(StackActions.pop());
    yield put(sagaUserAction.getProfileAndGoToMainAppAsync(navigation));
  } catch (error) {
    yield call(handleError, error?.response?.data as IError, navigation);
    navigation.dispatch(StackActions.pop());
    yield put(reduxAppAction.mergeError(error?.response?.data as IError));
  }
}

export function* watchLoginAccountAsync() {
  yield takeLatest(ESagaUserAction.LOGIN_ACCOUNT, login);
}

function* getOTP(action: IReduxActionWithNavigation<ESagaUserAction, ICreateAccountDto>) {
  const { data, navigation, options } = action.payload;
  try {
    navigation.dispatch(StackActions.push(ENavigationScreen.LOADING_MODAL));
    yield put(reduxAppAction.setRegisterData(data as ICreateAccountDto));
    yield call(requestGetOTP, {
      identifier: data?.identifier as string,
      identifierType: data?.identifierType as EIdentifierType,
      isRecoverPassword: options?.isRecoverPassword as boolean,
      namespace: data?.namespace as ENamespace,
    });
    navigation.dispatch(StackActions.pop());
    navigation.dispatch(
      CommonActions.navigate({
        name: ENavigationScreen.OTP_SCREEN,
        params: { isRecoverPassword: options?.isRecoverPassword },
      }),
    );
  } catch (error) {
    yield call(handleError, error?.response?.data as IError, navigation);
    yield put(reduxAppAction.mergeError(error?.response?.data as IError));
    navigation.dispatch(StackActions.pop());
  }
}

export function* watchGetOTPAsync() {
  yield takeLatest(ESagaUserAction.GET_OTP, getOTP);
}

function* createProfile(action: IReduxActionWithNavigation<ESagaUserAction>) {
  const { navigation } = action.payload;
  try {
    navigation.dispatch(StackActions.push(ENavigationScreen.LOADING_MODAL));

    const displayName: string = yield call(getStoredProperty, EDataStorageKey.DISPLAY_NAME_TO_CREATE_PROFILE);
    const avatarUrl: string = yield call(getStoredProperty, EDataStorageKey.AVATAR_TO_CREATE_PROFILE);
    const data: ICreateProfileReqDto = {
      displayName,
      logoUrl: avatarUrl,
    };
    const createProfileResponse: IProfileResDto = yield call(requestCreateProfile, data);
    yield put(reduxUserAction.setUser(createProfileResponse as IUser));
    const navigator = navigation.getParent();
    if (navigator) {
      navigator.dispatch(StackActions.pop());
    }
    navigation.dispatch(StackActions.push(ECreateProfileScreen.CREATE_PROFILE_SUCCESS_SCREEN));
    setTimeout(() => {
      navigation.dispatch(StackActions.push(ECreateProfileScreen.PERMISSION_LOCATION_SCREEN));
    }, 5000);
  } catch (error) {
    yield call(handleError, (error as any)?.response?.data as IError, navigation);
    navigation.dispatch(StackActions.pop());
  }
}

export function* watchCreateProfileAsync() {
  yield takeLatest(ESagaUserAction.CREATE_PROFILE, createProfile);
}

function* handleSubmitDisplayName(action: IReduxActionWithNavigation<ESagaUserAction, string>) {
  const { data, navigation } = action.payload;
  try {
    navigation.dispatch(StackActions.push(ENavigationScreen.LOADING_MODAL));
    yield setPropertyInDevice(EDataStorageKey.DISPLAY_NAME_TO_CREATE_PROFILE, data);
    yield put(reduxUserAction.setUser({ displayName: data }));
    const navigator = navigation.getParent();
    if (navigator) {
      navigator.dispatch(StackActions.pop());
    }
    navigation.dispatch(StackActions.push(ECreateProfileScreen.CHOOSE_AVATAR_SCREEN));
  } catch (error) {
    yield call(handleError, (error as any)?.response?.data as IError, navigation);
    yield put(reduxAppAction.mergeError((error as any)?.response?.data as IError));
    const navigator = navigation.getParent();
    if (navigator) {
      navigator.dispatch(StackActions.pop());
    }
  }
}

export function* watchHandleSubmitDisplayNameAsync() {
  yield takeLatest(ESagaUserAction.HANDLE_SUBMIT_DISPLAY_NAME, handleSubmitDisplayName);
}

function* uploadAvatarProfile(action: IReduxActionWithNavigation<ESagaUserAction, any>) {
  const { data, navigation } = action.payload;
  try {
    navigation.dispatch(StackActions.push(ENavigationScreen.LOADING_MODAL));
    const response: IUploadProfileResDto = yield call(requestUploadProfileImage, data);

    yield setPropertyInDevice(EDataStorageKey.AVATAR_TO_CREATE_PROFILE, response?.photoUrl);
    yield put(reduxUserAction.setUser({ logoUrl: response?.photoUrl }));
    const navigator = navigation.getParent();
    if (navigator) {
      navigator.dispatch(StackActions.pop());
    }
  } catch (error) {
    yield call(handleError, (error as any)?.response?.data as IError, navigation);
    yield put(reduxAppAction.mergeError((error as any)?.response?.data as IError));
    const navigator = navigation.getParent();
    if (navigator) {
      navigator.dispatch(StackActions.pop());
    }
  }
}
export function* watchUploadAvatarProfileAsync() {
  yield takeLatest(ESagaUserAction.UPLOAD_AVATAR_PROFILE, uploadAvatarProfile);
}

function* verifyAccountRecoverOTP(action: IReduxActionWithNavigation<ESagaUserAction, string>) {
  const { data, navigation } = action.payload;
  try {
    navigation.dispatch(StackActions.push(ENavigationScreen.LOADING_MODAL));
    const otp = data;
    const registerData: ICreateAccountDto = yield select(reduxSelector.getAppRegisterData);
    const requestVerifyAccountRecoveryPayload: IVerifyAccountRecoverOTPDto = {
      identifier: registerData?.identifier as string,
      identifierType: registerData?.identifierType as EIdentifierType,
      namespace: registerData?.namespace as ENamespace,
      otp,
    };
    const response: IVerifyAccountRecoverOTPResDto = yield call(
      requestVerifyAccountRecoveryOTP,
      requestVerifyAccountRecoveryPayload,
    );
    const code = response?.recoveryCode;
    yield put(reduxAppAction.setRecoveryCode(code));
    const navigator = navigation.getParent();
    if (navigator) {
      navigator.dispatch(StackActions.pop());
    }
    navigation.dispatch(StackActions.push(EForgotPasswordScreen.INPUT_NEW_PASSWORD_SCREEN));
  } catch (error) {
    yield call(handleError, (error as any)?.response?.data as IError, navigation);
    yield put(reduxAppAction.mergeError((error as any)?.response?.data as IError));
    const navigator = navigation.getParent();
    if (navigator) {
      navigator.dispatch(StackActions.pop());
    }
  }
}

export function* watchVerifyAccountRecoverOTP() {
  yield takeLatest(ESagaUserAction.VERIFY_RECOVER_OTP, verifyAccountRecoverOTP);
}

function* accountRecover(action: IReduxActionWithNavigation<ESagaUserAction, string>) {
  const { data, navigation } = action.payload;
  try {
    navigation.dispatch(StackActions.push(ENavigationScreen.LOADING_MODAL));

    const user: Partial<ICreateAccountDto> = yield select(reduxSelector.getAppRegisterData);
    const code: string = yield select(reduxSelector.getAppRecoveryCode);
    const recoverAccountPayload: IRecoveryAccountDto = {
      code: code,
      password: data,
      namespace: user?.namespace as ENamespace,
      identifier: user?.identifier as string,
      identifierType: user?.identifierType as EIdentifierType,
    };
    yield call(requestAccountRecover, recoverAccountPayload);
    const navigator = navigation.getParent();
    if (navigator) {
      navigator.dispatch(StackActions.pop());
    }

    navigation.dispatch(StackActions.push(ENavigationScreen.LOGIN_SCREEN));
  } catch (error) {
    yield call(handleError, (error as any)?.response?.data as IError, navigation);
    yield put(reduxAppAction.mergeError(error?.response?.data as IError));
    const navigator = navigation.getParent();
    if (navigator) {
      navigator.dispatch(StackActions.pop());
    }
  }
}

export function* watchAccountRecoverAsync() {
  yield takeLatest(ESagaUserAction.ACCOUNT_RECOVER, accountRecover);
}

function* readProfileAndGoToMainApp(action: IReduxActionWithNavigation<ESagaUserAction, any>) {
  const navigation = action?.payload?.navigation;
  const fcmToken = action?.payload?.options?.fcmToken;
  try {
    const profile: IProfileResDto = yield call(requestUserReadProfile);

    yield put(reduxUserAction.setUser(profile as IUser));
    if (fcmToken) {
      yield call(requestUserCreateOrUpdateDevice, { enabled: true, fcmToken: fcmToken }, profile.id);
    }
    resetAndNavigateToScreen(navigation, ENavigationScreen.MAIN_GAME_NAVIGATOR);
  } catch (error) {
    if (
      (error as any)?.response?.data?.errorCode === EErrorCode.PROFILE_NOT_FOUND &&
      (error as any)?.response?.data?.statusCode === EStatusCode.BAD_REQUEST
    ) {
      resetAndNavigateToScreen(navigation, ENavigationScreen.CREATE_PROFILE_NAVIGATOR);
    }
    yield call(handleError, (error as any)?.response?.data as IError, navigation);
  }
}

export function* watchReadProfileAndGoToMainAppAsync() {
  yield takeLatest(ESagaUserAction.GET_PROFILE_AND_GO_TO_MAIN_APP, readProfileAndGoToMainApp);
}

function* getPublicFilterTerryCategories(
  action: IReduxActionWithNavigation<ESagaUserAction, IFilterTerryCategoryInputDto>,
) {
  const { data } = action.payload;
  try {
    const response: ITerryCategoryResDto = yield call(requestPublicFilterTerryCategories, data);

    yield put(reduxAppAction.setPublicCategories(response));
  } catch (error) {
    yield call(handleError, (error as any)?.response?.data as IError, navigation);
  }
}

export function* watchGetPublicFilterTerryCategories() {
  yield takeLatest(ESagaAppAction.GET_PUBLIC_FILTER_CATEGORIES, getPublicFilterTerryCategories);
}

function* getPublicTerries(
  action: IReduxActionWithNavigation<
    ESagaAppAction,
    { filterParams: ITerryFilterParams; filterData: ITerryFilterInputDto }
  >,
) {
  const navigation = action?.payload?.navigation;
  try {
    yield put(reduxAppAction.setLoadingStates({ [ESagaAppAction.GET_PUBLIC_TERRIES]: true }));
    if (last(navigation.getState().routes)?.name === EMainGameScreen.FILTER_SCREEN) {
      navigation.dispatch(CommonActions.goBack());
    }
    if (!isEmpty(action?.payload?.data?.filterData)) {
      yield put(reduxAppAction.setPublicFilterTerries(action?.payload?.data?.filterData as ITerryFilterInputDto));
    }
    const user: IUser = yield select(reduxSelector.getUser);
    const profileId = user?.id;
    const terryFilterData: ITerryFilterInputDto = yield select(reduxSelector.getAppPublicTerryFilter);
    const terryFilterParams: ITerryFilterParams = action.payload?.data?.filterParams as ITerryFilterParams;
    const response: ITerryCategoryResDto = yield call(
      requestPublicGetTerries,
      terryFilterData,
      terryFilterParams,
      profileId,
    );
    yield put(reduxAppAction.setPublicTerries(response));
    yield put(reduxAppAction.setLoadingStates({ [ESagaAppAction.GET_PUBLIC_TERRIES]: false }));
  } catch (error) {
    yield call(handleError, (error as any)?.response?.data as IError, navigation);
    yield put(reduxAppAction.setLoadingStates({ [ESagaAppAction.GET_PUBLIC_TERRIES]: false }));
  }
}

export function* watchGetPublicTerries() {
  yield takeLatest(ESagaAppAction.GET_PUBLIC_TERRIES, getPublicTerries);
}

function* userUpdateProfile(action: IReduxActionWithNavigation<ESagaUserAction, ICreateProfileReqDto>) {
  const navigation = action?.payload?.navigation;
  try {
    navigation.dispatch(StackActions.push(ENavigationScreen.LOADING_MODAL));
    const profileToUpdate = action?.payload?.data;
    const updatedProfile: IProfileResDto = yield call(
      requestUserUpdateProfile,
      profileToUpdate as ICreateProfileReqDto,
    );
    yield put(reduxUserAction.setUser(updatedProfile as IUser));
    navigation.dispatch(StackActions.pop());
    if (action?.payload?.options?.onSuccess) {
      action?.payload?.options?.onSuccess();
    }
  } catch (error) {
    yield call(handleError, (error as any)?.response?.data as IError, navigation);
    navigation.dispatch(StackActions.pop());
  }
}

export function* watchUpdateProfile() {
  yield takeLatest(ESagaUserAction.UPDATE_PROFILE, userUpdateProfile);
}

function* getPublicTerryById(action: IReduxActionWithNavigation<ESagaAppAction, IGetTerryByIdParams>) {
  const navigation = action?.payload?.navigation;
  try {
    if (!action.payload?.data?.isBackgroundAction) {
      navigation.dispatch(StackActions.push(ENavigationScreen.LOADING_MODAL));
    }
    const terryParams = action?.payload?.data;
    const user: IUser = yield select(reduxSelector.getUser);
    const profileId = user?.id;

    // should directly update metadata if it is baackground job
    if (
      (!isNil(terryParams?.markAsFavourited) || !isNil(terryParams?.markAsSaved)) &&
      action.payload?.data?.isBackgroundAction
    ) {
      const terries: ITerryResponseDto[] = yield select(reduxSelector.getAppPublicTerries);
      const updatedTerries = terries.map((terry: ITerryResponseDto) => {
        if (terry?.id === terryParams.terryId) {
          return { ...terry, favourite: terryParams.markAsFavourited, saved: terryParams.markAsSaved };
        }
        return terry;
      });
      yield put(reduxAppAction.setPublicTerries(updatedTerries));
    }

    const terryData: ITerryResponseDto = yield call(
      requestHunterGetTerryById,
      terryParams as IGetTerryByIdParams,
      profileId,
    );
    if (!isEmpty(terryData?.path)) {
      // Convert string path to array
      const path: IRealtimeLocation[] = JSON.parse(terryData?.path as string);
      yield put(reduxAppAction.setCoordinatesPath({ [terryParams?.terryId as string]: path }));
    }
    if (
      (!isNil(terryParams?.markAsFavourited) || !isNil(terryParams?.markAsSaved)) &&
      !action.payload?.data?.isBackgroundAction
    ) {
      const terries: ITerryResponseDto[] = yield select(reduxSelector.getAppPublicTerries);
      const updatedTerries = terries.map((terry: ITerryResponseDto) => {
        if (terry?.id === terryData?.id) {
          return terryData;
        }
        return terry;
      });
      yield put(reduxAppAction.setPublicTerries(updatedTerries));
    }
    yield put(reduxAppAction.setPublicTerry(terryData));
    if (!action.payload?.data?.isBackgroundAction) {
      navigation.dispatch(StackActions.pop());
    }
    if (action?.payload?.options?.onSuccess) {
      action?.payload?.options?.onSuccess();
    }
  } catch (error) {
    yield call(handleError, (error as any)?.response?.data as IError, navigation);
    if (!action.payload?.data?.isBackgroundAction) {
      navigation.dispatch(StackActions.pop());
    }
  }
}

export function* watchGetPublicTerryById() {
  yield takeLatest(ESagaAppAction.GET_PUBLIC_TERRY_BY_ID, getPublicTerryById);
}

function* updateCredentials(action: IReduxActionWithNavigation<ESagaUserAction, IAccountUpdateCredentialsDto>) {
  const navigation = action?.payload?.navigation;
  try {
    navigation.dispatch(StackActions.push(ENavigationScreen.LOADING_MODAL));
    const credentials = action?.payload?.data;
    const response: IAccountResponseDto = yield call(
      requestUpdateCredentials,
      credentials as IAccountUpdateCredentialsDto,
    );
    yield call(setPropertyInDevice, EDataStorageKey.ACCESS_TOKEN, response?.credentials?.token);
    yield call(setPropertyInDevice, EDataStorageKey.REFRESH_TOKEN, response?.credentials?.refreshToken);
    navigation.dispatch(StackActions.pop());
    if (action?.payload?.options?.onSuccess) {
      action?.payload?.options?.onSuccess();
    }
  } catch (error) {
    yield call(handleError, (error as any)?.response?.data as IError, navigation);
    navigation.dispatch(StackActions.pop());
    yield put(reduxAppAction.mergeError((error as any)?.response?.data as IError));
  }
}

export function* watchUpdateCredentials() {
  yield takeLatest(ESagaUserAction.UPDATE_CREDENTIALS, updateCredentials);
}

function* getTerryCheckins(
  action: IReduxActionWithNavigation<
    ESagaAppAction,
    { filterParams: ITerryCheckinsParams; filterData: IFilterTerryCheckins }
  >,
) {
  const navigation = action?.payload?.navigation;
  try {
    yield put(reduxAppAction.setLoadingStates({ [ESagaUserAction.GET_TERRY_CHECKINS]: true }));
    const data = action.payload?.data?.filterData as IFilterTerryCheckins;
    const params = action.payload?.data?.filterParams as ITerryCheckinsParams;
    const user: IUser = yield select(reduxSelector.getUser);
    const profileId = user.id;
    const response: IResponseTerryCheckins[] = yield call(requestHunterFilterTerryCheckins, data, params, profileId);
    yield put(reduxAppAction.setTerryCheckins(response));
    yield put(reduxAppAction.setLoadingStates({ [ESagaUserAction.GET_TERRY_CHECKINS]: false }));
    if (action?.payload?.options?.onSuccess) {
      action?.payload?.options?.onSuccess();
    }
  } catch (error) {
    yield call(handleError, (error as any)?.response?.data as IError, navigation);
    yield put(reduxAppAction.setLoadingStates({ [ESagaUserAction.GET_TERRY_CHECKINS]: false }));
  }
}

export function* watchGetTerryCheckins() {
  yield takeLatest(ESagaUserAction.GET_TERRY_CHECKINS, getTerryCheckins);
}

function* createTerry(action: IReduxActionWithNavigation<ESagaAppAction, ITerryInputDto>) {
  const navigation = action.payload?.navigation;
  try {
    navigation.dispatch(StackActions.push(ENavigationScreen.LOADING_MODAL));
    const data = action.payload?.data as ITerryInputDto;
    const user: IUser = yield select(reduxSelector.getUser);
    const userID = user.id;
    //skip this called because of BE issue. Will be updated later
    const res: ITerryResponseDto = yield call(requestBuilderCreateTerry, data, userID);
    const terries: ITerryResponseDto[] = yield select(reduxSelector.getAppPublicTerries);
    // since this is new terry so by default the rate is 5 and total rating is 0
    yield put(reduxAppAction.setPublicTerries([...terries, { ...res, rating: { rate: 5, total: 0 } }]));
    navigation.dispatch(StackActions.pop(2));
    navigateToPopUpModal(navigation, PopUpModalParams[EPopUpModalType.CREATE_TERRY_SUCCESS]);
  } catch (error) {
    yield call(handleError, (error as any)?.response?.data as IError, navigation);
    navigation.dispatch(StackActions.pop());
  }
}

export function* watchCreateTerry() {
  yield takeLatest(ESagaAppAction.BUILDER_CREATE_TERRY, createTerry);
}

function* hunterCheckinTerry(action: IReduxActionWithNavigation<ESagaAppAction, ITerryCheckinInputDto>) {
  const navigation = action.payload?.navigation;
  try {
    yield put(reduxAppAction.setLoadingStates({ [ESagaAppAction.HUNTER_CHECKIN_TERRY]: true }));
    const data: ITerryCheckinInputDto = yield select(reduxSelector.getAppTerryCheckinInput);
    const user: IUser = yield select(reduxSelector.getUser);
    const profileID = user.id;
    yield call(requestHunterCheckinTerry, data, profileID);

    // update current terries state
    if (data.isFound) {
      const terries: ITerryResponseDto[] = yield select(reduxSelector.getAppPublicTerries);
      const updatedTerries = terries.map(terry => {
        if (terry?.id === data?.terryId) {
          return { ...terry, checkedIn: true };
        }
        return terry;
      });
      yield put(reduxAppAction.setPublicTerries(updatedTerries));
    }
    if (action?.payload?.options?.onSuccess) {
      action?.payload?.options?.onSuccess();
    }
    yield put(reduxAppAction.setLoadingStates({ [ESagaAppAction.HUNTER_CHECKIN_TERRY]: false }));
  } catch (error) {
    if (action.payload?.options?.onError) {
      action.payload?.options?.onError();
    }
    yield call(handleError, (error as any)?.response?.data as IError, navigation);
    yield put(reduxAppAction.setLoadingStates({ [ESagaAppAction.HUNTER_CHECKIN_TERRY]: false }));
  }
}

export function* watchHunterCheckinTerry() {
  yield takeLatest(ESagaAppAction.HUNTER_CHECKIN_TERRY, hunterCheckinTerry);
}

function* hunterUpdateTerrypath(action: IReduxActionWithNavigation<ESagaAppAction, string>) {
  const navigation = action.payload?.navigation;
  try {
    const terryId = action.payload?.data;
    const user: IUser = yield select(reduxSelector.getUser);
    const paths: { [key: string]: IRealtimeLocation[] } = yield select(reduxSelector.getAppCoordinatesPath);
    const path = paths && paths[terryId as string];
    const pathString = JSON.stringify(map(path, item => ({ latitude: item.latitude, longitude: item.longitude })));
    const profileID = user.id;
    if (!isEmpty(path) && !isEmpty(path)) {
      yield call(requestHunterUpsertTerryUserPath, pathString, profileID, terryId);
    }
  } catch (error) {
    yield call(handleError, (error as any)?.response?.data as IError, navigation);
  }
}

export function* watchHunterUpdateTerrypath() {
  yield takeLatest(ESagaAppAction.HUNTER_UPDATE_TERRY_PATH, hunterUpdateTerrypath);
}

function* getPublicProfile(
  action: IReduxActionWithNavigation<ESagaAppAction, { profileID: string; findBy: EPublicReadProfileBy }>,
) {
  const navigation = action.payload?.navigation;
  try {
    navigation && navigation.dispatch(StackActions.push(ENavigationScreen.LOADING_MODAL));
    const profileID = action.payload?.data?.profileID;
    const findBy = action.payload?.data?.findBy;
    const response: IProfileResDto = yield call(requestPublicReadProfile, profileID, findBy);
    yield put(reduxAppAction.setOtherUserProfileToDisplay(response));
    navigation && navigation.dispatch(StackActions.pop());
  } catch (error) {
    navigation && navigation.dispatch(StackActions.pop());
    yield call(handleError, (error as any)?.response?.data as IError, navigation);
  }
}

export function* watchGetPublicProfile() {
  yield takeLatest(ESagaAppAction.GET_PUBLIC_PROFILE, getPublicProfile);
}

function* getOtherProfile(action: IReduxActionWithNavigation<ESagaAppAction, { profileID: string }>) {
  const navigation = action.payload?.navigation;
  try {
    navigation && navigation.dispatch(StackActions.push(ENavigationScreen.LOADING_MODAL));
    const profileID = action.payload?.data?.profileID;
    const response: IProfileResDto = yield call(requestPublicReadOtherProfile, profileID);
    yield put(reduxAppAction.setOtherUserProfileToDisplay(response));
    navigation && navigation.dispatch(StackActions.pop());
  } catch (error) {
    navigation && navigation.dispatch(StackActions.pop());
    yield call(handleError, (error as any)?.response?.data as IError, navigation);
  }
}

export function* watchGetOtherProfile() {
  yield takeLatest(ESagaAppAction.GET_OTHER_PROFILE, getOtherProfile);
}

function* switchRole(action: IReduxActionWithNavigation<ESagaUserAction, { role: EUserRole; reason: string }>) {
  const navigation = action.payload?.navigation;
  try {
    const role = action.payload?.data?.role;
    const reason = action.payload?.data?.reason;
    navigation.dispatch(StackActions.push(ENavigationScreen.LOADING_MODAL));
    const res: { status: EUseRoleRequestStatus } = yield call(requestSwitchRole, role, reason);
    const resProfile: IProfileResDto = yield call(requestUserReadProfile);
    yield put(reduxUserAction.setUser(resProfile));
    navigation.dispatch(StackActions.pop());
    switch (res.status) {
      case EUseRoleRequestStatus.PENDING:
        navigation.dispatch(
          StackActions.push(ENavigationScreen.POPUP_SCREEN, {
            image: NoteImage,
            title: t('Đang gửi xét duyệt'),
            subtitle: t('Admin đang xét duyệt hồ sơ của bạn'),
            confirmButtonTitle: t('Đã hiểu'),
          }),
        );
        break;
      case EUseRoleRequestStatus.ACCEPTED:
        navigation.dispatch(
          StackActions.push(ENavigationScreen.POPUP_SCREEN, {
            image: FoundProfileImage,
            title: t('Xét duyệt thành công'),
            subtitle:
              action.payload?.data?.role === EUserRole.builder
                ? t('Hồ sơ của bạn đã được xét duyệt để trở thành Builder. Đến giao diện mới ngay!')
                : t('Thay đổi vai trò Hunter thành công'),
            confirmButtonTitle: t('Tiếp tục'),
          }),
        );
        break;
      default:
        return;
    }
  } catch (error) {
    navigation.dispatch(StackActions.pop());
    yield call(handleError, (error as any)?.response?.data as IError, navigation);
  }
}
export function* watchSwitchRoleUser() {
  yield takeLatest(ESagaUserAction.SWITCH_ROLE, switchRole);
}

function* getNearbyPlayers(action: IReduxActionWithNavigation<ESagaAppAction, { location?: Location }>) {
  const navigation = action.payload?.navigation;
  try {
    const location = action.payload?.data?.location;
    const response: IPlayerNearbyResDto[] = yield call(requestGetNearbyPlayers, location);
    yield put(reduxAppAction.setNearbyPlayers(response));
  } catch (error) {
    yield call(handleError, (error as any)?.response?.data as IError, navigation);
  }
}

export function* watchGetNearbyPlayers() {
  yield takeLatest(ESagaUserAction.GET_USER_NEARBY_PLAYERS, getNearbyPlayers);
}

function* verifyOfficialTerry(action: IReduxActionWithNavigation<ESagaAppAction, { terryId: string; code: string }>) {
  const navigation = action.payload?.navigation;
  try {
    yield put(reduxAppAction.setLoadingStates({ [ESagaUserAction.VERIFY_OFFICIAL_TERRY]: true }));
    const user: IUser = yield select(reduxSelector.getUser);
    const profileId = user.id;
    const code = action.payload?.data?.code;
    const terryId = action.payload?.data?.terryId;
    yield call(requestHunterVerifyTerry, code!, profileId, terryId!);
    yield put(reduxAppAction.setTerryVerifyCode(terryId!, code!));
    yield put(reduxAppAction.setLoadingStates({ [ESagaUserAction.VERIFY_OFFICIAL_TERRY]: false }));
  } catch (error) {
    yield put(reduxAppAction.setLoadingStates({ [ESagaUserAction.VERIFY_OFFICIAL_TERRY]: false }));
    yield call(handleError, (error as any)?.response?.data as IError, navigation);
  }
}

export function* watchVerifyOfficialTerry() {
  yield takeLatest(ESagaUserAction.VERIFY_OFFICIAL_TERRY, verifyOfficialTerry);
}

function* resetAppStates() {
  yield call(removePropertyInDevice, EDataStorageKey.ACCESS_TOKEN);
  yield call(removePropertyInDevice, EDataStorageKey.REFRESH_TOKEN);
  yield put(reduxAppAction.resetAppStates());
}

export function* watchResetAppStates() {
  yield takeLatest(ESagaUserAction.RESET_APP_STATES, resetAppStates);
}

function* hunterFilterConversationStat(action: IReduxActionWithNavigation<ESagaAppAction, {}>) {
  const navigation = action.payload?.navigation;
  try {
    const user: IUser = yield select(reduxSelector.getUser);
    const profileId = user.id;
    const conversationStat: IFilterConversationStatRes = yield call(requestHunterFilterConversationStat, profileId);
    yield put(reduxAppAction.setConversationStat(conversationStat));
  } catch (error) {
    yield call(handleError, (error as any)?.response?.data as IError, navigation);
  }
}

export function* watchHunterFilterConversationStat() {
  yield takeLatest(ESagaAppAction.HUNTER_FILTER_CONVERSATION_STAT, hunterFilterConversationStat);
}

function* hunterFilterConversation(
  action: IReduxActionWithNavigation<ESagaAppAction, IRequestHunterFilterConversationsQueryParams>,
) {
  const navigation = action.payload?.navigation;
  const data = action.payload?.data;
  try {
    if (!data?.isBackgroundAction) {
      yield put(reduxAppAction.setLoadingStates({ [ESagaAppAction.HUNTER_FILTER_CONVERSATIONS]: true }));
    }
    const user: IUser = yield select(reduxSelector.getUser);
    const profileId = user.id;
    const response: IConversationResDto[] = yield call(requestHunterFilterConversations, profileId, data);
    const conversations: Record<string, IConversationResDto> = reduce(
      response,
      (result, conversation) => {
        return { ...result, [conversation.id]: conversation };
      },
      {},
    );
    yield put(reduxAppAction.setConversations(conversations));
    if (!data?.isBackgroundAction) {
      yield put(reduxAppAction.setLoadingStates({ [ESagaAppAction.HUNTER_FILTER_CONVERSATIONS]: false }));
    }
  } catch (error) {
    if (!data?.isBackgroundAction) {
      yield put(reduxAppAction.setLoadingStates({ [ESagaAppAction.HUNTER_FILTER_CONVERSATIONS]: false }));
    }
    yield call(handleError, (error as any)?.response?.data as IError, navigation);
  }
}

export function* watchHunterFilterConversations() {
  yield takeLatest(ESagaAppAction.HUNTER_FILTER_CONVERSATIONS, hunterFilterConversation);
}

function* hunterReadConversationMessages(
  action: IReduxActionWithNavigation<
    ESagaAppAction,
    {
      conversationId: string;
      requestHunterReadConversationMessagesQueryParams: IRequestHunterReadConversationMessagesQueryParams;
    }
  >,
) {
  const data = action.payload?.data;
  const navigation = action.payload?.navigation;
  try {
    if (!data?.requestHunterReadConversationMessagesQueryParams.isBackgroundAction) {
      yield put(reduxAppAction.setLoadingStates({ [ESagaAppAction.HUNTER_READ_CONVERSATION]: true }));
    }
    const conversationId = data?.conversationId;
    const user: IUser = yield select(reduxSelector.getUser);
    const profileId = user.id;
    const requestHunterReadConversationMessagesQueryParams = data?.requestHunterReadConversationMessagesQueryParams;

    const response: IMessageResDto[] = yield call(
      requestHunterReadConversationMessages,
      conversationId,
      profileId,
      requestHunterReadConversationMessagesQueryParams,
    );
    const messages: Record<string, IMessageResDto> = reduce(
      response,
      (result, message) => {
        return {
          ...result,
          [message.id]: message,
        };
      },
      {},
    );
    yield put(reduxAppAction.setMessages({ [conversationId!]: messages }));
    if (conversationId && data?.requestHunterReadConversationMessagesQueryParams.markAllAsRead) {
      const conversations: Record<string, IConversationResDto> = yield select(reduxSelector.getConversations);
      const conversationStat: Partial<IFilterConversationStatRes> = yield select(reduxSelector.getConversationStat);
      const currentParticipant = conversations[conversationId].participants.find(v => v.profileId === profileId);
      if (currentParticipant?.unreadMsgCnt) {
        yield put(
          reduxAppAction.setConversationStat({
            totalConversationCnt: 0,
            ...conversationStat,
            unreadConversationCnt: conversationStat.unreadConversationCnt
              ? conversationStat.unreadConversationCnt - 1
              : 0,
          }),
        );
      }
      yield put(reduxAppAction.updateConversation({ conversationId, markConversationAsRead: { profileId } }));
    }
    yield put(reduxAppAction.setSelectedConversationId(conversationId));
    if (!data?.requestHunterReadConversationMessagesQueryParams.isBackgroundAction) {
      yield put(reduxAppAction.setLoadingStates({ [ESagaAppAction.HUNTER_READ_CONVERSATION]: false }));
    }
  } catch (error) {
    if (!data?.requestHunterReadConversationMessagesQueryParams.isBackgroundAction) {
      yield put(reduxAppAction.setLoadingStates({ [ESagaAppAction.HUNTER_READ_CONVERSATION]: false }));
    }
    yield call(handleError, (error as any)?.response?.data as IError, navigation);
  }
}
export function* watchHunterReadConversationMessages() {
  yield takeLatest(ESagaAppAction.HUNTER_READ_CONVERSATION, hunterReadConversationMessages);
}

function* hunterSendMessage(action: IReduxActionWithNavigation<ESagaAppAction, ISendMessageInputDto>) {
  const navigation = action.payload?.navigation;
  try {
    const data = action.payload?.data;
    if (isEmpty(data)) {
      return;
    }
    const user: IUser = yield select(reduxSelector.getUser);
    const profileId = user.id;
    // We need to update the conversation `s messages redux state before sending message to BE
    // to make sure the message is displayed immediately.
    const randomMessageId = generateLocalMessageId();
    if (data.conversationId) {
      yield put(
        reduxAppAction.mergeMessages({
          [data.conversationId]: {
            [randomMessageId]: {
              conversationId: data.conversationId,
              createdAt: data.createdAt,
              id: randomMessageId,
              payload: {
                type: data.payload.type,
                text: data.payload.text,
              },
              senderId: profileId,
              recipientId: data.recipientId,
              sentAt: data.createdAt,
              updatedAt: data.createdAt,
            },
          },
        }),
      );
    }
    const responseMessage: IMessageResDto = yield call(requestHunterSendMessage, profileId, data);
    const conversations: Record<string, IConversationResDto> = yield select(reduxSelector.getConversations);
    // If the conversation is not existed in the state.
    if (!!responseMessage?.conversationId && !conversations?.[responseMessage?.conversationId!]) {
      // Refetch the conversations.
      yield put(
        sagaUserAction.hunterFilterConversationsAsync(
          { includeProfileData: true, isBackgroundAction: true },
          navigation,
        ),
      );
      // Update the params of the conversation (ChatView) screen.
      navigation.setParams({
        conversationId: responseMessage?.conversationId,
        recipientId: null,
      });
    } else {
      // update conversation snippet
      yield put(
        reduxAppAction.updateConversation({
          conversationId: data.conversationId,
          updateConversationSnippet: {
            snippet: responseMessage?.payload?.text!,
            sentByProfileId: profileId,
            sentAt: responseMessage?.sentAt,
          },
        }),
      );
    }
  } catch (error) {
    yield call(handleError, (error as any)?.response?.data as IError, navigation);
  }
}

export function* watchHunterSendMessage() {
  yield takeLatest(ESagaAppAction.HUNTER_SEND_MESSAGE, hunterSendMessage);
}

export default function* userSaga() {
  yield all([
    watchCreateAccountAsync(),
    watchLoginAccountAsync(),
    watchGetOTPAsync(),
    watchCreateProfileAsync(),
    watchHandleSubmitDisplayNameAsync(),
    watchUploadAvatarProfileAsync(),
    watchVerifyAccountRecoverOTP(),
    watchAccountRecoverAsync(),
    watchReadProfileAndGoToMainAppAsync(),
    watchGetPublicFilterTerryCategories(),
    watchGetPublicTerries(),
    watchUpdateProfile(),
    watchGetPublicTerryById(),
    watchUpdateCredentials(),
    watchGetTerryCheckins(),
    watchCreateTerry(),
    watchHunterCheckinTerry(),
    watchHunterUpdateTerrypath(),
    watchGetPublicProfile(),
    watchSwitchRoleUser(),
    watchGetNearbyPlayers(),
    watchHunterFilterConversations(),
    watchHunterReadConversationMessages(),
    watchHunterSendMessage(),
    watchGetOtherProfile(),
    watchHunterFilterConversationStat(),
    watchVerifyOfficialTerry(),
  ]);
}
