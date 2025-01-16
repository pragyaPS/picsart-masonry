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
		<div className="photo-card-container">
			<div
				className="photo-card"
				style={{
					backgroundColor: bgColor,
				}}
			>
				<img alt={description} src={url} fetchPriority="auto" srcSet={srcSet} />

				{/* Content Section */}
				<div className="photo-info">
					<h2 className="author-info">Photo by {author}</h2>
					<p className="photo-description">{description}</p>
				</div>
			</div>
		</div>
	);
};

export default PhotoCard;
