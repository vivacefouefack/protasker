
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Task from './pages/tasks/Task';
import Dashboard from './pages/dashboard/Dashboard';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Navbar from './components/navbar/Navbar';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Task />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
