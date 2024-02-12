import { reduxSelector } from 'App/redux/selectors';
import { RTDB } from 'App/utils/rtdb';
import { memo, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FirebaseDatabaseTypes } from '@react-native-firebase/database';
import { reduxAppAction } from 'App/redux/actions/appAction';

const NearbyPlayerLocationListener = () => {
  const [profileIds, setProfileIds] = useState<string[]>([]);

  const nearbyPlayers = useSelector(reduxSelector.getNearbyPlayers);
  const dispatch = useDispatch();

  useEffect(() => {
    setProfileIds(nearbyPlayers?.map(nearbyPlayer => nearbyPlayer.profileId) || []);
  }, [nearbyPlayers]);

  const onDataChange = useCallback(
    (snapshot: FirebaseDatabaseTypes.DataSnapshot) => {
      const data = snapshot.val();
      const profileId = snapshot.key;
      if (data && profileId) {
        const newLocation = data.location;
        dispatch(reduxAppAction.setNearbyPlayerLocation({ [profileId]: newLocation }));
      }
    },
    [dispatch],
  );

  useEffect(() => {
    const locationRef = RTDB.ref('/location');

    // Start listening for each profileId
    profileIds.forEach((profileId: string) => {
      locationRef.child(profileId).on('value', onDataChange);
    });

    return () => {
      profileIds.forEach((profileId: string) => {
        locationRef.child(profileId).off('value', onDataChange);
      });
    };
  }, [onDataChange, profileIds]);

  return null;
};
export default memo(NearbyPlayerLocationListener);
