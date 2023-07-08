import { NavigationContainer } from '@react-navigation/native';
import Navigation, { navigationRef } from './App/navigation';
import React, { Suspense } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import configureStore from 'App/redux';
import setupI18N from 'App/utils/i18n';

setupI18N();

const App = () => {
  const store = configureStore();

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
