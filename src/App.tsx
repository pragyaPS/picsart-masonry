import React from 'react';
import { photosMock } from './photos-mock';
import './App.css';
import { buildSrcSet } from './utils/build-src-set';
import { arrangeHeightBalance } from './utils/arrange-height-balance-pins';

// 1- set the arrangeHeight Props in the state
// 3- arrange the photos with the calculated abosolute positioning in the arrangeHeight util and create masonry layout

// 2- check if its better idea to keep them in custom hook - maybe later

// 4- create provider to fetch the list
// infinite scroll
// 5- Consume the fetcheddata to render the mesonry
// 6- load the first fetch in the server side
// 7- introduce the react context to save the state
// 8- implement pagination

const App: React.FC = () => {
	// const [photoList] = useState<Photo[]>(photosMock.photos);
	const photoList = arrangeHeightBalance(photosMock.photos, 4, 10, 100);
	console.log(photoList.map(({ top, left }) => ({ top, left })));

	return (
		<div className="photo-list-container">
			{photoList.map(({ id, height, width, top, left, src, alt }) => (
				<div key={id} className="photo-grid" style={{ top, left }}>
					<img
						alt={alt}
						src={src.original}
						srcSet={buildSrcSet(src)}
						style={{ height, width }}
					/>
				</div>
			))}
		</div>
	);
};

export default App;
