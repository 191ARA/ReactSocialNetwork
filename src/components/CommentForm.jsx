import { useState } from 'react';
import './CommentForm.css';

const CommentForm = ({ onSubmit }) => {
  const [commentText, setCommentText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (commentText.trim()) {
      onSubmit(commentText);
      setCommentText('');
    }
  };

  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      <textarea
        className="comment-textarea"
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        placeholder="Напишите ваш комментарий..."
        required
      />
      <button className="comment-button" type="submit">💬 Отправить</button>
    </form>
  );
};

export default CommentForm;
