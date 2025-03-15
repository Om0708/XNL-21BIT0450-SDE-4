// src/components/Home.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Home() {
  const [transactions, setTransactions] = useState([]);
  const [analytics, setAnalytics] = useState({
    totalIncome: 0,
    totalExpense: 0,
    balance: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = localStorage.getItem("userId"); // Get logged-in user ID

        // ✅ Fetch user-specific transactions
        const txnRes = await axios.get(`http://localhost:5000/api/transactions?userId=${userId}`);
        setTransactions(txnRes.data);

        // ✅ Fetch user-specific analytics
        const analyticsRes = await axios.get(`http://localhost:5000/api/transactions/analytics/${userId}`);
        setAnalytics(analyticsRes.data);
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{
      background: '#fff',
      padding: '40px',
      borderRadius: '12px',
      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
      textAlign: 'center',
      width: '100%',
      maxWidth: '600px',
      margin: 'auto'
    }}>
      <h2>Welcome to the XNL Fintech Portal</h2>
      <p>Here are your latest transactions:</p>

      {/* 📊 Analytics Summary */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-around',
        marginBottom: '20px',
        padding: '10px 0',
        borderTop: '1px solid #eee',
        borderBottom: '1px solid #eee'
      }}>
        <div>
          <h4 style={{ color: 'green' }}>Income</h4>
          <p>₹{analytics.totalIncome}</p>
        </div>
        <div>
          <h4 style={{ color: 'red' }}>Expense</h4>
          <p>₹{analytics.totalExpense}</p>
        </div>
        <div>
          <h4>Balance</h4>
          <p><strong>₹{analytics.balance}</strong></p>
        </div>
      </div>

      {/* ➕ Add Transaction button */}
      <Link to="/add">
        <button style={{
          padding: '6px 14px',
          fontSize: '14px',
          margin: '10px 0 20px',
          borderRadius: '6px',
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          cursor: 'pointer'
        }}>
          ➕ Add Transaction
        </button>
      </Link>

      {transactions.length === 0 ? (
        <p>No transactions available.</p>
      ) : (
        <ul style={{ textAlign: 'left' }}>
          {transactions.map((txn) => (
            <li key={txn._id || txn.id}>
              💰 <strong>{txn.type}</strong> of ₹{txn.amount} - {txn.description} <br />
              🕒 {txn.date ? new Date(txn.date).toLocaleString('en-IN', {
                dateStyle: 'medium',
                timeStyle: 'short'
              }) : 'Date not available'}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Home;