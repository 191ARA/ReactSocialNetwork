
import { Link } from 'react-router-dom';
import './AlbumCard.css';

const AlbumCard = ({ album, user }) => {
  return (
    <div className="album-card">
      <div className="album-cover">
        <span>Album #{album.id}</span>
      </div>
      <div className="album-info">
        <h3>{album.title}</h3>
        {user && (
          <p className="album-author">
            By: <Link to={`/profile/${user.id}`}>{user.name}</Link>
          </p>
        )}
        <Link to={`/album/${album.id}`} className="view-album-btn">
          View Album
        </Link>
      </div>
    </div>
  );
};

export default AlbumCard;