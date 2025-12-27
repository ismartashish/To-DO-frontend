import React from "react";
import "./TodoItem.css";

function TodoItem({ todo, onToggle, onEdit, onDelete }) {
  return (
    <div className={`todo-card ${todo.completed ? "done" : ""}`}>
      
      {/* TOP ROW */}
      <div className="todo-top">
        <label className="todo-check">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggle(todo)}
          />
          <span className="checkmark"></span>
        </label>

        <div className="todo-text">
          <h4>{todo.task}</h4>
          {todo.deadline && (
            <p className="todo-date">
              📅 {new Date(todo.deadline).toLocaleDateString()}
            </p>
          )}
        </div>

        <span className={`priority ${todo.priority}`}>
          {todo.priority}
        </span>
      </div>

      {/* ACTIONS */}
      <div className="todo-actions">
        <button className="edit-btn" onClick={() => onEdit(todo)}>
          ✏️ Edit
        </button>
        <button className="delete-btn" onClick={() => onDelete(todo._id)}>
          ❌ Delete
        </button>
      </div>
    </div>
  );
}

export default TodoItem;
