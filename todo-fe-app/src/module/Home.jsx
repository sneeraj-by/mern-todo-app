import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";

import TodoForm from "./TodoForm"
import TodoList from "./TodoList";
import { getTodos, addTodo, updateTodo, deleteTodo } from "./api";

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [editingTodo, setEditingTodo] = useState(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const response = await getTodos();
    setTodos(response.data);
  };

  const handleAddTodo = async (todo) => {
    const response = await addTodo(todo);
    setTodos([...todos, response.data]);
  };

  const handleEditTodo = (todo) => {
    setEditingTodo(todo);
  };

  const handleUpdateTodo = async (todo) => {
    const response = await updateTodo(editingTodo.id, todo);
    setTodos(todos.map((t) => (t.id === editingTodo.id ? response.data : t)));
    setEditingTodo(null);
  };

  const handleDeleteTodo = async (id) => {
    await deleteTodo(id);
    setTodos(todos.filter((t) => t.id !== id));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl mb-4">Todo App</h1>
      <TodoForm onSubmit={editingTodo ? handleUpdateTodo : handleAddTodo} />
      <TodoList
        todos={todos}
        onEdit={handleEditTodo}
        onDelete={handleDeleteTodo}
      />
      <ToastContainer />
    </div>
  );
};

export default Home;
