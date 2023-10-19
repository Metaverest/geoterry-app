import { NavigationContainer } from '@react-navigation/native';
import store from 'App/redux';
import setupI18N from 'App/utils/i18n';
import React, { Suspense } from 'react';
import { startNetworkLogging } from 'react-native-network-logger';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import Navigation, { navigationRef } from './App/navigation';
// import { removePropertyInDevice } from 'App/utils/storage/storage';
// import { EDataStorageKey } from 'App/enums';

setupI18N();
startNetworkLogging();

const App = () => {
  // removePropertyInDevice(EDataStorageKey.ACCESS_TOKEN);
  // removePropertyInDevice(EDataStorageKey.REFRESH_TOKEN);

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <NavigationContainer ref={navigationRef}>
          <Suspense fallback={<></>}>
            <Navigation />
          </Suspense>
        </NavigationContainer>
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;
