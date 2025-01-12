import { useParams } from 'react-router';

 function PhotoDetails() {
  const params = useParams();
  return <div>Photo Details with {params.photoId}</div>;
}

export default PhotoDetails;