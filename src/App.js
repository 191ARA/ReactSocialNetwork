import { Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import HomePage from './pages/HomePage';
import PostPage from './pages/PostPage';
import ProfilePage from './pages/ProfilePage';
import UsersPage from './pages/UsersPage';
import MessagesPage from './pages/MessagesPage';
import AlbumsPage from './pages/AlbumsPage';
import AlbumDetailPage from './pages/AlbumDetailPage';
import TodosPage from './pages/TodosPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="home" element={<HomePage />} />
        <Route path="posts" element={<HomePage />} />
        <Route path="post/:id" element={<PostPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="profile/:userId" element={<ProfilePage />} />
        <Route path="users" element={<UsersPage />} />
        <Route path="messages" element={<MessagesPage />} />
        <Route path="albums" element={<AlbumsPage />} />
        <Route path="album/:albumId" element={<AlbumDetailPage />} />
        <Route path="todos" element={<TodosPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;