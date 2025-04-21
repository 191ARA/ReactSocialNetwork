import { Link } from 'react-router-dom';
import './ErrorPage.css';

const ErrorPage = () => {
  return (
    <div className="error-container">
      <h2>404 — Страница не найдена</h2>
      <p>К сожалению, такой страницы не существует.</p>
      <Link to="/home" className="error-link">Вернуться на главную</Link>
    </div>
  );
};

export default ErrorPage;
