import { NavigationContainer } from '@react-navigation/native';
import store from 'App/redux';
import setupI18N from 'App/utils/i18n';
import React, { Suspense } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import Navigation, { navigationRef } from './App/navigation';

setupI18N();

const App = () => {
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
