import { useMemo } from 'react';
import { Platform } from 'react-native';

const usePlatform = () => {
  const isAndroid = useMemo(() => {
    return Platform.OS === 'android';
  }, []);
  const isIOS = useMemo(() => {
    return Platform.OS === 'ios';
  }, []);
  return { isAndroid, isIOS };
};
export default usePlatform;
