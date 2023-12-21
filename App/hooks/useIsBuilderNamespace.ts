import { EDataStorageKey, ENamespace, EUserRole } from 'App/enums';
import { reduxSelector } from 'App/redux/selectors';
import { getStoredProperty } from 'App/utils/storage/storage';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const useIsBuilderNamespace = () => {
  const [isBuilderNamespace, setIsBuilderNamespace] = useState(false);
  const user = useSelector(reduxSelector.getUser);
  useEffect(() => {
    (async () => {
      const sessionNamespace = await getStoredProperty(EDataStorageKey.NAMESPACE);
      if (
        (sessionNamespace === ENamespace.GEOTERRY_BUILDERS && !isBuilderNamespace) ||
        user.role === EUserRole.builder
      ) {
        setIsBuilderNamespace(true);
      } else {
        setIsBuilderNamespace(false);
      }
    })();
  }, [isBuilderNamespace, user.role]);
  return isBuilderNamespace;
};

export default useIsBuilderNamespace;
