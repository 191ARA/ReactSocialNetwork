import './Sidebar.css';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <h3 className="sidebar-title">Меню</h3>
      <ul className="sidebar-list">
        <li><a href="#" className="sidebar-button">🔥 Ссылка 1</a></li>
        <li><a href="#" className="sidebar-button">📊 Ссылка 2</a></li>
        <li><a href="#" className="sidebar-button">⚙️ Ссылка 3</a></li>
      </ul>
    </aside>
  );
};

export default Sidebar;
