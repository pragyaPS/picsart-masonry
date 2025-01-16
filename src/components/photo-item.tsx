import React from 'react';
import { Photo } from '../api/response-types';
import { buildSrcSet } from '../utils/build-src-set';

interface PhotoItemProps {
	photo: Photo & { top: number; left: number };
	handlePhotoClick: (id: number) => Promise<void>;
}

const PhotoItem: React.FC<PhotoItemProps> = ({ photo, handlePhotoClick }) => {
	const { id, src, alt, top, left, height, width, avg_color } = photo;
	const [isLoaded, setIsLoaded] = React.useState(false);
	return (
		<div
			key={id}
			className="photo-grid"
			style={{ top, left, height, width, cursor: 'pointer' }}
			onClick={() => {
				handlePhotoClick?.(id);
			}}
		>
			{!isLoaded && (
				<div
					style={{ backgroundColor: avg_color, height: '100%', width: '100%' }}
				/>
			)}
			<img
				src={src.original}
				alt={alt}
				srcSet={buildSrcSet(src)}
				onLoad={() => setIsLoaded(true)}
				style={{ width: '100%', height: '100%', color: 'transparent' }}
			/>
		</div>
	);
};

export default PhotoItem;
