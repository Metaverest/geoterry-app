export enum ELanguageCode {
  EN = 'en',
  VN = 'vn',
}

export enum EDataStorageKey {
  LANGUAGE = 'LOCAL LANGUAGE',
  ACCESS_TOKEN = 'ACCESS TOKEN',
  REFRESH_TOKEN = 'REFRESH TOKEN',
  DISPLAY_NAME_TO_CREATE_PROFILE = 'DISPLAY NAME TO CREATE PROFILE',
  AVATAR_TO_CREATE_PROFILE = 'AVATAR TO CREATE PROFILE',
  IS_SAVE_BATTERY_MODE = 'IS SAVE BATTERY MODE',
  NAMESPACE = 'NAMESPACE',
  IDENTIFIER_TYPE = 'IDENTIFIER TYPE',
  PROFILE_ID = 'PROFILE ID',
}

export enum ENamespace {
  GEOTERRY_ADMINS = 'geoterry-admins',
  GEOTERRY_BUILDERS = 'geoterry-builders',
  GEOTERRY_HUNTERS = 'geoterry-hunters',
}
export enum EIdentifierType {
  PHONE_NUMBER = 'phone_number',
  EMAIL = 'email',
  GOOGLE = 'google',
  APPLE = 'apple',
}

export enum EButtonType {
  SOLID = 'SOLID',
  OUTLINE = 'OUTLINE',
}

export enum FindTerryCheckinBy {
  TERRY_ID = 'terry_id',
  CHECKIN_ID = 'checkin_id',
}

export enum EUserRole {
  builder = 'partner',
  hunter = 'user',
}
export enum ETitleUserRole {
  HUNTER = 'Hunter',
  BUILDER = 'Builder',
}
export enum EUseRoleRequestStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
}

export enum EPublicReadProfileBy {
  ID = 'id',
  SLUG = 'slug',
}

export enum EMediaType {
  PHOTO = 'photo',
  VIDEO = 'video',
  MIXED = 'mixed',
}
