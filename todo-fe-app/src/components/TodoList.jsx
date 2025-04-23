import React from "react";
import { FaRegEdit } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";

const TodoList = ({ todos, error, handleEditClick, handleDeleteClick }) => {
  // if (todos.length === 0)
  //   return (
  //     <div className="flex items-center justify-center container mx-auto p-4 max-w-lg">
  //       <p>No todos found.</p>
  //     </div>
  //   );
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
              <div>
                <h2 className="text-xl font-semibold">{todo.title}</h2>
                <div className="flex items-center space-x-2 mt-0.5">
                  <input
                    id={todo._id}
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => console.log("Checkbox clicked")}
                  />
                  <span
                    className={`inline-block px-1.5 py-0.5 text-[8px] font-semibold rounded-full ${
                      todo.completed
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-400 text-black"
                    }`}
                  >
                    {todo.completed ? "Completed" : "Pending"}
                  </span>
                </div>
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
          </li>
        ))
      )}
    </div>
  );
};

export default TodoList;
