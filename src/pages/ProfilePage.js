import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserById } from '../store/usersSlice';
import { getPostsByUserId, getAlbumsByUserId, getTodosByUserId } from '../api/api';
import PostItem from '../components/posts/PostItem';
import AlbumCard from '../components/albums/AlbumCard';
import TodoItem from '../components/todos/TodoItem';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import ErrorMessage from '../components/ui/ErrorMessage';
import './ProfilePage.css';

const ProfilePage = () => {
  const { userId } = useParams();
  const [activeTab, setActiveTab] = useState('posts');
  const [userPosts, setUserPosts] = useState([]);
  const [userAlbums, setUserAlbums] = useState([]);
  const [userTodos, setUserTodos] = useState([]);
  const [loadingContent, setLoadingContent] = useState(false);
  const dispatch = useDispatch();
  const { currentUser, loading, error } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUserById(userId || 3));
  }, [dispatch, userId]);

  useEffect(() => {
    if (!currentUser) return;

    const fetchContent = async () => {
      setLoadingContent(true);
      try {
        if (activeTab === 'posts') {
          const posts = await getPostsByUserId(currentUser.id);
          setUserPosts(posts);
        } else if (activeTab === 'albums') {
          const albums = await getAlbumsByUserId(currentUser.id);
          setUserAlbums(albums);
        } else if (activeTab === 'todos') {
          const todos = await getTodosByUserId(currentUser.id);
          setUserTodos(todos);
        }
      } catch (err) {
        console.error('Failed to fetch content:', err);
      } finally {
        setLoadingContent(false);
      }
    };

    fetchContent();
  }, [activeTab, currentUser]);

  const toggleTodo = (todoId) => {
    setUserTodos(prevTodos => 
      prevTodos.map(todo => 
        todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="profile-page">
      <div className="profile-header">
        <div className="cover-photo"></div>
        <div className="profile-info">
          <div className="profile-avatar">
            {currentUser?.name.charAt(0)}
          </div>
          <div className="profile-details">
            <h1 className="profile-name">{currentUser?.name}</h1>
            <p className="profile-username">@{currentUser?.username}</p>
            <p className="profile-bio">
              {currentUser?.company?.catchPhrase}
            </p>
            <div className="profile-stats">
              <div className="stat">
                <span className="stat-number">{userPosts.length}</span>
                <span className="stat-label">Posts</span>
              </div>
              <div className="stat">
                <span className="stat-number">{userAlbums.length}</span>
                <span className="stat-label">Albums</span>
              </div>
              <div className="stat">
                <span className="stat-number">{userTodos.length}</span>
                <span className="stat-label">Todos</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="profile-tabs">
        <button 
          className={`tab ${activeTab === 'posts' ? 'active' : ''}`}
          onClick={() => setActiveTab('posts')}
        >
          Posts
        </button>
        <button 
          className={`tab ${activeTab === 'albums' ? 'active' : ''}`}
          onClick={() => setActiveTab('albums')}
        >
          Albums
        </button>
        <button 
          className={`tab ${activeTab === 'todos' ? 'active' : ''}`}
          onClick={() => setActiveTab('todos')}
        >
          Todos
        </button>
        <button 
          className={`tab ${activeTab === 'about' ? 'active' : ''}`}
          onClick={() => setActiveTab('about')}
        >
          About
        </button>
      </div>

      <div className="profile-content">
        {loadingContent ? (
          <LoadingSpinner />
        ) : (
          <>
            {activeTab === 'posts' && (
              <div className="posts-grid">
                {userPosts.map(post => (
                  <PostItem key={post.id} post={post} />
                ))}
              </div>
            )}

            {activeTab === 'albums' && (
              <div className="albums-grid">
                {userAlbums.map(album => (
                  <AlbumCard key={album.id} album={album} />
                ))}
              </div>
            )}

            {activeTab === 'todos' && (
              <div className="todos-list">
                {userTodos.map(todo => (
                  <TodoItem 
                    key={todo.id} 
                    todo={todo} 
                    onToggle={() => toggleTodo(todo.id)} 
                  />
                ))}
              </div>
            )}

            {activeTab === 'about' && currentUser && (
              <div className="about-section">
                <div className="about-card">
                  <h3>Contact</h3>
                  <p><strong>Email:</strong> {currentUser.email}</p>
                  <p><strong>Phone:</strong> {currentUser.phone}</p>
                  <p><strong>Website:</strong> {currentUser.website}</p>
                </div>

                <div className="about-card">
                  <h3>Address</h3>
                  <p>{currentUser.address?.street}</p>
                  <p>{currentUser.address?.suite}</p>
                  <p>{currentUser.address?.city}, {currentUser.address?.zipcode}</p>
                </div>

                <div className="about-card">
                  <h3>Company</h3>
                  <p><strong>{currentUser.company?.name}</strong></p>
                  <p>{currentUser.company?.catchPhrase}</p>
                  <p>{currentUser.company?.bs}</p>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;