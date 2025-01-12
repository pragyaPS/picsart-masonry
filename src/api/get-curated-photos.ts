import { pexelFetchWrapper } from './pexel-fetch-wrapper';
import { PaginationQueryParams } from './request-types';
import { CuratedPhotosResponse } from './response-types';

export const fetchCuratedPhotos = async (
	params: PaginationQueryParams = { page: 1, per_page: 20 }
) => {
	return await pexelFetchWrapper<CuratedPhotosResponse>('curated', params);
};
