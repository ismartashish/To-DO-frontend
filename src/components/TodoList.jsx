import React from "react";
import TodoItem from "./TodoItem";

function TodoList({ todos, onToggle, onEdit, onDelete }) {
  if (!todos || todos.length === 0) {
    return <p className="empty-text">No tasks yet ✨</p>;
  }

  return (
    <div className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo._id}
          todo={todo}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default TodoList;
