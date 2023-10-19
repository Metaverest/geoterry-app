import { IProfileDto } from './user';

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
}

export const MOCK_TERRY: ITerryResponseDto[] = [
  {
    id: '1',
    createdAt: '2021-04-28T10:20:30Z',
    updatedAt: '2021-04-28T10:20:30Z',
    profileId: '1',
    name: 'Terry 1',
    description: 'Terry 1',
    hint: 'Terry 1',
    isAvailable: false,
    photoUrls: ['https://i.imgur.com/0zB0k0E.jpeg'],
    categoryIds: ['1'],
    location: {
      latitude: 37.52267083847234,
      longitude: -122.08498707041144,
    },
    metadata: {
      size: 1,
      difficulty: 1,
      terrain: 1,
    },
    profile: {
      id: '1',
      displayName: 'Terry 1',
      photoUrl: 'https://i.imgur.com/0zB0k0E.jpeg',
    },
  },
  {
    id: '2',
    createdAt: '2021-04-28T10:20:30Z',
    updatedAt: '2021-04-28T10:20:30Z',
    profileId: '2',
    name: 'Terry 2',
    description: 'Terry 2',
    hint: 'Terry 2',
    isAvailable: false,
    photoUrls: ['https://i.imgur.com/0zB0k0E.jpeg'],
    categoryIds: ['1'],
    location: {
      latitude: 37.42267083847234,
      longitude: -122.03498707041144,
    },
    metadata: {
      size: 1,
      difficulty: 1,
      terrain: 1,
    },
    profile: {
      id: '2',
      displayName: 'Terry 2',
      photoUrl: 'https://i.imgur.com/0zB0k0E.jpeg',
    },
  },
  {
    id: '3',
    createdAt: '2021-04-28T10:20:30Z',
    updatedAt: '2021-04-28T10:20:30Z',
    profileId: '3',
    name: 'Terry 3',
    description: 'Terry 3',
    hint: 'Terry 3',
    isAvailable: true,
    photoUrls: ['https://i.imgur.com/0zB0k0E.jpeg'],
    categoryIds: ['1'],
    location: {
      latitude: 37.32267083847234,
      longitude: -122.08498707041144,
    },
    metadata: {
      size: 1,
      difficulty: 1,
      terrain: 1,
    },
    profile: {
      id: '3',
      displayName: 'Terry 3',
      photoUrl: 'https://i.imgur.com/0zB0k0E.jpeg',
    },
  },
];

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
}
