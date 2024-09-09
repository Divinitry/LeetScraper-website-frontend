import { useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Code from "./pages/Code";
import ToDoList from "./pages/ToDoList";
import backgroundImage from "./assets/colour-streaks.webp";
import Search from "./pages/Search";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";

function Logout() {
  localStorage.clear();
  return <Navigate to="/login" />;
}

function RegisterAndLogout() {
  localStorage.clear();
  return(<Register />);
}

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/login" element={<Login />}/>
          <Route path="/logout" element={<Logout />}/>
          <Route path="/register" element={<RegisterAndLogout />}/>
          <Route path="/search" element={
            <ProtectedRoute>
              <Search />
            </ProtectedRoute>
            } />
          <Route path="/todolist" element={
            <ProtectedRoute>
              <ToDoList />
            </ProtectedRoute>
            } />
          <Route path="/todolist/code/:id" element={
            <ProtectedRoute>
              <Code />
            </ProtectedRoute>
            } />
          <Route path="*" element={<NotFound />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
