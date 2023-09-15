import { EIdentifierType, ELanguageCode, ENamespace } from 'App/enums';

export interface IUser {
  displayName: string;
  email?: string;
  phoneNumber?: string;
  bio?: string;
  logoUrl?: string;
  languageCode?: ELanguageCode;
}

export interface IAccountCredentialsResDto {
  passwordChangedAt: string;
  token: string;
  refreshToken: string;
}

export interface IAccountResponseDto {
  id: string;
  createAt: string;
  updateAt: string;
  namespace: ENamespace;
  blocked: boolean;
  identifier: string;
  identifierType: EIdentifierType;
  credentials: IAccountCredentialsResDto;
}

export interface IProfileResDto {
  id: string;
  createAt: string;
  updateAt: string;
  displayName: string;
  bio?: string;
  email?: string;
  phoneNumber?: string;
  slug: string;
  userId: string;
  logoUrl?: string;
  languageCode?: ELanguageCode;
}

export interface ICreateProfileReqDto {
  displayName: string;
  email?: string;
  phoneNumber?: string;
  bio?: string;
  logoUrl?: string;
  languageCode?: ELanguageCode;
}

export interface IUploadProfileResDto {
  photoUrl: string;
}

export interface IRequestRefreshTokenResDto {
  token: string;
  refreshToken: string;
}
