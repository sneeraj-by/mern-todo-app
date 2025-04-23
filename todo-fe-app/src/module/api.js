import axios from "axios";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/todos",
});

export const getTodos = () => api.get("/");
export const addTodo = (todo) => api.post("/", todo);
export const updateTodo = (id, todo) => api.put(`/${id}`, todo);
export const deleteTodo = (id) => api.delete(`/${id}`);
