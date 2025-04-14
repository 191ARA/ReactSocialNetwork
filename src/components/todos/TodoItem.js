
import './TodoItem.css';

const TodoItem = ({ todo, user, onToggle }) => {
  return (
    <div className="todo-item">
      <input
        type="checkbox"
        className="todo-checkbox"
        checked={todo.completed}
        onChange={onToggle}
      />
      <div className="todo-content">
        <p className={`todo-text ${todo.completed ? 'completed' : ''}`}>
          {todo.title}
        </p>
        {user && (
          <p className="todo-user">User: {user.name}</p>
        )}
      </div>
    </div>
  );
};

export default TodoItem;