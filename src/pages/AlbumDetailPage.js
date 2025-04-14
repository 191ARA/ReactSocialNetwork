import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAlbumById, getPhotosByAlbumId, getUserById } from '../api/api';
import PhotoItem from '../components/photos/PhotoItem';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import ErrorMessage from '../components/ui/ErrorMessage';
import { Link } from 'react-router-dom';
import './AlbumDetailPage.css';

const AlbumDetailPage = () => {
  const { albumId } = useParams();
  const [album, setAlbum] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const albumData = await getAlbumById(albumId);
        setAlbum(albumData);
        
        const [photosData, userData] = await Promise.all([
          getPhotosByAlbumId(albumId),
          getUserById(albumData.userId)
        ]);
        
        setPhotos(photosData);
        setUser(userData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [albumId]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="album-detail-page">
      <div className="album-header">
        <h1>{album?.title}</h1>
        {user && (
          <div className="album-author">
            <span>Created by: </span>
            <Link to={`/profile/${user.id}`} className="author-link">
              {user.name}
            </Link>
          </div>
        )}
      </div>
      
      <div className="photos-grid">
        {photos.map(photo => (
          <PhotoItem key={photo.id} photo={photo} />
        ))}
      </div>
    </div>
  );
};

export default AlbumDetailPage;