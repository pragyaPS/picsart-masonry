import { PhotoSrc } from '../types';
export const buildSrcSet = (src: PhotoSrc): string => {
	return `
      ${src.small} 130w,
      ${src.medium} 350w,
      ${src.large} 650w,
      ${src.large2x} 1300w,
      ${src.portrait} 800w,
      ${src.landscape} 1200w
    `;
};
