import axiosInstance from '../../api/axios';
import { CuratedPhotosResponse } from './types';

export const getCuratedPhotos = async (
	per_page: number = 20,
	page: number = 1
): Promise<CuratedPhotosResponse> => {
	try {
		const response: { data: CuratedPhotosResponse } = await axiosInstance.get(
			`/curated?per_page=${per_page}&page=${page}`
		);
		return response.data;
	} catch (error) {
		console.error('Error fetching curated photos', error);
		throw error;
	}
};
