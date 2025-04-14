import { Link } from 'react-router-dom';
import './PostItem.css';

const PostItem = ({ post }) => {
  return (
    <article className="post-item">
      <h3 className="post-title">{post.title}</h3>
      <p className="post-body">{post.body}</p>
      <div className="post-footer">
        <span className="post-author">User {post.userId}</span>
        <Link to={`/post/${post.id}`} className="view-comments">
          View Comments
        </Link>
      </div>
    </article>
  );
};

export default PostItem;