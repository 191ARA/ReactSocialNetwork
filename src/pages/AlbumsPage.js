import { useEffect, useState } from 'react';
import { getAlbums, getUsers } from '../api/api';
import AlbumCard from '../components/albums/AlbumCard';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import ErrorMessage from '../components/ui/ErrorMessage';
import { Link } from 'react-router-dom';
import './AlbumsPage.css';

const AlbumsPage = () => {
  const [albums, setAlbums] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [albumsData, usersData] = await Promise.all([
          getAlbums(),
          getUsers()
        ]);
        setAlbums(albumsData);
        setUsers(usersData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getUserById = (userId) => {
    return users.find(user => user.id === userId);
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="albums-page">
      <div className="page-header">
        <h1>Photo Albums</h1>
      </div>
      <div className="albums-grid">
        {albums.map(album => {
          const user = getUserById(album.userId);
          return (
            <AlbumCard 
              key={album.id} 
              album={album} 
              user={user} 
            />
          );
        })}
      </div>
    </div>
  );
};

export default AlbumsPage;