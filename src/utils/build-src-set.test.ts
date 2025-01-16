import { photosMock } from '../test/mocks/photo-list-mock';
import { buildSrcSet } from './build-src-set';

const expectedscrSet = `
      https://example.com/photos/30154113/pexels-photo-30154113.jpeg?auto=compress&cs=tinysrgb&h=130 130w,
      https://example.com/photos/30154113/pexels-photo-30154113.jpeg?auto=compress&cs=tinysrgb&h=350 350w,
      https://example.com/photos/30154113/pexels-photo-30154113.jpeg?auto=compress&cs=tinysrgb&h=650&w=940 650w,
      https://example.com/photos/30154113/pexels-photo-30154113.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940 1300w,
      https://example.com/photos/30154113/pexels-photo-30154113.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800 800w,
      https://example.com/photos/30154113/pexels-photo-30154113.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200 1200w
    `;

describe('BuildSrcSet', () => {
	it('should build srcset', () => {
		const srcSet = buildSrcSet(photosMock.photos[0].src);
		expect(srcSet).toEqual(expectedscrSet);
	});
});
