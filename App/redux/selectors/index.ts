import { RootStateType as IStore } from 'App/Types/redux/store';

// AppReducer
export const TaskStatus = (key: string) => (store: IStore) => store.asyncTaskReducer.status[key];
