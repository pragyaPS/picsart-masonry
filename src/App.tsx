import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import ErrorBoundary from './components/error-boundary/error-boundary';

const PhotoDetails = lazy(() => import('./pages/photo-details'));
const PhotoList = lazy(() => import('./pages/photo-list'));

function App() {
	return (
		<ErrorBoundary>
			<Suspense fallback={<div>Loading...</div>}>
				<Routes>
					<Route path="/" element={<PhotoList />} />
					<Route path="/details/:photoId" element={<PhotoDetails />} />
				</Routes>
			</Suspense>
		</ErrorBoundary>
	);
}

export default App;
