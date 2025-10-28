import React from 'react';
import TodoItem from './TodoItem';

function TodoList({ todos, onUpdate, onDelete }) {
  if (!todos.length) {
    return <p>No tasks yet. Add one!</p>;
  }
  return (
    <>
      {todos.map((todo) => (
        <TodoItem
          key={todo._id}
          todo={todo}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </>
  );
}
export default TodoList;
