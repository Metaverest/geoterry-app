export interface IFilterTerryCategoryInputDto {
  categoryIds?: string[];
}

export interface ITerryCategoryResDto {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  description?: string;
}
