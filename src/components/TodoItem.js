// src/components/TodoItem.js
import React from "react";

const TodoItem = ({ todo }) => {
  return (
    <li>
      <input type="checkbox" checked={todo.completed} readOnly />
      <span>{todo.text}</span>
      <button>Delete</button>
    </li>
  );
};

export default TodoItem;
