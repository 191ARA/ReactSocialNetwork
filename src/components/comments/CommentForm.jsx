import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addComment } from '../../store/commentsSlice';
import './CommentForm.css';

const CommentForm = ({ postId }) => {
  const [name, setName] = useState('');
  const [body, setBody] = useState('');
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.comments);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !body.trim()) return;
    
    const newComment = {
      postId: Number(postId),
      name,
      body,
      email: `${name.replace(/\s+/g, '').toLowerCase()}@example.com`
    };
    
    dispatch(addComment(newComment));
    setName('');
    setBody('');
  };

  return (
    <form onSubmit={handleSubmit} className="comment-form">
      <h3>Add a comment</h3>
      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          disabled={loading}
        />
      </div>
      <div className="form-group">
        <label htmlFor="body">Comment:</label>
        <textarea
          id="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
          disabled={loading}
        />
      </div>
      <button type="submit" disabled={loading}>
        {loading ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
};

export default CommentForm;