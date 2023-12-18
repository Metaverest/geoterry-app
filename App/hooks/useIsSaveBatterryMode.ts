import { useFocusEffect } from '@react-navigation/native';
import { EDataStorageKey } from 'App/enums';
import { getStoredProperty } from 'App/utils/storage/storage';
import { useState } from 'react';

const useIsSaveBatterryMode = () => {
  const [isSaveBatterryMode, setIsSaveBatterryMode] = useState<boolean | undefined>();
  useFocusEffect(() => {
    (async () => {
      const isSaveBatterry = await getStoredProperty(EDataStorageKey.IS_SAVE_BATTERY_MODE);
      setIsSaveBatterryMode(!!isSaveBatterry as boolean);
    })();
  });
  return isSaveBatterryMode;
};
export default useIsSaveBatterryMode;
