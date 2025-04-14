import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>© 2023 SocialNetwork. All rights reserved.</p>
        <div className="footer-links">
          <a href="/terms">Terms</a>
          <a href="/privacy">Privacy</a>
          <a href="/help">Help</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;