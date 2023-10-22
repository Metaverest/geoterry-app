import { isEmail, isPhoneNumber } from 'class-validator';

export const validateEmail = (email: string) => {
  return isEmail(email);
};

export const validatePhoneNumber = (phoneNumber: string) => isPhoneNumber(phoneNumber);
