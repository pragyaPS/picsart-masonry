import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import './photo-details.css';
import { fetchPhotoById } from '../api/get-single-photo';
import { Photo } from '../api/response-types';
import { buildSrcSet } from '../utils/build-src-set';

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
		<div
			className="photo-details-container"
			style={{ backgroundColor: photo?.avg_color }}
		>
			<div>
				<img
					alt={photo?.alt}
					src={photo?.src.original}
					fetchPriority="auto"
					srcSet={buildSrcSet(photo?.src)}
					style={{ color: 'transparent', height: '100%', width: '100%' }}
				/>
			</div>
			<div className="photo-details">
				<h2>{photo?.photographer}</h2>
				<p>{photo?.liked}</p>
				<p>{photo?.avg_color}</p>
			</div>
		</div>
	);
}

export default PhotoDetails;
