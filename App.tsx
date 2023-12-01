import { NavigationContainer } from '@react-navigation/native';
import store from 'App/redux';
import setupI18N from 'App/utils/i18n';
import React, { Suspense } from 'react';
import { startNetworkLogging } from 'react-native-network-logger';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import Navigation, { navigationRef } from './App/navigation';
import { linking } from 'App/navigation/linkingConfig';

setupI18N();
startNetworkLogging();

const App = () => {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <NavigationContainer linking={linking} ref={navigationRef}>
          <Suspense fallback={<></>}>
            <Navigation />
          </Suspense>
        </NavigationContainer>
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;
