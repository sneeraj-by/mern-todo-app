import React from "react";
import { FaRegEdit } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { updateTodo } from "../api/apiRoutes";
import { notify } from "../utils/notify";

const TodoList = ({
  todos,
  error,
  handleEditClick,
  handleDeleteClick,
  setTodos,
}) => {
  const setCurrentTodo = (todoId, updatedCompletedStatus) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo._id === todoId
          ? { ...todo, completed: updatedCompletedStatus }
          : todo
      )
    );
  };
  const handleTodoSelection = async (todoId) => {
    const currentTodo = todos.find((todo) => todo._id === todoId);
    if (!currentTodo) return;

    const updatedCompletedStatus = !currentTodo.completed;
    setCurrentTodo(todoId, updatedCompletedStatus);

    try {
      await updateTodo(todoId, { completed: updatedCompletedStatus });
    } catch (error) {
      setCurrentTodo(todoId, updatedCompletedStatus);
      notify("Error completing todo", "error");
    }
  };

  return (
    <div>
      {todos.length === 0 || error ? (
        <div className="flex items-center justify-center container mx-auto p-4 max-w-lg">
          <p>No todos found.</p>
        </div>
      ) : (
        todos.map((todo) => (
          <li key={todo._id} className="bg-white shadow-md rounded p-4 mb-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <input
                  className="cursor-pointer h-4 w-4 mt-1"
                  id={todo._id}
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleTodoSelection(todo._id)}
                />
                <h2
                  className={`text-xl font-semibold ${
                    todo.completed && "line-through"
                  }`}
                >
                  {todo.title}
                </h2>
              </div>
              <div className="flex items-center">
                <button
                  className="cursor-pointer flex items-center mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 text-sm rounded-xs"
                  onClick={() => handleEditClick(todo._id)}
                >
                  <FaRegEdit className="" size={16} />
                </button>
                <button
                  className="cursor-pointer flex items-center bg-red-500 hover:bg-red-700  text-white font-bold p-2 text-sm rounded-xs"
                  onClick={() => handleDeleteClick(todo._id)}
                >
                  <FaRegTrashCan className="" size={16} />
                </button>
              </div>
            </div>
            <div className="flex items-center">
              <span
                className={`inline-block px-1.5 py-0.5 text-[8px] font-semibold rounded-full ${
                  todo.completed
                    ? "bg-green-600 text-white"
                    : "bg-yellow-400 text-black"
                }`}
              >
                {todo.completed ? "Completed" : "Pending"}
              </span>
            </div>
            <div className="flex justify-between mt-2 text-xs text-gray-500">
              <span>
                Last updated: {new Date(todo.updatedAt).toLocaleDateString()}
              </span>
              <span>
                Created: {new Date(todo.createdAt).toLocaleDateString()}
              </span>
            </div>
          </li>
        ))
      )}
    </div>
  );
};

export default TodoList;
