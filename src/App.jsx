
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PostPage from './pages/PostPage';
import ProfilePage from './pages/ProfilePage';  
import ErrorPage from './pages/ErrorPage';
import MainLayout from './layouts/MainLayout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="home" element={<HomePage />} />
          <Route path="post/:id" element={<PostPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
