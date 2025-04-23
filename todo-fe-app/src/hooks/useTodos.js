import { useState, useEffect } from "react";
import { getTodos } from "../api/apiRoutes";

const useTodos = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await getTodos();
        setTodos(response.data);
      } catch (err) {
        const errorMsg =
          err.response?.data?.message ||
          err.response?.statusText ||
          "Something went wrong";
        setError(errorMsg);
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  return { todos, loading, error, setTodos, setError };
};

export default useTodos;
