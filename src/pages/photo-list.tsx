import React, { useEffect, useState, useCallback, useRef } from 'react';
import { fetchCuratedPhotos } from '../api/get-curated-photos';
import { CuratedPhotosResponse } from '../api/response-types';
import { MasonryVirtualizedLayout } from '../components/masonry-virtualised/masonry-virtualised';
import { PhotoWithPositionData } from '../types/photo';
import PhotoItem from '../components/photo-item';
import { useNavigate } from 'react-router-dom';
import ErrorBoundary from '../components/error-boundary/error-boundary';
import { PexelsCredit } from '../components/pexels-credit';

const PER_PAGE_PHOTOS = 20;

const PhotoList: React.FC = () => {
	const [photoData, setPhotoData] = useState<PhotoWithPositionData[]>([]);
	const [loading, setLoading] = useState(false);
	const [page, setPage] = useState(1);
	const [totalCount, setTotalCount] = useState(0);
	const scrollContainerRef = useRef<HTMLDivElement>(null);
	const navigate = useNavigate();

	const handlePhotoClick = async (id: number) => {
		await navigate(`/details/${id}`);
	};

	const fetchPhotos = useCallback(async (page: number) => {
		setLoading(true);
		try {
			const response: CuratedPhotosResponse = await fetchCuratedPhotos({
				page,
				per_page: PER_PAGE_PHOTOS,
			});
			const mappedPhotos = response.photos.map((photo) => ({
				...photo,
				top: 0,
				left: 0,
			}));
			setPhotoData((prev) => [...prev, ...mappedPhotos]);
			setTotalCount(response.total_results);
		} catch (error) {
			console.error('Error fetching photos:', error);
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchPhotos(page);
	}, [page, fetchPhotos]);

	const renderPhoto = (photo: PhotoWithPositionData) => {
		return <PhotoItem photo={photo} handlePhotoClick={handlePhotoClick} />;
	};

	if (loading && !photoData.length) {
		return 'Loading...';
	}

	return (
		<>
			<div className="photo-list-container" ref={scrollContainerRef}>
				<ErrorBoundary message="Failed to load photos">
					<MasonryVirtualizedLayout
						items={photoData}
						perPageItems={PER_PAGE_PHOTOS}
						hasMore={photoData.length < totalCount}
						onLoadMore={() => setPage((prev) => prev + 1)}
						loading={loading}
						renderItem={renderPhoto}
						scrollContainerRef={scrollContainerRef}
					/>
				</ErrorBoundary>
			</div>
			<PexelsCredit />
		</>
	);
};

export default PhotoList;
