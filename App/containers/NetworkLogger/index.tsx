import CustomSafeArea from 'App/components/CustomSafeArea';
import React, { useEffect } from 'react';
import NetworkLogger, { startNetworkLogging } from 'react-native-network-logger';
import { styles } from './styles';

const NetworkLoggerScreen = () => {
  useEffect(() => {
    startNetworkLogging({ ignoredUrls: ['http://10.0.2.2:8081'] });
  }, []);
  return (
    <CustomSafeArea style={styles.container} isModal>
      <NetworkLogger theme="dark" />
    </CustomSafeArea>
  );
};
export default NetworkLoggerScreen;
