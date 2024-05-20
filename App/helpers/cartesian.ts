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
