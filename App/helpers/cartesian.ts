import { Location } from 'App/types/terry';

export const EARTH_RADIUS = 6371;

export function convertGeoToAR(currentLocation: Location, targetLocation: Location) {
  const R = EARTH_RADIUS * 1000;
  const dLat = ((targetLocation.latitude - currentLocation.latitude) * Math.PI) / 180;
  const dLon = ((targetLocation.longitude - currentLocation.longitude) * Math.PI) / 180;

  const x = dLon * R * Math.cos((currentLocation.latitude * Math.PI) / 180);
  const y = dLat * R;

  return { x, y };
}
