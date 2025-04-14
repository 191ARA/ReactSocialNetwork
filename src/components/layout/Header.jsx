import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">SocialNetwork</div>
      <div className="search-bar">
        <input type="text" placeholder="Search..." />
      </div>
      <div className="user-menu">User Menu</div>
    </header>
  );
};

export default Header;