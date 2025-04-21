import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, deletePost } from '../redux/postsSlice';
import { Link } from 'react-router-dom';
import './HomePage.css'; 

const HomePage = () => {
  const dispatch = useDispatch();
  const { items: posts, loading, error } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);


  if (loading) return <p>Загрузка постов...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="home-page">
      <h2>Посты</h2>
      <ul className="post-list">
        {posts.map((post) => (
          <li key={post.id} className="post-item">
            <Link to={`/post/${post.id}`} className="post-link">{post.title}</Link>

          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
