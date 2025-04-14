import { useEffect, useState } from 'react';
import { getTodos, getUsers } from '../api/api';
import TodoItem from '../components/todos/TodoItem';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import ErrorMessage from '../components/ui/ErrorMessage';
import './TodosPage.css';

const TodosPage = () => {
  const [todos, setTodos] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [todosData, usersData] = await Promise.all([
          getTodos(),
          getUsers()
        ]);
        setTodos(todosData);
        setUsers(usersData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getUserById = (userId) => {
    return users.find(user => user.id === userId);
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'completed') return todo.completed;
    if (filter === 'active') return !todo.completed;
    return true;
  });

  const toggleTodo = (todoId) => {
    setTodos(prevTodos => 
      prevTodos.map(todo => 
        todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="todos-page">
      <div className="page-header">
        <h1>Tasks</h1>
        <div className="todos-filter">
          <button 
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button 
            className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
            onClick={() => setFilter('active')}
          >
            Active
          </button>
          <button 
            className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
            onClick={() => setFilter('completed')}
          >
            Completed
          </button>
        </div>
      </div>
      
      <div className="todos-list">
        {filteredTodos.map(todo => {
          const user = getUserById(todo.userId);
          return (
            <TodoItem 
              key={todo.id} 
              todo={todo} 
              user={user} 
              onToggle={() => toggleTodo(todo.id)} 
            />
          );
        })}
      </div>
    </div>
  );
};

export default TodosPage;