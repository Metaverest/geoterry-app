import { ESagaUserAction } from 'App/enums/redux';
import { reduxAppAction } from 'App/redux/actions/appAction';
import { IError } from 'App/types/error';
import { IAccountLoginDto, ICreateAccountDto, IReduxAction } from 'App/types/redux';
import { requestCreateAccount, requestLogin } from 'App/utils/axios';
import { all, call, put, takeLatest } from 'redux-saga/effects';
function* createAccount(action: IReduxAction<ESagaUserAction, ICreateAccountDto>) {
  const { payload } = action;
  try {
    yield put(reduxAppAction.setIsLoading(true));
    const response = yield call(requestCreateAccount, payload as ICreateAccountDto);
    console.log('Create account successfull');
    console.log(response);
  } catch (error) {
    console.log(error.data);
    yield put(reduxAppAction.mergeError(error?.data as IError));
  } finally {
    yield put(reduxAppAction.setIsLoading(false));
  }
}

export function* watchCreateAccountAsync() {
  yield takeLatest(ESagaUserAction.CREATE_ACCOUNT, createAccount);
}

function* login(action: IReduxAction<ESagaUserAction, IAccountLoginDto>) {
  const { payload } = action;
  try {
    yield put(reduxAppAction.setIsLoading(true));
    const response = yield call(requestLogin, payload as IAccountLoginDto);
    console.log('Login successfull');
    console.log(response);
  } catch (error) {
    console.log(error?.data);
    yield put(reduxAppAction.mergeError(error?.data as IError));
  } finally {
    yield put(reduxAppAction.setIsLoading(false));
  }
}

export function* watchLoginAccountAsync() {
  yield takeLatest(ESagaUserAction.LOGIN_ACCOUNT, login);
}

export default function* userSaga() {
  yield all([watchCreateAccountAsync(), watchLoginAccountAsync()]);
}
