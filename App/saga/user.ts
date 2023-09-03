import { StackActions } from '@react-navigation/routers';
import { EIdentifierType, ENamespace } from 'App/enums';
import { ENavigationScreen } from 'App/enums/navigation';
import { ESagaUserAction } from 'App/enums/redux';
import { reduxAppAction } from 'App/redux/actions/appAction';
import { IError } from 'App/types/error';
import { IAccountLoginDto, ICreateAccountDto, IReduxActionWithNavigation } from 'App/types/redux';
import { requestCreateAccount, requestGetOTP, requestLogin } from 'App/utils/axios';
import { all, call, put, takeLatest } from 'redux-saga/effects';
function* createAccount(action: IReduxActionWithNavigation<ESagaUserAction, ICreateAccountDto>) {
  const { data, navigation } = action.payload;
  try {
    console.log(data);
    navigation.dispatch(StackActions.push(ENavigationScreen.LOADING_MODAL));
    yield put(reduxAppAction.setIsLoading(true));
    const response = yield call(requestCreateAccount, data as ICreateAccountDto);
    console.log('Create account successfull');
    console.log(response);
  } catch (error) {
    console.log(error.data);
    yield put(reduxAppAction.mergeError(error?.data as IError));
  } finally {
    navigation.dispatch(StackActions.pop());
    yield put(reduxAppAction.setIsLoading(false));
  }
}

export function* watchCreateAccountAsync() {
  yield takeLatest(ESagaUserAction.CREATE_ACCOUNT, createAccount);
}

function* login(action: IReduxActionWithNavigation<ESagaUserAction, IAccountLoginDto>) {
  const { data, navigation } = action.payload;
  try {
    navigation.dispatch(StackActions.push(ENavigationScreen.LOADING_MODAL));
    yield put(reduxAppAction.setIsLoading(true));
    const response = yield call(requestLogin, data as IAccountLoginDto);
    console.log('Login successfull');
    console.log(response);
  } catch (error) {
    console.log(error?.data);
    yield put(reduxAppAction.mergeError(error?.data as IError));
  } finally {
    yield put(reduxAppAction.setIsLoading(false));
    navigation.dispatch(StackActions.pop());
  }
}

export function* watchLoginAccountAsync() {
  yield takeLatest(ESagaUserAction.LOGIN_ACCOUNT, login);
}

function* getOTP(action: IReduxActionWithNavigation<ESagaUserAction, ICreateAccountDto>) {
  const { data, navigation } = action.payload;
  try {
    navigation.dispatch(StackActions.push(ENavigationScreen.LOADING_MODAL));
    yield put(reduxAppAction.setIsLoading(true));
    yield put(reduxAppAction.setRegisterData(data as ICreateAccountDto));
    yield call(requestGetOTP, {
      identifier: data?.identifier as string,
      identifierType: data?.identifierType as EIdentifierType,
      isRecoverPassword: false as boolean,
      namespace: data?.namespace as ENamespace,
    });
    navigation.dispatch(StackActions.pop());
    navigation.dispatch(StackActions.push(ENavigationScreen.OTP_SCREEN));
  } catch (error) {
    console.log(error?.data);
    yield put(reduxAppAction.mergeError(error?.data as IError));
    navigation.dispatch(StackActions.pop());
    yield put(reduxAppAction.setIsLoading(false));
  }
}

export function* watchGetOTPAsync() {
  yield takeLatest(ESagaUserAction.GET_OTP, getOTP);
}
export default function* userSaga() {
  yield all([watchCreateAccountAsync(), watchLoginAccountAsync(), watchGetOTPAsync()]);
}
