import { reduxSelector } from 'App/redux/selectors';
import { isArray, isString, last } from 'lodash';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

const useGetErrorText = () => {
  const error = useSelector(reduxSelector.getAppError);
  const errorText = useMemo(() => {
    const lastError = last(error);
    if (isString(lastError?.message)) {
      return lastError?.message;
    } else if (isArray(lastError?.message)) {
      return last(lastError?.message);
    }
  }, [error]);
  return errorText;
};
export default useGetErrorText;
