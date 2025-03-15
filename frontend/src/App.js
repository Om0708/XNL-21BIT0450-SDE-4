import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Home from './pages/Home';
import Transactions from './pages/Transactions';
import AddTransaction from './pages/AddTransaction';
import './App.css';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
    window.location.href = '/'; // redirect to homepage
  };

  return (
    <div className="page-container">
      <Router>
        <nav>
          <Link to="/">Home</Link>
          {!isLoggedIn && <Link to="/register">Register</Link>}
          {!isLoggedIn && <Link to="/login">Login</Link>}
          {isLoggedIn && <Link to="/transactions">Transactions</Link>}
          {isLoggedIn && (
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          )}
        </nav>

        <div className="content-container">
          <Routes>
            <Route
              path="/"
              element={
                <div className="welcome-message">
                  <h1>Welcome to the XNL Portal</h1>
                  <p>Please login or register to access your dashboard.</p>
                </div>
              }
            />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/transactions" element={isLoggedIn ? <Transactions /> : <div>Please login to access Transactions</div>} />
            <Route path="/home" element={isLoggedIn ? <Home /> : <div>Please login to access Home</div>} />
            <Route path="/add" element={isLoggedIn ? <AddTransaction /> : <div>Please login to add a transaction</div>} />
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default App;