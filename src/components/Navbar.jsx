import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={{
      background: '#2c2f45',
      padding: '15px',
      display: 'flex',
      gap: '20px'
    }}>
      <Link to="/home" style={{ color: '#fff', textDecoration: 'none' }}>📄 Посты</Link>
      <Link to="/profile" style={{ color: '#fff', textDecoration: 'none' }}>👤 Профиль</Link>
    </nav>
  );
};

export default Navbar;
