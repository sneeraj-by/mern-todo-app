import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const TodoForm = ({ onSubmit }) => {
  const { register, handleSubmit, reset } = useForm();

  const submitHandler = (data) => {
    onSubmit(data);
    reset();
    toast.success("Todo added successfully!");
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="flex space-x-2">
      <input
        {...register("title")}
        className="border p-2"
        placeholder="Add Todo"
      />
      <button type="submit" className="bg-blue-500 text-white p-2">
        Add
      </button>
    </form>
  );
};

export default TodoForm;
