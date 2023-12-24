import { FindTerryCheckinBy } from 'App/enums';
import { ITerryCategoryResDto } from './category';
import { IProfileDto, IProfileResDto } from './user';

export interface ITerryLocationresDto {
  latitude: number;
  longitude: number;
}

export interface ITerryMetadataResDto {
  size: number;
  difficulty: number;
  terrain: number;
}

export interface ITerryResponseDto {
  id: string;
  createdAt: string;
  updatedAt: string;
  profileId: string;
  name: string;
  description?: string;
  hint?: string;
  isAvailable: boolean;
  photoUrls?: string[];
  categoryIds?: string[];
  location: ITerryLocationresDto;
  metadata: ITerryMetadataResDto;
  profile?: IProfileDto;
  checkedIn?: boolean;
  saved?: boolean;
  favourite?: boolean;
  distance?: number;
  address?: string;
  categories?: ITerryCategoryResDto[];
  rating: {
    rate: number;
    total: number;
  };
  path?: string;
}
export interface IMinMaxQueryDto {
  min: number;
  max: number;
}

export interface ILocationDto {
  longitude: number;
  latitude: number;
}

export interface IDistanceQueryDto {
  max: number;
  min: number;
}
export interface ITerryFilterInputDto {
  textSearch?: string;
  size?: IMinMaxQueryDto;
  difficulty?: IMinMaxQueryDto;
  rate?: IMinMaxQueryDto;
  terrain?: IMinMaxQueryDto;
  categoryIds?: string[];
  location?: ILocationDto;
  distance?: IDistanceQueryDto;
}

export interface ITerryFilterParams {
  page?: number;
  pageSize?: number;
  includeCategoryData?: boolean;
  includeProfileData?: boolean;
}

export interface IGetTerryByIdParams {
  terryId: string;
  latitude?: number;
  longitude?: number;
  includeCategoryData?: boolean;
  includeProfileData?: boolean;
  markAsFavourited?: boolean;
  markAsSaved?: boolean;
  includeUserPath?: boolean;
  isBackgroundAction?: boolean;
}
export interface ITerryCheckinsParams {
  page?: number;
  pageSize?: number;
  includeTerryData?: boolean;
}

export interface IResponseTerryCheckins {
  terryId: string;
  profileId: string;
  checkinAt: string;
  reviewText: string;
  photoUrls: string[];
  rate: number;
  location: Location;
  createdAt: string;
  updatedAt: string;
  id: string;
  terry: ITerryResponseDto;
  isFound: boolean;
  path?: string;
}

export interface Location {
  latitude: number;
  longitude: number;
}

export interface Terry {
  id: string;
  metadata: Metadata;
  name: string;
  location: Location;
}

export interface Metadata {
  size: number;
  difficulty: number;
  terrain: number;
}

export interface IFilterTerryCheckins {
  terryIds?: string[];
}

export interface ITerryLocationDto {
  latitude: number;
  longitude: number;
}
export interface ITerryMetadataDto {
  size: number;
  difficulty: number;
  terrain: number;
}
export interface ITerryInputDto {
  name: string;
  description?: string;
  hint?: string;
  isAvailable: boolean;
  photoUrls?: string[];
  categoryIds?: string[];
  location: ITerryLocationDto;
  metadata: ITerryMetadataDto;
  address?: string;
}
export interface IGetCheckinsOfTerryParams extends ITerryCheckinsParams {
  includeProfileData?: boolean;
}
export interface IResponseGetCheckinsOfTerry extends IResponseTerryCheckins {
  profile: Pick<IProfileResDto, 'id' | 'displayName' | 'logoUrl' | 'slug'>;
}

export interface ITerryCheckinInputDto {
  terryId: string;
  reviewText?: string;
  photoUrls?: string[];
  rate?: number;
  isFound: boolean;
  location: ITerryLocationDto;
}

export interface ITerryCheckinResDto {}

export interface IHunterGetTerryCheckinParams {
  profileId: string;
  id: string;
  findBy?: FindTerryCheckinBy;
  includeTerryData?: boolean;
  includeUserPath?: boolean;
}

export interface ITerryUserPathResDto {
  id: string;
  createdAt: string;
  updatedAt: string;
  terryId: string;
  profileId: string;
  path?: string;
}

export interface IPlayerNearbyResDto {
  profileId: string;
}
