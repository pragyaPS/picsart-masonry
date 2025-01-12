interface Pagination {
	url?: string;
	page: number;
	per_page: number;
	next_page: string;
	total_results: number;
}

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

export interface Photo {
	id: number;
	width: number;
	height: number;
	url: string;
	alt: string;
	avg_color: string;
	photographer: string;
	photographer_url: string;
	photographer_id: number;
	liked: boolean;
	src: PhotoSrc;
}

export type CuratedPhotosResponse = { photos: Photo[] } & Pagination;
