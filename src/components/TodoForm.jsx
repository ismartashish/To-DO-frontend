import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import ThemeToggle from './ThemeToggle';
import './TodoForm.css';

function TodoForm() {
  const { user } = useAuth();
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('medium');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [editTodoId, setEditTodoId] = useState(null);

  useEffect(() => {
    if (!user) return;
    const fetchTodos = async () => {
      try {
        const response = await axios.get('https://ismartashish.github.io/To-DO-backend/api/todos', {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setTodos(response.data);
      } catch (err) {
        console.error('Error fetching todos:', err);
        setError(err.response?.data?.message || 'Failed to fetch todos');
      }
    };
    fetchTodos();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const payload = { task: title, deadline: dueDate, priority };

      let response;
      if (editTodoId) {
        response = await axios.put(
          `https://ismartashish.github.io/To-DO-backend/api/todos/${editTodoId}`,
          payload,
          { headers: { Authorization: `Bearer ${user.token}` } }
        );
        setEditTodoId(null);
        setTodos(todos.map((t) => (t._id === editTodoId ? response.data : t)));
      } else {
        response = await axios.post('https://ismartashish.github.io/To-DO-backend/api/todos', payload, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setTodos([response.data, ...todos]);
      }

      setTitle('');
      setDueDate('');
      setPriority('medium');
    } catch (err) {
      console.error('Error adding/updating todo:', err);
      setError(err.response?.data?.message || 'Failed to add/update todo');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://ismartashish.github.io/To-DO-backend/api/todos/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setTodos(todos.filter((t) => t._id !== id));
    } catch (err) {
      console.error('Error deleting todo:', err);
      setError(err.response?.data?.message || 'Failed to delete todo');
    }
  };

  const handleToggle = async (todo) => {
    try {
      const response = await axios.put(
        `https://ismartashish.github.io/To-DO-backend/api/todos/${todo._id}`,
        { completed: !todo.completed },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setTodos(todos.map((t) => (t._id === todo._id ? response.data : t)));
    } catch (err) {
      console.error('Error toggling todo:', err);
      setError(err.response?.data?.message || 'Failed to update todo');
    }
  };

  const handleEdit = (todo) => {
    setTitle(todo.task);
    setDueDate(todo.deadline ? todo.deadline.split('T')[0] : '');
    setPriority(todo.priority || 'medium');
    setEditTodoId(todo._id);
  };

  return (
    <div className="todo-container">
      <ThemeToggle />

      <h2 className="todo-header">Your Todos</h2>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit} className="todo-form">
        <input
          type="text"
          placeholder="Enter task..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="todo-input"
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="todo-input"
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="todo-input"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <button type="submit" className="todo-btn" disabled={loading}>
          {loading ? (editTodoId ? 'Updating...' : 'Adding...') : editTodoId ? 'Update Todo' : 'Add Todo'}
        </button>
      </form>

      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo._id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
            <div className="todo-info">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggle(todo)}
              />
              <span className="todo-task">{todo.task}</span>
              {todo.deadline && (
                <span className="todo-deadline">{new Date(todo.deadline).toLocaleDateString()}</span>
              )}
              <span className={`todo-priority ${todo.priority}`}>{todo.priority}</span>
            </div>
            <div className="todo-actions">
              <button onClick={() => handleEdit(todo)} className="edit-btn">
                ✏️
              </button>
              <button onClick={() => handleDelete(todo._id)} className="delete-btn">
                ❌
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoForm;
