import { ApiError } from '../request/api';
import { EAsyncTaskType } from './enums';

export interface TaskStatus<E = ApiError> {
  processing: boolean;
  error?: E;
}

export interface AsyncTaskStatus {
  [key: string]: TaskStatus<ApiError> | undefined;
}

export interface AsyncTaskReducerState {
  status: AsyncTaskStatus;
}

export interface AsyncTaskStartAction {
  type: typeof EAsyncTaskType.ASYNC_TASK_START;
  payload: string;
}

export interface AsyncTaskStopAction {
  type: typeof EAsyncTaskType.ASYNC_TASK_STOP;
  payload: { key: string; error?: ApiError };
}

export interface AsyncTaskResetAction {
  type: typeof EAsyncTaskType.ASYNC_TASK_RESET;
  payload: string;
}

export type AsyncTaskActionTypes = AsyncTaskStartAction | AsyncTaskStopAction | AsyncTaskResetAction;
