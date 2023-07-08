import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-community/async-storage';

const DataStorage = new Storage({
  size: 1000,
  storageBackend: AsyncStorage,
  defaultExpires: null,
  enableCache: true,
  sync: {},
});

export const getStoredProperty = async <T>(key: string) => {
  let value: T | undefined;
  try {
    value = await DataStorage.load({ key });
  } catch {}
  return value;
};

export const setPropertyInDevice = async (key: string, value: any) => {
  try {
    await DataStorage.save({ key, data: value });
  } catch (e) {}
};

export const removePropertyInDevice = async (key: string) => {
  try {
    await DataStorage.remove({ key });
  } catch (e) {}
};

export default DataStorage;
