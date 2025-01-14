import { Photo } from '../api/response-types';

type ArrangeHeightBalance = (
	photos: Photo[],
	NUM_COLUMN?: number,
	gap?: number,
	COL_WIDTH?: number,
	columnHeights?: number[]
) => Array<Photo & { top: number; left: number; width: number }>;

export const arrangeHeightBalance: ArrangeHeightBalance = (
	photos,
	NUM_COLS = 3,
	GAP = 10,
	COL_WIDTH = 70,
	columnHeights = Array(NUM_COLS).fill(0)
) => {
	// For each photo, add the position data.
	return photos.map((photo) => {
		const height = photo.height / 20;
		// Find the shortest column.
		const shortestCol = columnHeights.indexOf(Math.min(...columnHeights));

		// Calculate the `left` value of the current photo.
		const left = shortestCol * COL_WIDTH + shortestCol * GAP;
		// Calculate the `top` value of the current photo.
		const top: number = GAP + columnHeights[shortestCol];
		// Update the column height.
		columnHeights[shortestCol] = top + height;

		return {
			...photo,
			left,
			top,
			height,
			width: COL_WIDTH,
		};
	});
};
