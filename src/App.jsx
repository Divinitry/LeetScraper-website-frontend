import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./pages/Home";
import Code from "./pages/Code";
import ToDoList from "./pages/ToDoList";
import Search from "./pages/Search";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";
import Layout from "./components/Layout";
import api from './api.js'

function Logout() {
  localStorage.clear();
  return <Navigate to="/login" />;
}

function RegisterAndLogout() {
  localStorage.clear();
  return (<Register />);
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await api.get('/leetscraper/api/check-login/', {
          withCredentials: true, 
        });
        setIsLoggedIn(response.data.is_logged_in);
      } catch (error) {
        console.error("Error checking login status:", error);
        setIsLoggedIn(false);
      }
    };

    checkLoginStatus();
  }, []);

  return (
    <div className="pb-1">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout isLoggedIn={isLoggedIn}><Home /></Layout>} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/register" element={<RegisterAndLogout />} />
          
          <Route path="/search" element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Layout isLoggedIn={isLoggedIn}><Search /></Layout>
            </ProtectedRoute>
          } />
          
          <Route path="/todolist" element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Layout isLoggedIn={isLoggedIn}><ToDoList /></Layout>
            </ProtectedRoute>
          } />
          
          <Route path="/todolist/code/:id" element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Layout isLoggedIn={isLoggedIn}><Code /></Layout>
            </ProtectedRoute>
          } />

          <Route path="*" element={<Layout isLoggedIn={isLoggedIn}><NotFound /></Layout>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
