import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Code from './pages/Code';
import ToDoList from './pages/ToDoList';
import backgroundImage from './assets/colour-streaks.webp';
import Search from './pages/Search';
import AccountPage from './pages/AccountPage'
import './App.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-cover bg-center" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <Routes>
          <Route path='/' element={<Home />} />

          <Route path='/account/:action' element={<AccountPage />} />
          <Route path='/account/:action/key/:key' element={<AccountPage />} />

          <Route path='/search' element={<Search />} />
          <Route path='/todolist' element={<ToDoList />} />
          <Route path='/todolist/code/:code' element={<Code />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
