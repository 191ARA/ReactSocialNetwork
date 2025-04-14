import './CommentItem.css';

const CommentItem = ({ comment, onDelete }) => {
  return (
    <div className="comment-item">
      <div className="comment-header">
        <span className="comment-author">{comment.name}</span>
        <span className="comment-email">{comment.email}</span>
      </div>
      <p className="comment-body">{comment.body}</p>
      <div className="comment-actions">
        <button 
          className="delete-button"
          onClick={() => onDelete(comment.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default CommentItem;