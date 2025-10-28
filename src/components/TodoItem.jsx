import React from 'react';
import './TodoItem.css';

function TodoItem({ todo, onUpdate, onDelete }) {
  const handleToggle = () => {
    onUpdate(todo._id, { ...todo, completed: !todo.completed });
  };

  const getDeadlineStatus = () => {
    if (!todo.deadline) return null;
    
    const deadline = new Date(todo.deadline);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (deadline < today) return 'overdue';
    if (deadline.getTime() === today.getTime()) return 'today';
    
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    if (deadline.getTime() === tomorrow.getTime()) return 'tomorrow';
    
    return 'upcoming';
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const deadlineStatus = getDeadlineStatus();
  const priorityEmoji = {
    high: '🔴',
    medium: '🟡',
    low: '🟢',
  };

  return (
    <div className={`todo-item ${todo.completed ? 'completed-item' : ''}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={handleToggle}
        className="todo-checkbox"
      />
      
      <div className="todo-content">
        <span className={`todo-text ${todo.completed ? 'completed' : ''}`}>
          {todo.task}
        </span>
        
        <div className="todo-meta">
          {todo.priority && (
            <span className={`priority-badge priority-${todo.priority}`}>
              {priorityEmoji[todo.priority]} {todo.priority}
            </span>
          )}
          
          {todo.deadline && (
            <span className={`deadline-badge deadline-${deadlineStatus}`}>
              📅 {formatDate(todo.deadline)}
              {deadlineStatus === 'today' && ' (Today)'}
              {deadlineStatus === 'tomorrow' && ' (Tomorrow)'}
              {deadlineStatus === 'overdue' && ' (Overdue)'}
            </span>
          )}
        </div>
      </div>
      
      <button 
        onClick={() => onDelete(todo._id)}
        className="delete-btn"
        title="Delete task"
      >
        Delete
      </button>
    </div>
  );
}

export default TodoItem;
