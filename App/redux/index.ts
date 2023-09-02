import { combineReducers, configureStore } from '@reduxjs/toolkit';
import rootSaga from 'App/saga';
import createSagaMiddleware from 'redux-saga';
import { appReducer } from './reducers/appReducer';
import { userReducer } from './reducers/userReducer';

const rootReducer = combineReducers({
  user: userReducer,
  app: appReducer,
});
const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];
const store = configureStore({
  reducer: rootReducer,
  middleware,
});
sagaMiddleware.run(rootSaga);
// then run the saga

export default store;
