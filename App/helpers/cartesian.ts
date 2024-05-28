import { Location } from 'App/types/terry';

const EARTH_RADIUS = 6371;

function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

export interface CartesianCoordinates {
  x: number;
  y: number;
  z: number;
}

export function latLngToCartesian(lat: number, lon: number, radius: number = EARTH_RADIUS): CartesianCoordinates {
  // Convert latitude and longitude from degrees to radians
  const latRad = toRadians(lat);
  const lonRad = toRadians(lon);

  // Calculate Cartesian coordinates
  const x = radius * Math.cos(latRad) * Math.cos(lonRad);
  const y = radius * Math.cos(latRad) * Math.sin(lonRad);
  const z = radius * Math.sin(latRad);

  return { x, y, z };
}

export function convertGeoToAR(currentLocation: Location, targetLocation: Location) {
  const R = EARTH_RADIUS * 1000;
  const dLat = ((targetLocation.latitude - currentLocation.latitude) * Math.PI) / 180;
  const dLon = ((targetLocation.longitude - currentLocation.longitude) * Math.PI) / 180;

  const x = dLon * R * Math.cos((currentLocation.latitude * Math.PI) / 180);
  const y = dLat * R;

  return { x, y };
}
