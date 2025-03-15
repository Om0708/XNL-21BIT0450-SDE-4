import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        email,
        password,
      });

      if (response.status === 200) {
        const userId = response.data.userId; // just access it directly
        localStorage.setItem('userId', userId); // store in localStorage      
        alert('Login successful!');
        setIsLoggedIn(true);
        navigate('/home');
      }      
    } catch (error) {
      console.error('Login failed:', error.response?.data || error.message);
      alert('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="form-card">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>
        <div className="switch-link">
          Don't have an account?
          <a href="/register"> Register</a>
        </div>
      </form>
    </div>
  );
};

export default Login;