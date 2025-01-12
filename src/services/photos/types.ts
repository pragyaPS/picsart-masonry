export interface PhotoSrc {
	original: string;
	large2x: string;
	large: string;
	medium: string;
	small: string;
	portrait: string;
	landscape: string;
	tiny: string;
}

// Represents a single photo in the `photos` array
export interface Photo {
	id: number;
	width: number;
	height: number;
	url: string;
	photographer: string;
	photographer_url: string;
	photographer_id: number;
	avg_color: string;
	src: PhotoSrc;
	liked: boolean;
	alt: string;
}

// Represents the entire response from the Pexels API
export interface CuratedPhotosResponse {
	page: number;
	per_page: number;
	photos: Photo[];
	total_results: number;
	next_page?: string;
}
