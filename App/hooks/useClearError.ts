import { reduxAppAction } from 'App/redux/actions/appAction';
import { reduxSelector } from 'App/redux/selectors';
import { isEmpty } from 'lodash';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const useClearError = () => {
  const dispatch = useDispatch();
  const error = useSelector(reduxSelector.getAppError);
  const clearError = useCallback(() => {
    if (!isEmpty(error)) {
      dispatch(reduxAppAction.clearError());
    }
  }, [dispatch, error]);
  return clearError;
};

export default useClearError;
