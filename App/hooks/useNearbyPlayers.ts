import { RTDB } from 'App/utils/rtdb';
import { isEqual } from 'lodash';
import { useEffect, useState } from 'react';
import { LatLng } from 'react-native-maps';

const useNearbyPlayers = (profileIds: string[]) => {
  const [playerLocations, setPlayerLocations] = useState<{ [profileId: string]: LatLng }>({});

  useEffect(() => {
    console.log('useNearbyPlayers');
    const locationRef = RTDB.ref('/location');

    const onDataChange = snapshot => {
      const data = snapshot.val();
      const profileId = snapshot.key;

      if (data && profileIds.includes(profileId)) {
        // Check if the new location data is different from the existing data
        const newLocation = data.location;
        const existingLocation = playerLocations[profileId];

        if (newLocation && (!existingLocation || !isEqual(newLocation, existingLocation))) {
          // Update the state with the latest player location
          setPlayerLocations(prevLocations => ({
            ...prevLocations,
            [profileId]: newLocation,
          }));
        }
      }
    };

    // Start listening for 'value' events for each profileId
    profileIds.forEach((profileId: string) => {
      locationRef.child(profileId).on('value', onDataChange);
    });

    return () => {
      profileIds.forEach((profileId: string) => {
        locationRef.child(profileId).off('value', onDataChange);
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileIds]);

  return playerLocations;
};
export default useNearbyPlayers;
