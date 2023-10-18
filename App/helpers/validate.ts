import { isEmail } from 'class-validator';

export const validateEmail = (email: string) => {
  return isEmail(email);
};
