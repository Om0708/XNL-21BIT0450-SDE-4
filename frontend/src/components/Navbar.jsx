import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={{ padding: '10px', backgroundColor: '#f2f2f2' }}>
      <Link to="/home" style={{ margin: '0 10px' }}>Home</Link>
      <Link to="/register" style={{ margin: '0 10px' }}>Register</Link>
      <Link to="/login" style={{ margin: '0 10px' }}>Login</Link>
      <Link to="/transactions" style={{ margin: '0 10px' }}>Transactions</Link>
      <Link to="/add" style={{ margin: '0 10px' }}>Add Transaction</Link>
    </nav>
  );
};

export default Navbar;