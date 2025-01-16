import { Photo } from '../api/response-types';

export interface PhotoWithPositionData extends Photo {
	left: number;
	top: number;
}
