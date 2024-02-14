export enum EImageSize {
  SIZE_100 = '100x',
  SIZE_150 = '150x',
  SIZE_200 = '200x',
  SIZE_250 = '250x',
  SIZE_300 = '300x',
  SIZE_400 = '400x',
  SIZE_500 = '500x',
  SIZE_600 = '600x',
  SIZE_700 = '700x',
  SIZE_800 = '800x',
  SIZE_900 = '900x',
  SIZE_1000 = '1000x',
  SIZE_1200 = '1200x',
  SIZE_1300 = '1300x',
  SIZE_1350 = '1350x',
}

export const getResizedImageUrl = (originalUrl: string, size: EImageSize) => {
  return originalUrl.replace('/original/', `/${size}/`);
};
