

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchComments, addComment, deleteComment, setComments } from '../redux/commentsSlice';
import axios from 'axios';
import CommentForm from '../components/CommentForm';
import './PostPage.css';

const PostPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { items: comments, loading, error } = useSelector((state) => state.comments);
  const [post, setPost] = useState(null);
  const [postError, setPostError] = useState(null);

  const currentUserId = parseInt(localStorage.getItem('currentUserId'));
  const localKey = `userProfile_${currentUserId}`;
  const savedUser = JSON.parse(localStorage.getItem(localKey)) || {
    name: 'Пользователь',
    email: 'user@example.com',
  };

  useEffect(() => {
    const loadPost = async () => {
      try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
        setPost(response.data);
      } catch (err) {
        setPostError('Ошибка при загрузке поста');
      }
    };

    // Загрузка комментариев из localStorage
    const localComments = JSON.parse(localStorage.getItem(`comments_post_${id}`));
    if (localComments) {
      dispatch(setComments(localComments));
    } else {
      dispatch(fetchComments(id));
    }

    loadPost();
  }, [dispatch, id]);

  const handleAddComment = (text) => {
    const newComment = {
      id: Date.now(),
      name: savedUser.name,
      email: savedUser.email,
      body: text,
    };

    const updatedComments = [...comments, newComment];
    localStorage.setItem(`comments_post_${id}`, JSON.stringify(updatedComments));

    dispatch(addComment({ postId: id, comment: newComment }));
  };

  const handleDeleteComment = (commentId) => {
    if (window.confirm('Удалить комментарий?')) {
      const updatedComments = comments.filter((comment) => comment.id !== commentId);
      localStorage.setItem(`comments_post_${id}`, JSON.stringify(updatedComments));

      dispatch(deleteComment({ postId: id, commentId }));
    }
  };

  return (
    <div className="post-page">
      {postError && <p className="error-message">{postError}</p>}
      {!post && !postError && <p>Загрузка поста...</p>}
      {post && (
        <>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
        </>
      )}

      <h3>Комментарии</h3>
      {loading && <p>Загрузка комментариев...</p>}
      {error && <p>{error}</p>}

      <ul className="comment-list">
        {comments.map((comment) => (
          <li key={comment.id} className="comment-item">
            <strong>{comment.name}</strong>: {comment.body}
            <button
              onClick={() => handleDeleteComment(comment.id)}
              className="delete-comment-button"
            >
              Удалить
            </button>
          </li>
        ))}
      </ul>

      <CommentForm onSubmit={handleAddComment} />
    </div>
  );
};

export default PostPage;
