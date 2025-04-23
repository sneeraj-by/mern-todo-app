import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const TodoItem = ({ todo, onEdit, onDelete }) => {
  return (
    <div className="flex justify-between items-center p-2 border-b">
      <span>{todo.title}</span>
      <div className="flex space-x-2">
        <FaEdit
          onClick={() => onEdit(todo)}
          className="cursor-pointer text-blue-500"
        />
        <FaTrash
          onClick={() => onDelete(todo.id)}
          className="cursor-pointer text-red-500"
        />
      </div>
    </div>
  );
};

export default TodoItem;
