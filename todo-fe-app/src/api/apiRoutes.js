import apiClient from "./apiClient";

/**
 * Registers a new user by sending user details to the server.
 * @param {Object} userDetails - The details of the user to be registered
 * @returns {Promise} A promise that resolves with the server's response to the registration request
 */
export const userRegistration = (userDetails) =>
  apiClient.post("/users/register", userDetails);
export const userLogin = (userDetails) =>
  apiClient.post("/users/login", userDetails);

export const getTodos = () => apiClient.get("/todos/get_todo");
export const addTodo = (todo) => apiClient.post("/todos/create_todo", todo);
export const updateTodo = (id, todo) =>
  apiClient.put(`/todos/update_todo/${id}`, todo);
export const deleteTodo = (id) => apiClient.delete(`/todos/delete_todo/${id}`);
