import React, { useCallback, useEffect, useRef, useState } from 'react';
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
	page: 1,
	per_page: 20,
	total_results: 0,
	next_page: '',
};

const PhotoList: React.FC = () => {
	const [photoData, setPhotoData] = useState<PhotoState>(initialPhotoState);
	const [loading, setLoading] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const observerRef = useRef<IntersectionObserver | null>(null);
	const lastPhotoRef = useRef<HTMLDivElement | null>(null);
	const columnHeights = useRef<Array<number>>(Array<number>(4).fill(0));

	const fetchPhotos = useCallback(
		async (page: number, per_page: number = 20) => {
			// if (page > 2) return;
			setLoading(true);
			const response = await fetchCuratedPhotos({
				page: page,
				per_page: per_page,
			});
			setPhotoData((prevPhotoData) => ({
				photos: [
					...prevPhotoData.photos,
					...arrangeHeightBalance(
						response.photos,
						4,
						10,
						100,
						columnHeights.current
					),
				],
				page: response.page,
				per_page: response.per_page,
				total_results: response.total_results,
				next_page: response.next_page,
			}));
			// setCurrentPage(response.page);
		},
		[]
	);
	useEffect(() => {
		setLoading(true);
		fetchPhotos(currentPage)
			.catch((error) => console.error('Error fetching photos:', error))
			.finally(() => setLoading(false));
	}, [fetchPhotos, currentPage]);

	useEffect(() => {
		// set up the intersection observer
		if (observerRef.current) {
			observerRef.current.disconnect();
		}
		observerRef.current = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting && !loading) {
					setCurrentPage((prevPage) => prevPage + 1);
				}
			},
			{ root: null, rootMargin: '10px', threshold: 1 }
		); // triggers when 10% of the last photo is visible
		if (lastPhotoRef.current) {
			observerRef.current.observe(lastPhotoRef.current);
		}
		return () => {
			if (observerRef.current) {
				observerRef.current.disconnect();
			}
		};
	}, [loading]);

	return (
		<div className="photo-list-container">
			{photoData.photos.map(
				({ id, height, width, top, left, src, alt }, index) => {
					const isLastPhoto = index === photoData.photos.length - 1;
					return (
						<div
							key={`${index}-${id}`}
							className={`photo-grid ${isLastPhoto ? 'last-photo' : ''}`}
							style={{ top, left }}
							ref={isLastPhoto ? lastPhotoRef : null}
						>
							<img
								alt={alt}
								src={src.original}
								srcSet={buildSrcSet(src)}
								style={{ height, width }}
							/>
						</div>
					);
				}
			)}
		</div>
	);
};

export default PhotoList;
