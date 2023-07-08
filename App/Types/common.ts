export enum ELanguageCode {
  VIETNAMESE = 'vn',
  ENGLISH = 'en',
}

export interface IPagination {
  page?: number;
  pageSize?: number;
  total?: number;
}
