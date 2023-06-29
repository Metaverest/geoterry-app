import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import TerryMap from './App/Components/Map/TerryMap';
import {MOCK_LOCATION, TERRY_MARKER_LIST} from './App/Mock/map';

function App(): JSX.Element {
  return (
    <SafeAreaProvider>
      <TerryMap
        initialRegion={MOCK_LOCATION}
        markers={TERRY_MARKER_LIST}
        showsUserLocation={true}
        onRegionChange={(region, details) => console.log(region, details)}
        showsMyLocationButton={true}
        showsCompass={true}
        customCallout={true}
      />
    </SafeAreaProvider>
  );
}

export default App;
