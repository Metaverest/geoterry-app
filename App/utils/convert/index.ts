import { IRealtimeLocation } from 'App/types';

export const calculateDistance = (point1: IRealtimeLocation, point2: IRealtimeLocation) => {
  const earthRadius = 6371; // Radius of the Earth in kilometers

  // Convert latitude and longitude from degrees to radians
  const radLat1 = (point1.latitude * Math.PI) / 180;
  const radLon1 = (point1.longitude * Math.PI) / 180;
  const radLat2 = (point2.latitude * Math.PI) / 180;
  const radLon2 = (point2.longitude * Math.PI) / 180;

  // Haversine formula
  const dLat = radLat2 - radLat1;
  const dLon = radLon2 - radLon1;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(radLat1) * Math.cos(radLat2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = earthRadius * c * 1000; // Distance in Meters

  return distance;
};

export const meterToKilometer = (meter: number) => {
  const kilometer = meter / 1000;
  return kilometer.toFixed(2);
};
