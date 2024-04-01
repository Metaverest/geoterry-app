import { EDataStorageKey, EIdentifierType } from 'App/enums';
import { getStoredProperty } from 'App/utils/storage/storage';
import { useEffect, useState } from 'react';

const useLoginMethod = () => {
  const [loginMethod, setLoginMethod] = useState<EIdentifierType>();
  useEffect(() => {
    (async () => {
      const identifierType = await getStoredProperty(EDataStorageKey.IDENTIFIER_TYPE);
      if (identifierType) {
        setLoginMethod(identifierType as EIdentifierType);
      }
    })();
  }, []);
  return loginMethod;
};

export default useLoginMethod;
