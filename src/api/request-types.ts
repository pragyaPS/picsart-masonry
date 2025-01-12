export type QueryParams = Record<string, string | number | undefined>;

export interface PaginationQueryParams extends QueryParams {
  per_page?: number;
  page?: number;
}

export interface SinglePhotoParams extends QueryParams {
  id: number;
}

export interface SearchParams extends PaginationQueryParams {
  query: string;
  orientation?: 'landscape' | 'portait' | 'square';
  size?: 'large' | 'medium' | 'small';
}
