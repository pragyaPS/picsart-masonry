import { pexelFetchWrapper } from './pexel-fetch-wrapper';

export const fetchPhotoById = async (photoId: number) => {
  if (!photoId) {
    throw new Error('Photo ID is required to fetch a photo.');
  }
  return await pexelFetchWrapper(`photos/${photoId}`);
};
