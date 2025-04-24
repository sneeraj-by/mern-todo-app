import React from "react";

const Modal = ({ onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-md">
        <h2 className="text-lg font-semibold mb-4">Todo Completed</h2>
        <p>Do you want to delete the todo as well?</p>
        <div className="mt-4 flex justify-end">
          <button
            onClick={onCancel}
            className="mr-2 px-4 py-2 bg-gray-300 text-gray-800 rounded cursor-pointer"
          >
            No
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
