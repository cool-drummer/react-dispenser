import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AdminPanel from './components/AdminPanel';
import UserInterface from './components/UserInterface';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/user" element={<UserInterface />} />
          <Route path="/" element={<Navigate to="/user" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;