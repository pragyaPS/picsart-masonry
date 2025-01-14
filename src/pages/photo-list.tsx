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
	totalHeight: number;
}
const initialPhotoState: PhotoState = {
	photos: [],
	page: 1,
	per_page: 20,
	total_results: 0,
	next_page: '',
	totalHeight: 0,
};

const PhotoList: React.FC = () => {
	const [photoData, setPhotoData] = useState<PhotoState>(initialPhotoState);
	const [loading, setLoading] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const lastPhotoRef = useRef<HTMLDivElement | null>(null);
	const columnHeights = useRef<Array<number>>(Array<number>(4).fill(0));
	const [visiblePhotos, setVisiblePhotos] = useState<
		PhotoWithAbsolutePosition[]
	>([]);
	const scrollContainerRef = useRef<HTMLDivElement>(null);
	const debounceTimeout = useRef<number | null>(null);

	const handleScroll = useCallback(() => {
		console.time('handleScroll');
		const container = scrollContainerRef.current;
		if (!container) return;

		const scrollTop = container.scrollTop;
		const viewportHeight = container.clientHeight;
		console.log({ scrollTop, viewportHeight });

		// Calculate the visible range
		const start = scrollTop - 200; // Add some buffer space
		const end = scrollTop + viewportHeight + 200;

		// Filter photos within the visible range
		const visible = photoData.photos.filter(
			(photo) => photo.top + photo.height >= start && photo.top <= end
		);

		setVisiblePhotos(visible);
		console.timeEnd('handleScroll');
	}, [photoData.photos]);

	const fetchPhotos = useCallback(
		async (page: number, per_page: number = 20) => {
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
						180,
						columnHeights.current
					),
				],
				page: response.page,
				per_page: response.per_page,
				total_results: response.total_results,
				next_page: response.next_page,
				totalHeight: columnHeights.current.reduce((acc, height) => {
					return Math.max(acc, height);
				}),
			}));
		},
		[]
	);

	// Debounce Wrapper
	const debouncedScrollHandler = useCallback(() => {
		if (debounceTimeout.current) {
			clearTimeout(debounceTimeout.current);
		}

		debounceTimeout.current = setTimeout(() => {
			handleScroll();
		}, 10);
	}, [handleScroll]);

	// Attach scroll event listener
	useEffect(() => {
		const container = scrollContainerRef.current;
		if (!container) return;

		container.addEventListener('scroll', debouncedScrollHandler);
		debouncedScrollHandler(); // Trigger initially to calculate visible photos

		return () => {
			container.removeEventListener('scroll', debouncedScrollHandler);
		};
	}, [debouncedScrollHandler]);

	useEffect(() => {
		if (!loading && photoData.photos.length > 0) {
			const lastPhoto = photoData.photos[photoData.photos.length - 1];
			if (
				lastPhoto &&
				lastPhoto.top <= scrollContainerRef.current!.scrollTop + 1000
			) {
				setCurrentPage((prev) => prev + 1);
			}
		}
	});

	useEffect(() => {
		setLoading(true);
		fetchPhotos(currentPage)
			.catch((error) => console.error('Error fetching photos:', error))
			.finally(() => setLoading(false));
	}, [fetchPhotos, currentPage]);

	return (
		<div className="photo-list-container" ref={scrollContainerRef}>
			{visiblePhotos.map(({ id, height, width, top, left, src, alt }) => {
				const isLastPhoto =
					id === photoData.photos[photoData.photos.length - 1]?.id;
				return (
					<div
						key={`${id}`}
						className={`photo-grid ${isLastPhoto ? 'last-photo' : ''}`}
						style={{ top, left, height, width, backgroundColor: '#57504f' }}
						ref={isLastPhoto ? lastPhotoRef : null}
					>
						<img
							alt={alt}
							src={src.original}
							fetchPriority="auto"
							srcSet={buildSrcSet(src)}
							style={{ color: 'transparent', height: '100%', width: '100%' }}
						/>
					</div>
				);
			})}
		</div>
	);
};

export default PhotoList;
