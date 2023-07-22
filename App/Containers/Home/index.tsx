import React, { useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Region } from 'react-native-maps';
import TerryMap from 'App/Components/Map/TerryMap';
import { LOCATION_DELTA } from 'App/constants/common';
import { getLocation } from 'App/helpers/map';
import { TERRY_MARKER_LIST } from 'App/Mock/map';

const HomeScreen = () => {
  const [initialRegion, setInitialRegion] = useState<Region>({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0,
    longitudeDelta: 0,
  });
  const [loadingLocation, setLoadingLocation] = useState(false);
  useEffect(() => {
    (async () => {
      try {
        const location = await getLocation();
        const region = { ...location, ...LOCATION_DELTA };
        setInitialRegion(region);
        setLoadingLocation(true);
      } catch (error) {}
    })();
  }, []);

  return (
    <SafeAreaProvider>
      {loadingLocation && (
        <TerryMap
          initialRegion={initialRegion}
          markers={TERRY_MARKER_LIST}
          showsMyLocationButton={true}
          showsCompass={true}
          customCallout={true}
          showsUserLocation={false}
          showCustomedUserLocation={true}
          focusOnUserLocation={false}
        />
      )}
    </SafeAreaProvider>
  );
};

export default HomeScreen;
