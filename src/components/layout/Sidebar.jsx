import './Sidebar.css';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-section">
        <h3 className="sidebar-title">Shortcuts</h3>
        <ul className="sidebar-links">
          <li>Groups</li>
          <li>Events</li>
          <li>Memories</li>
        </ul>
      </div>
      <div className="sidebar-section">
        <h3 className="sidebar-title">Contacts</h3>
        <ul className="sidebar-contacts">
          <li>John Doe</li>
          <li>Jane Smith</li>
          <li>Mike Johnson</li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;