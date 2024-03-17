import React from 'react'
import './App.css';
import {  Route, Routes } from 'react-router-dom';
import Register from './Pages/Register/Register'
import Login from './Pages/Login/Login';
import Home from './Pages/Home/Home';

function App() {
  return (
    <div className="app">
        <Routes>
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="/" element={<Home />} />
        </Routes>
    </div>
  );
}

export default App;
