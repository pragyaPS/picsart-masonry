import './App.css';
import { Route, Routes } from 'react-router';
import PhotoList from './pages/photo-list';
import PhotoDetails from './pages/photo-details';

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