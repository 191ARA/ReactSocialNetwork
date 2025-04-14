import CommentItem from './CommentItem';
import './CommentList.css';

const CommentList = ({ comments, onDelete }) => {
  return (
    <div className="comment-list">
      <h3 className="comment-list-title">Comments ({comments.length})</h3>
      {comments.map((comment) => (
        <CommentItem 
          key={comment.id} 
          comment={comment} 
          onDelete={onDelete} 
        />
      ))}
    </div>
  );
};

export default CommentList;