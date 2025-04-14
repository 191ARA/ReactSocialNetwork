import { useState } from 'react';
import { getUsers } from '../api/api';
import { useEffect } from 'react';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import ErrorMessage from '../components/ui/ErrorMessage';
import './MessagesPage.css';

const MessagesPage = () => {
  const [conversations, setConversations] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeConversation, setActiveConversation] = useState(null);
  const [messageText, setMessageText] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const usersData = await getUsers();
        setUsers(usersData);
        
        // Создаем фейковые беседы
        const fakeConversations = usersData.slice(0, 5).map(user => ({
          id: user.id,
          userId: user.id,
          lastMessage: `Hello from ${user.name}`,
          time: `${Math.floor(Math.random() * 24)}h ago`,
          unread: Math.random() > 0.5
        }));
        
        setConversations(fakeConversations);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSendMessage = () => {
    if (!messageText.trim() || !activeConversation) return;
    

    alert(`Message sent to user ${activeConversation}: ${messageText}`);
    setMessageText('');
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="messages-page">
      <div className="conversations-list">
        <div className="messages-header">
          <h2>Messages</h2>
          <button className="new-message-btn">+ New Message</button>
        </div>
        
        <div className="search-bar">
          <input type="text" placeholder="Search messages..." />
        </div>
        
        <div className="conversations">
          {conversations.map(conv => {
            const user = users.find(u => u.id === conv.userId);
            return (
              <div 
                key={conv.id} 
                className={`conversation ${conv.unread ? 'unread' : ''} ${activeConversation === conv.id ? 'active' : ''}`}
                onClick={() => setActiveConversation(conv.id)}
              >
                <div className="avatar">
                  {user?.name.charAt(0)}
                </div>
                <div className="conversation-info">
                  <div className="conversation-header">
                    <span className="name">{user?.name}</span>
                    <span className="time">{conv.time}</span>
                  </div>
                  <p className="last-message">{conv.lastMessage}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      <div className="conversation-view">
        {activeConversation ? (
          <div className="active-conversation">
            <div className="conversation-header">
              {users.find(u => u.id === activeConversation) && (
                <div className="user-info">
                  <div className="avatar">
                    {users.find(u => u.id === activeConversation).name.charAt(0)}
                  </div>
                  <h3>{users.find(u => u.id === activeConversation).name}</h3>
                </div>
              )}
            </div>
            
            <div className="messages-container">
              <div className="message received">
                <p>Hey there! How are you doing?</p>
                <span className="time">10:30 AM</span>
              </div>
              <div className="message sent">
                <p>I'm good, thanks! How about you?</p>
                <span className="time">10:32 AM</span>
              </div>
            </div>
            
            <div className="message-input">
              <input 
                type="text" 
                placeholder="Type a message..." 
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <button 
                className="send-btn"
                onClick={handleSendMessage}
              >
                Send
              </button>
            </div>
          </div>
        ) : (
          <div className="no-conversation">
            <p>Select a conversation to start chatting</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagesPage;