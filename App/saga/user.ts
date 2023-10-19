import { CommonActions } from '@react-navigation/native';
import { StackActions } from '@react-navigation/routers';
import { EDataStorageKey, EIdentifierType, ENamespace } from 'App/enums';
import { ECreateProfileScreen, EForgotPasswordScreen, EMainGameScreen, ENavigationScreen } from 'App/enums/navigation';
import { ESagaAppAction, ESagaUserAction } from 'App/enums/redux';
import { reduxAppAction } from 'App/redux/actions/appAction';
import { reduxUserAction, sagaUserAction } from 'App/redux/actions/userAction';
import { reduxSelector } from 'App/redux/selectors';
import { IFilterTerryCategoryInputDto, ITerryCategoryResDto } from 'App/types/category';
import { IError } from 'App/types/error';
import { IReduxActionWithNavigation } from 'App/types/redux';
import { IGetTerryByIdParams, ITerryFilterInputDto, ITerryFilterParams, ITerryResponseDto } from 'App/types/terry';

import {
  IAccountLoginDto,
  IAccountResponseDto,
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
  requestCreateAccount,
  requestCreateProfile,
  requestGetOTP,
  requestHunterGetTerryById,
  requestLogin,
  requestPublicFilterTerryCategories,
  requestPublicGetTerries,
  requestUploadProfileImage,
  requestUserReadProfile,
  requestUserUpdateProfile,
  requestVerifyAccountRecoveryOTP,
  setAuthorizationRequestHeader,
} from 'App/utils/axios';
import { getStoredProperty, setPropertyInDevice } from 'App/utils/storage/storage';
import { isEmpty, last } from 'lodash';
import { all, call, put, select, takeLatest } from 'redux-saga/effects';
function* createAccount(action: IReduxActionWithNavigation<ESagaUserAction, ICreateAccountDto>) {
  const { data, navigation } = action.payload;
  try {
    navigation.dispatch(StackActions.push(ENavigationScreen.LOADING_MODAL));
    yield call(requestCreateAccount, data as ICreateAccountDto);
    navigation.dispatch(CommonActions.navigate(ENavigationScreen.CREATE_PROFILE_NAVIGATOR));
  } catch (error) {
    console.log(error?.response?.data);
    yield put(reduxAppAction.mergeError(error?.response?.data as IError));
  } finally {
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
    yield call(setAuthorizationRequestHeader, AXIOS);
    navigation.dispatch(StackActions.pop());
    yield put(sagaUserAction.getProfileAndGoToMainAppAsync(navigation));
  } catch (error) {
    console.log(error?.response?.data);
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
    const navigator = navigation.getParent();
    if (navigator) {
      navigator.dispatch(StackActions.pop());
    }
    navigation.dispatch(
      CommonActions.navigate({
        name: ENavigationScreen.OTP_SCREEN,
        params: { isRecoverPassword: options?.isRecoverPassword },
      }),
    );
  } catch (error) {
    console.log(error?.response?.data);
    yield put(reduxAppAction.mergeError(error?.response?.data as IError));
    const navigator = navigation.getParent();
    if (navigator) {
      navigator.dispatch(StackActions.pop());
    }
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
    console.log(error?.response?.data);
    const navigator = navigation.getParent();
    if (navigator) {
      navigator.dispatch(StackActions.pop());
    }
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
    console.log(error?.response?.data);
    yield put(reduxAppAction.mergeError(error?.response?.data as IError));
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
    console.log(error?.response?.data);
    yield put(reduxAppAction.mergeError(error?.response?.data as IError));
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
    console.log(error?.response?.data);
    yield put(reduxAppAction.mergeError(error?.response?.data as IError));
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
    console.log(error?.response?.data);
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
  try {
    const navigation = action?.payload?.navigation;
    const profile: IProfileResDto = yield call(requestUserReadProfile);
    yield put(reduxUserAction.setUser(profile as IUser));
    navigation.dispatch(StackActions.push(ENavigationScreen.MAIN_GAME_NAVIGATOR));
  } catch (error) {
    console.log(error?.response?.data);
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
    console.log(error?.response?.data);
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
  try {
    const navigation = action?.payload?.navigation;
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

    if (last(navigation.getState().routes)?.name === EMainGameScreen.FILTER_SCREEN) {
      navigation.dispatch(CommonActions.goBack());
    }
  } catch (error) {
    console.log(error?.response?.data);
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
    console.log(error?.response?.data);
    navigation.dispatch(StackActions.pop());
  }
}

export function* watchUpdateProfile() {
  yield takeLatest(ESagaUserAction.UPDATE_PROFILE, userUpdateProfile);
}

function* getPublicTerryById(action: IReduxActionWithNavigation<ESagaAppAction, IGetTerryByIdParams>) {
  const navigation = action?.payload?.navigation;
  try {
    navigation.dispatch(StackActions.push(ENavigationScreen.LOADING_MODAL));
    const terryParams = action?.payload?.data;
    const user: IUser = yield select(reduxSelector.getUser);
    const profileId = user?.id;
    const terryData: ITerryResponseDto = yield call(
      requestHunterGetTerryById,
      terryParams as IGetTerryByIdParams,
      profileId,
    );
    yield put(reduxAppAction.setPublicTerry(terryData));
    navigation.dispatch(StackActions.pop());
    if (action?.payload?.options?.onSuccess) {
      action?.payload?.options?.onSuccess();
    }
  } catch (error) {
    console.log(error?.response?.data);
    navigation.dispatch(StackActions.pop());
  }
}

export function* watchGetPublicTerryById() {
  yield takeLatest(ESagaAppAction.GET_PUBLIC_TERRY_BY_ID, getPublicTerryById);
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
  ]);
}
