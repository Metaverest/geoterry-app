import { EActionType } from 'App/Types/redux/enums';
import { AnyAction, applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { RootStateType } from 'App/Types/redux/store';
import { asyncTaskReducer, initialAsyncTaskState } from './reducers/asyncTaskReducer';

export const initialRootState: RootStateType = {
  asyncTaskReducer: initialAsyncTaskState,
};

export default function configureStore(preloadedState: RootStateType = initialRootState) {
  const middlewares = [thunk];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const enhancers = [middlewareEnhancer];

  // TODO: configure to turn off redux dev tools in production env
  const composedEnhancers = composeWithDevTools(...enhancers);

  const appReducer = combineReducers<RootStateType>({
    asyncTaskReducer,
  });

  // Reset state after logout
  const rootReducer = (state: RootStateType, action: AnyAction) => {
    return action.type === EActionType.LOGOUT ? initialRootState : appReducer(state, action);
  };

  // @ts-ignore
  return createStore(rootReducer, preloadedState, composedEnhancers);
}
