import React, { useState, useEffect, useRef } from 'react';
import { getTodos, createTodo, updateTodo, deleteTodo } from './api';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import ThemeToggle from './components/ThemeToggle';
import { useAuth } from './context/AuthContext';
import './App.css';

const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed,
};
const FILTER_NAMES = Object.keys(FILTER_MAP);

const TODO_QUOTES = [
  "✨ Focus on what matters most today",
  "🚀 One task at a time, unstoppable progress",
  "💪 Small steps lead to big achievements",
  "🎯 Plan today, succeed tomorrow",
  "⚡ Every check mark is a victory",
  "🌟 Done is better than perfect",
  "📝 Your tasks, your rules, your success"
];

function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('All');
  const [quote, setQuote] = useState(TODO_QUOTES[0]);
  const { user, logout } = useAuth();
  const todoListRef = useRef(null);

  // Fetch todos when user is logged in
  useEffect(() => {
    if (user?.token) {
      fetchTodos();
      setQuote(TODO_QUOTES[Math.floor(Math.random() * TODO_QUOTES.length)]);
    }
  }, [user]);

  // Fetch todos from backend with token
  const fetchTodos = async () => {
    try {
      const response = await getTodos(user.token);
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
      if (error.response?.status === 401) logout();
    }
  };

  // Add a todo
  const handleAddTodo = async ({ task, deadline, priority }) => {
    if (!task.trim()) return;

    try {
      const response = await createTodo({ task, deadline, priority }, user.token);
      setTodos([response.data, ...todos]);

      // Smooth scroll to top
      setTimeout(() => {
        if (todoListRef.current) todoListRef.current.scrollTop = 0;
      }, 150);
    } catch (error) {
      console.error('Error adding todo:', error);
      if (error.response?.status === 401) logout();
    }
  };

  // Update a todo
  const handleUpdateTodo = async (id, updatedTodo) => {
    try {
      const response = await updateTodo(id, updatedTodo, user.token);
      setTodos(todos.map((todo) => (todo._id === id ? response.data : todo)));
    } catch (error) {
      console.error('Error updating todo:', error);
      if (error.response?.status === 401) logout();
    }
  };

  // Delete a todo
  const handleDeleteTodo = async (id) => {
    try {
      await deleteTodo(id, user.token);
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
      if (error.response?.status === 401) logout();
    }
  };

  const filteredTodos = todos.filter(FILTER_MAP[filter]);

  return (
    <>
      <ThemeToggle />
      <div className="app-container">
        <div className="todo-wrapper">
          {/* Header */}
          <div className="header-top">
            <div className="logo-section">
              <span className="todo-emoji" title="Your Todo list">📝</span>
              <h1 className="app-title">TODO</h1>
            </div>
            <p className="creator-credit">
              Made with <span className="heart-icon">❤️</span> by Ashish Jha
            </p>
          </div>

          {/* Quote */}
          <div className="quote-section">
            <p className="quote-text">{quote}</p>
          </div>

          {/* Auth Info */}
          {user && (
            <div className="header-section">
              <div className="user-info">
                <span>Welcome, {user.name}!</span>
                <button onClick={logout} className="logout-btn">Logout</button>
              </div>
            </div>
          )}

          {/* Todo Form */}
          {user && <TodoForm onAdd={handleAddTodo} token={user.token} />}

          {/* Filter Buttons */}
          <div className="filter-buttons">
            {FILTER_NAMES.map((name) => (
              <button
                key={name}
                className={`filter-btn ${filter === name ? 'active' : ''}`}
                onClick={() => setFilter(name)}
              >
                {name}
              </button>
            ))}
          </div>

          {/* Todo List */}
          <div className="todo-list" ref={todoListRef}>
            <TodoList
              todos={filteredTodos}
              onUpdate={handleUpdateTodo}
              onDelete={handleDeleteTodo}
            />
          </div>

          {/* Stats */}
          <div className="todo-stats">
            <span>
              {filteredTodos.length} {filteredTodos.length === 1 ? 'task' : 'tasks'} {filter.toLowerCase()}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
