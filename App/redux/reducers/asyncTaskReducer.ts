import { AsyncTaskActionTypes, AsyncTaskReducerState } from 'App/Types/redux/asyncTaskState';
import { EAsyncTaskType } from 'App/Types/redux/enums';

export const initialAsyncTaskState: AsyncTaskReducerState = {
  status: {},
};

export const asyncTaskReducer = (state = initialAsyncTaskState, action: AsyncTaskActionTypes) => {
  switch (action.type) {
    case EAsyncTaskType.ASYNC_TASK_START: {
      return {
        ...state,
        status: {
          ...state.status,
          [action.payload]: {
            processing: true,
          },
        },
      };
    }
    case EAsyncTaskType.ASYNC_TASK_STOP: {
      return {
        ...state,
        status: {
          ...state.status,
          [action.payload.key]: {
            processing: false,
            error: action.payload.error,
          },
        },
      };
    }
    case EAsyncTaskType.ASYNC_TASK_RESET: {
      return {
        ...state,
        status: {
          ...state.status,
          [action.payload]: {
            processing: false,
          },
        },
      };
    }
    default:
      return state;
  }
};
