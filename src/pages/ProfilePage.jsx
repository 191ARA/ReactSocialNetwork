import { useState, useEffect } from 'react';
import './ProfilePage.css'; // Import the CSS file

const ProfilePage = () => {
  const userId = 1; 
  const [userData, setUserData] = useState({ name: '', email: '', phone: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const localKey = `userProfile_${userId}`;

  const fetchUserData = async () => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
      if (!response.ok) throw new Error('Ошибка при загрузке данных');

      const data = await response.json();
      const formattedData = {
        name: data.name,
        email: data.email,
        phone: data.phone,
      };
      setUserData(formattedData);
      localStorage.setItem(localKey, JSON.stringify(formattedData));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Сохраняем текущего пользователя в отдельный ключ
    localStorage.setItem('currentUserId', userId.toString());

    const savedData = localStorage.getItem(localKey);
    if (savedData) {
      setUserData(JSON.parse(savedData));
      setLoading(false);
    } else {
      fetchUserData();
    }
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSave = () => {
    localStorage.setItem(localKey, JSON.stringify(userData));
    setIsEditing(false);
  };

  const avatarUrl = `https://i.pravatar.cc/150?img=${userId}`;

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error}</div>;

  return (
    <div className="profile-page">
      <h2>Профиль пользователя</h2>
      <img src={avatarUrl} alt="Аватар пользователя" className="avatar" />
      <div><strong>ID пользователя:</strong> {userId}</div>
      <div>
        <label>Имя:
          {isEditing ? (
            <input type="text" name="name" value={userData.name} onChange={handleChange} />
          ) : (<span> {userData.name}</span>)}
        </label>
      </div>
      <div>
        <label>Email:
          {isEditing ? (
            <input type="email" name="email" value={userData.email} onChange={handleChange} />
          ) : (<span> {userData.email}</span>)}
        </label>
      </div>
      <div>
        <label>Телефон:
          {isEditing ? (
            <input type="text" name="phone" value={userData.phone} onChange={handleChange} />
          ) : (<span> {userData.phone}</span>)}
        </label>
      </div>
      <div className="profile-actions">
        {isEditing ? (
          <button onClick={handleSave} className="save-button">Сохранить</button>
        ) : (
          <button onClick={() => setIsEditing(true)} className="edit-button">Редактировать</button>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
