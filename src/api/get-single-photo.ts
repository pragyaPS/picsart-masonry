import { pexelFetchWrapper } from './pexel-fetch-wrapper';
import { Photo } from './response-types';

export const fetchPhotoById = async (photoId: number): Promise<Photo> => {
	if (!photoId) {
		throw new Error('Photo ID is required to fetch a photo.');
	}
	return await pexelFetchWrapper(`photos/${photoId}`);
};
