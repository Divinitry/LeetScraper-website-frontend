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
import Layout from "./components/Layout";

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
    <div className="pb-1">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/register" element={<RegisterAndLogout />} />
          
          <Route path="/search" element={
            <ProtectedRoute>
              <Layout><Search /></Layout>
            </ProtectedRoute>
          } />
          
          <Route path="/todolist" element={
            <ProtectedRoute>
              <Layout><ToDoList /></Layout>
            </ProtectedRoute>
          } />
          
          <Route path="/todolist/code/:id" element={
            <ProtectedRoute>
              <Layout><Code /></Layout>
            </ProtectedRoute>
          } />

          <Route path="*" element={<Layout><NotFound /></Layout>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;