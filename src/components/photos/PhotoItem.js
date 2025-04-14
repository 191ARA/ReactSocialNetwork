
import './PhotoItem.css';

const PhotoItem = ({ photo }) => {
  return (
    <div className="photo-item">
      <img 
        src={photo.thumbnailUrl} 
        alt={photo.title} 
        className="photo-image"
        onError={(e) => {
          e.target.src = 'https://via.placeholder.com/150';
        }}
      />
      <p className="photo-title">{photo.title}</p>
    </div>
  );
};

export default PhotoItem;