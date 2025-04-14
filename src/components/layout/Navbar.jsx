import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li><NavLink to="/home">Home</NavLink></li>
        <li><NavLink to="/profile">Profile</NavLink></li>
        <li><NavLink to="/posts">Posts</NavLink></li>
        <li><NavLink to="/messages">Messages</NavLink></li>
      </ul>
    </nav>
  );
};

export default Navbar;