import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import ThemeToggle from "./ThemeToggle";
import api from "../services/api";
import TodoList from "./TodoList";
import "./TodoForm.css";

/* ================= DAILY FOCUS ================= */
function DailyFocus({ todos }) {
  const focusTodos = todos.filter((t) => t.isFocus);

  if (!focusTodos.length) return null;

  return (
    <div className="focus-box">
      <h3>🎯 Today’s Focus</h3>
      {focusTodos.map((t) => (
        <p key={t._id}>{t.task}</p>
      ))}
    </div>
  );
}

/* ================= PROGRESS RING ================= */
function ProgressRing({ percent }) {
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <div className="progress-ring">
      <svg width="120" height="120">
        <circle
          cx="60"
          cy="60"
          r={radius}
          className="ring-bg"
        />
        <circle
          cx="60"
          cy="60"
          r={radius}
          className="ring-progress"
          style={{ strokeDashoffset: offset }}
        />
      </svg>
      <span>{percent}%</span>
    </div>
  );
}

function TodoForm() {
  const { user } = useAuth();

  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("medium");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editTodoId, setEditTodoId] = useState(null);

  /* ================= FETCH ================= */
  useEffect(() => {
    if (!user) return;

    const fetchTodos = async () => {
      try {
        const res = await api.get("/todo");
        setTodos(res.data || []);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch todos");
      }
    };

    fetchTodos();
  }, [user]);

  /* ================= ADD / UPDATE ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const payload = {
        task: title,
        deadline: dueDate || undefined,
        priority,
      };

      let res;
      if (editTodoId) {
        res = await api.put(`/todo/${editTodoId}`, payload);
        setTodos((prev) =>
          prev.map((t) => (t._id === editTodoId ? res.data : t))
        );
        setEditTodoId(null);
      } else {
        res = await api.post("/todo", payload);
        setTodos((prev) => [res.data, ...prev]);
      }

      setTitle("");
      setDueDate("");
      setPriority("medium");
    } catch (err) {
      console.error(err);
      setError("Failed to save todo");
    } finally {
      setLoading(false);
    }
  };

  /* ================= TOGGLE ================= */
  const handleToggle = async (todo) => {
    try {
      const res = await api.put(`/todo/${todo._id}`, {
        completed: !todo.completed,
      });

      setTodos((prev) =>
        prev.map((t) => (t._id === todo._id ? res.data : t))
      );
    } catch {
      setError("Failed to update todo");
    }
  };

  /* ================= DELETE ================= */
  const handleDelete = async (id) => {
    try {
      await api.delete(`/todo/${id}`);
      setTodos((prev) => prev.filter((t) => t._id !== id));
    } catch {
      setError("Failed to delete todo");
    }
  };

  /* ================= EDIT ================= */
  const handleEdit = (todo) => {
    setTitle(todo.task);
    setDueDate(todo.deadline?.split("T")[0] || "");
    setPriority(todo.priority || "medium");
    setEditTodoId(todo._id);
  };

  /* ================= STATS ================= */
  const doneCount = todos.filter((t) => t.completed).length;
  const percent =
    todos.length === 0
      ? 0
      : Math.round((doneCount / todos.length) * 100);

  return (
    <div className="todo-container">
      <ThemeToggle />

      {/* HEADER */}
      <div className="todos-header">
        <div>
          <h2>Your Todos</h2>
          <p className="todos-subtitle">Plan smart. Execute better.</p>
        </div>

        <div className="todos-stats">
          <div className="stat-box">
            <span>Total</span>
            <strong>{todos.length}</strong>
          </div>
          <div className="stat-box done">
            <span>Done</span>
            <strong>{doneCount}</strong>
          </div>
        </div>
      </div>

      {/* PROGRESS + FOCUS */}
      <div className="focus-progress-row">
        <ProgressRing percent={percent} />
        <DailyFocus todos={todos} />
      </div>

      {error && <p className="error-message">{error}</p>}

      {/* FORM */}
      <form onSubmit={handleSubmit} className="todo-form premium-form">
        <input
          className="todo-input big-input"
          placeholder="What needs to be done?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <div className="row-inputs">
          <input
            className="todo-input"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />

          <select
            className="todo-input"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <button className="primary-btn" disabled={loading}>
          {loading ? "Saving..." : editTodoId ? "Update Todo" : "Add Todo"}
        </button>
      </form>

      {/* LIST */}
      <TodoList
        todos={todos}
        onToggle={handleToggle}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default TodoForm;
