import React, { useEffect } from 'react';
import { buildSrcSet } from '../utils/build-src-set';
import { arrangeHeightBalance } from '../utils/arrange-height-balance-pins';
import { fetchCuratedPhotos } from '../api/get-curated-photos';
import { CuratedPhotosResponse, Photo } from '../api/response-types';

interface PhotoWithAbsolutePosition extends Photo {
	top: number;
	left: number;
}
interface PhotoState extends Omit<CuratedPhotosResponse, 'photos'> {
	photos: PhotoWithAbsolutePosition[];
}
const initialPhotoState: PhotoState = {
	photos: [],
	page: 0,
	per_page: 0,
	total_results: 0,
	next_page: '',
};

const PhotoList: React.FC = () => {
	const [photData, setPhotoData] =
		React.useState<PhotoState>(initialPhotoState);
	useEffect(() => {
		const fetchPhotos = async () => {
			const response = await fetchCuratedPhotos();
			setPhotoData({
				photos: arrangeHeightBalance(response.photos, 4, 10, 100),
				page: response.page,
				per_page: response.per_page,
				total_results: response.total_results,
				next_page: response.next_page,
			});
		};
		fetchPhotos().catch((error) =>
			console.error('Error fetching photos:', error)
		);
	}, []);

	return (
		<div className="photo-list-container">
			{photData.photos.map(({ id, height, width, top, left, src, alt }) => (
				<div key={id} className="photo-grid" style={{ top, left }}>
					<img
						alt={alt}
						src={src.original}
						srcSet={buildSrcSet(src)}
						style={{ height, width }}
					/>
				</div>
			))}
		</div>
	);
};

export default PhotoList;
