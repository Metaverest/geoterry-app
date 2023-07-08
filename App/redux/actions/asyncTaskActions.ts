import { AsyncTaskResetAction, AsyncTaskStartAction, AsyncTaskStopAction } from 'App/Types/redux/asyncTaskState';
import { EAsyncTaskType } from 'App/Types/redux/enums';
import { ApiError } from 'App/Types/request/api';

export const asyncTaskStartAction = (key: string): AsyncTaskStartAction => ({
  type: EAsyncTaskType.ASYNC_TASK_START,
  payload: key,
});

export const asyncTaskStopAction = (key: string, error?: ApiError): AsyncTaskStopAction => ({
  type: EAsyncTaskType.ASYNC_TASK_STOP,
  payload: { key, error },
});

export const ayncTaskResetAction = (key: string): AsyncTaskResetAction => ({
  type: EAsyncTaskType.ASYNC_TASK_RESET,
  payload: key,
});
