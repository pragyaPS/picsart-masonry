import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import './photo-details.css';
import { fetchPhotoById } from '../api/get-single-photo';
import { Photo } from '../api/response-types';
import { buildSrcSet } from '../utils/build-src-set';
import PhotoCard from '../components/photo-card';

export function PhotoDetails() {
	const params = useParams();
	const [photo, setPhoto] = useState<Photo | null>(null);

	useEffect(() => {
		const fetchPhotoDetails = async (id: number) => {
			try {
				const photoData = await fetchPhotoById(id);

				setPhoto(photoData);
			} catch (error) {
				console.error('Failed to fetch photo:', error);
			}
		};
		fetchPhotoDetails(Number(params.photoId)).catch((error) => {
			console.error('Failed to fetch photo:', error);
		});
	}, [params.photoId]);
	if (!photo) {
		return <div>Loading ...</div>;
	}
	return (
		<div className="photo-details-container">
			<Link to="/">&larr; Back to Photos</Link>
			<PhotoCard
				url={photo.src.original}
				srcSet={buildSrcSet(photo?.src)}
				description={photo.alt}
				author={photo.photographer}
				bgColor={photo.avg_color}
			/>
		</div>
	);
}

export default PhotoDetails;
