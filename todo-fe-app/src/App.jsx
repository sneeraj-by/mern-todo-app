import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Login from "./components/Login";
import Navbar from "./components/Navbar";
import TodoPage from "./components/TodoPage";
import Home from "./module/Home";
import { AuthContextProvider } from "./context/AuthContextProvider";
import "./App.css";

function App() {
  return (
    <div className="h-screen">
      <AuthContextProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/todo" element={<TodoPage />} />
            <Route path="/home" element={<Home />} />
          </Routes>
          <ToastContainer />
        </BrowserRouter>
      </AuthContextProvider>
    </div>
  );
}

export default App;
