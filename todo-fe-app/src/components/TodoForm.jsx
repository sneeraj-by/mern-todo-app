import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaRegSave } from "react-icons/fa";
import { MdClose } from "react-icons/md";

const TodoForm = ({ todos, onClose, editingTodoId, onSubmit }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (editingTodoId !== null && editingTodoId !== undefined) {
      const todoToEdit = todos.find((todo) => todo._id === editingTodoId);
      if (todoToEdit) {
        reset({ title: todoToEdit.title });
      }
    }
  }, [editingTodoId, todos, reset]);

  const submitHandler = (data) => {
    onSubmit(data);
    reset();
  };

  return (
    <div className="max-w-lg mx-auto mt-10">
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="bg-white shadow-md rounded p-4"
      >
        <div className="flex mb-1">
          <input
            {...register("title", { required: "Title is required" })}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.title ? "border-red-500" : ""
            }`}
            id="title"
            name="title"
            type="text"
            placeholder="Your todo title"
          />
          <button
            type="submit"
            className="ml-2 flex items-center bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-3 text-sm rounded-xs cursor-pointer"
          >
            <FaRegSave size={16} />
          </button>
          <button
            type="submit"
            className="ml-2 flex items-center bg-red-500 hover:bg-red-700  text-white font-bold py-2 px-3 text-sm rounded-xs cursor-pointer"
            onClick={onClose}
          >
            <MdClose size={16} />
          </button>
        </div>
        {errors.title && (
          <p className="text-red-500 text-xs italic">{errors.title.message}</p>
        )}
      </form>
    </div>
  );
};

export default TodoForm;
