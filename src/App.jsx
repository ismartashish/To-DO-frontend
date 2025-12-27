import { useEffect, useState } from "react";
import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from "./api/todo";

import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import ThemeToggle from "./components/ThemeToggle";
import { useAuth } from "./context/AuthContext";
import "./App.css";

function App() {
  const { user, logout } = useAuth();
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    if (user) fetchTodos();
  }, [user]);

  const fetchTodos = async () => {
    const res = await getTodos();
    setTodos(res.data);
  };

  const addTodo = async (data) => {
    const res = await createTodo(data);
    setTodos([res.data, ...todos]);
  };

  const update = async (id, data) => {
    const res = await updateTodo(id, data);
    setTodos(todos.map(t => (t._id === id ? res.data : t)));
  };

  const remove = async (id) => {
    await deleteTodo(id);
    setTodos(todos.filter(t => t._id !== id));
  };

  const completed = todos.filter(t => t.completed).length;

  return (
    <div className="lux-bg">
      <div className="lux-card">

        {/* HEADER */}
        <header className="lux-header">
          <div>
            <h1>Tasks</h1>
            <p>{completed}/{todos.length} completed</p>
          </div>
          <ThemeToggle />
        </header>

        {/* STATS */}
        <div className="lux-stats">
          <div className="stat-box">
            <span>Total</span>
            <strong>{todos.length}</strong>
          </div>
          <div className="stat-box accent">
            <span>Done</span>
            <strong>{completed}</strong>
          </div>
        </div>

        {/* FORM */}
        <TodoForm onAdd={addTodo} />

        {/* LIST */}
        <TodoList
          todos={todos}
          onUpdate={update}
          onDelete={remove}
        />

        {/* ACTION BAR */}
        <div className="lux-actions">
          <button className="logout" onClick={logout}>
            Logout
          </button>
        </div>

      </div>
    </div>
  );
}

export default App;
