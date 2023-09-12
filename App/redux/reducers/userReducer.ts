import { EReduxUserAction } from 'App/enums/redux';
import { IReduxAction } from 'App/types/redux';
import { IUser } from 'App/types/user';

const defaultUserState: IUser = {
  displayName: '',
};
const userReducer = (state = defaultUserState, action: IReduxAction<EReduxUserAction, IUser>) => {
  switch (action.type) {
    case EReduxUserAction.SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};
export { userReducer };
