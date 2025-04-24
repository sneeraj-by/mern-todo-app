import React, { useContext, useState } from "react";

import useTodos from "../hooks/useTodos";
import Loader from "./Loader";
import TodoForm from "./TodoForm";
import { addTodo, deleteTodo, updateTodo } from "../api/apiRoutes";
import TodoList from "./TodoList";
import { AuthContext } from "../context/AuthContextProvider";
import { notify } from "../utils/notify";

const TodoPage = () => {
  const { todos, loading, error, setTodos, setError } = useTodos();
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [isTodoState, setTodoState] = useState(false);
  const { isUserId } = useContext(AuthContext);

  const handleAddTodo = async (data) => {
    try {
      const response = await addTodo({ title: data.title, userId: isUserId });
      setTodos((prevTodos) => [...prevTodos, response.data]);
      setError(null);
      notify("Todo added successfully!", "success");
      handleClose();
    } catch (error) {
      notify("Error submitting form", "error");
      console.error("Error submitting form:", error);
    }
  };

  const handleUpdateTodo = async (data) => {
    if (editingTodoId !== null && editingTodoId !== undefined) {
      const updatedTodos = todos.map((todo) =>
        editingTodoId === todo._id ? { ...todo, title: data.title } : todo
      );
      try {
        await updateTodo(editingTodoId, { title: data.title });
        setTodos(updatedTodos);
        notify("Todo updated successfully!", "success");
        setEditingTodoId(null);
      } catch (error) {
        notify("Error updating todo", "error");
        console.error("Error updating todo:", error);
      }
    }
  };

  const handleEditClick = (id) => {
    setEditingTodoId(id);
  };

  const handleDeleteClick = async (id) => {
    try {
      await deleteTodo(id);
      const updatedTodos = todos.filter((todo) => todo._id !== id);
      setTodos(updatedTodos);
      notify("Todo deleted successfully!", "success");
    } catch (error) {
      notify("Error deleting todo:", "error");
      console.error("Error deleting todo:", error);
    }
  };

  const handleClose = () => {
    setTodoState(false);
    setEditingTodoId(null);
  };

  if (loading)
    return (
      <div className="container mx-auto p-4 max-w-lg">
        <Loader count={1} />
        <Loader count={3} />
      </div>
    );

  return (
    <div className="container mx-auto p-4 max-w-lg">
      <h1 className="text-2xl font-bold mb-4 text-center">My Todos</h1>
      {!editingTodoId ? (
        <ul>
          <TodoList
            todos={todos}
            error={error}
            handleEditClick={handleEditClick}
            handleDeleteClick={handleDeleteClick}
            setTodos={setTodos}
          />
        </ul>
      ) : (
        <TodoForm
          todos={todos}
          editingTodoId={editingTodoId}
          onClose={handleClose}
          onSubmit={handleUpdateTodo}
        />
      )}
      {!isTodoState && !editingTodoId && (
        <button
          onClick={() => setTodoState(true)}
          className="bg-blue-500 hover:bg-blue-700 text-white text-sm font-semibold py-1 px-2 rounded-xs mt-4"
        >
          Add new todo
        </button>
      )}
      {isTodoState && (
        <TodoForm
          todos={todos}
          editingTodoId={editingTodoId}
          onClose={handleClose}
          onSubmit={handleAddTodo}
        />
      )}
    </div>
  );
};

export default TodoPage;
