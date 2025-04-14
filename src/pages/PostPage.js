import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchComments, deleteComment } from '../store/commentsSlice';
import { getPostById } from '../api/api';
import { fetchUserById } from '../store/usersSlice';
import CommentList from '../components/comments/CommentList';
import CommentForm from '../components/comments/CommentForm';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import ErrorMessage from '../components/ui/ErrorMessage';
import './PostPage.css';

const PostPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { comments, loading: commentsLoading, error: commentsError } = useSelector((state) => state.comments);
  const { currentUser, loading: userLoading, error: userError } = useSelector((state) => state.users);
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const postData = await getPostById(id);
        setPost(postData);
        dispatch(fetchComments(id));
        dispatch(fetchUserById(postData.userId));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch, id]);

  const handleDeleteComment = (commentId) => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      dispatch(deleteComment(commentId));
    }
  };

  if (loading || commentsLoading || userLoading) return <LoadingSpinner />;
  if (error || commentsError || userError) return <ErrorMessage message={error || commentsError || userError} />;

  return (
    <div className="post-page">
      <div className="post-content">
        <h1 className="post-title">{post?.title}</h1>
        <div className="post-author">
          {currentUser && (
            <div className="author-info">
              <div className="author-avatar">
                {currentUser.name.charAt(0)}
              </div>
              <div>
                <span className="author-name">{currentUser.name}</span>
                <span className="author-email">{currentUser.email}</span>
              </div>
            </div>
          )}
        </div>
        <p className="post-body">{post?.body}</p>
      </div>
      
      <div className="comments-section">
        <h2>Comments ({comments.length})</h2>
        <CommentList 
          comments={comments} 
          onDelete={handleDeleteComment} 
        />
        <CommentForm postId={id} />
      </div>
    </div>
  );
};

export default PostPage;