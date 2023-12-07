import { IRealtimeLocation } from 'App/types';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/vi';
import { ELanguageCode } from 'App/enums';

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

export const convertDateFormat = (inputDate: string) => {
  const date = dayjs(inputDate);
  const formattedDate = date.format('HH[h]mm DD/MM/YYYY');
  return formattedDate;
};
export const convertDateFormatHistory = (inputDate: string) => {
  const date = dayjs(inputDate);
  const formattedDate = date.format('HH:mm - DD/MM/YYYY');
  return formattedDate;
};
export const convertDateFormatOnlyDate = (inputDate: string) => {
  const date = dayjs(inputDate);
  const formattedDate = date.format('DD/MM/YYYY');
  return formattedDate;
};
export const convertDateRelativeToNow = (inputDate: string, language?: ELanguageCode) => {
  dayjs.locale(language || ELanguageCode.VN);
  dayjs.extend(relativeTime);

  return dayjs().diff(inputDate, 'd', true) > 14 ? convertDateFormatOnlyDate(inputDate) : dayjs(inputDate).fromNow();
};

export const convertDateRelativeToNowMsg = (inputDate: string, language?: ELanguageCode) => {
  dayjs.locale(language || ELanguageCode.VN);
  dayjs.extend(relativeTime);

  if (dayjs().diff(inputDate, 'm') <= 60) {
    return dayjs().diff(inputDate, 'm') + 'm';
  } else if (dayjs().diff(inputDate, 'h') <= 23) {
    return dayjs().diff(inputDate, 'h') + 'h';
  } else {
    return dayjs().diff(inputDate, 'd') + 'd';
  }
};
