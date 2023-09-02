import { isPhoneNumber } from 'class-validator';

export const isValidPhoneNumber = (phoneNumber: string) => {
  return isPhoneNumber(phoneNumber) && /^\+[0-9]{1,15}$/.test(phoneNumber);
};
