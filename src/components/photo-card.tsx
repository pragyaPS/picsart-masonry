import React from 'react';
import './photo-card.css';

interface PhotoCardProps {
	url: string;
	description: string;
	author: string;
	srcSet: string;
	bgColor: string;
}

const PhotoCard: React.FC<PhotoCardProps> = ({
	url,
	description,
	author,
	bgColor,
	srcSet,
}) => {
	return (
		<div
			className="photo-card-container"
			style={{
				backgroundColor: bgColor,
			}}
		>
			<div className="photo-card">
				<img alt={description} src={url} srcSet={srcSet} />
			</div>
			{/* Content Section */}
			<div className="photo-info">
				<h2 className="author-info">Photo by {author}</h2>
				<p className="photo-description">{description}</p>
			</div>
		</div>
	);
};

export default PhotoCard;
