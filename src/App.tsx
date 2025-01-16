import './App.css';
import { Routes, Route } from 'react-router-dom';
import PhotoDetails from './pages/photo-details';
import PhotoList from './pages/photo-list';

function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<PhotoList />} />
				<Route path="/details/:photoId" element={<PhotoDetails />} />
			</Routes>
		</>
	);
}

export default App;
