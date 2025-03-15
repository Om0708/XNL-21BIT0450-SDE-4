import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [formData, setFormData] = useState({ amount: '', type: 'income', description: '', date: '' });

  // Fetch transactions on component mount
  useEffect(() => {
    axios.get('http://localhost:5000/api/transactions')
      .then(res => setTransactions(res.data))
      .catch(err => console.error("Error fetching transactions:", err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        amount: parseFloat(formData.amount),
        type: formData.type, // Ensure it matches enum values in the database
        description: formData.description,
        date: formData.date,
        userId: localStorage.getItem('userId'), // Assuming you store userId in localStorage
      };

      const res = await axios.post('http://localhost:5000/api/transactions', payload);
      setTransactions([...transactions, res.data]);
      setFormData({ amount: '', type: 'income', description: '', date: '' });
      alert('Transaction added successfully!');
    } catch (err) {
      console.error("Transaction failed:", err.response?.data || err.message);
      alert("Transaction failed!");
    }
  };

  return (
    <div className="form-card">
      <h2>Transactions</h2>

      {/* Transaction Form */}
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Amount"
          value={formData.amount}
          onChange={e => setFormData({ ...formData, amount: e.target.value })}
          required
        />
        <select
          value={formData.type}
          onChange={e => setFormData({ ...formData, type: e.target.value })}
          required
        >
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <input
          type="text"
          placeholder="Description"
          value={formData.description}
          onChange={e => setFormData({ ...formData, description: e.target.value })}
          required
        />
        <input
          type="date"
          value={formData.date}
          onChange={e => setFormData({ ...formData, date: e.target.value })}
          required
        />
        <button type="submit">Add Transaction</button>
      </form>

      <hr />

      {/* Transaction List */}
      <ul>
        {transactions.map(txn => (
          <li key={txn._id}>
            <strong>{txn.type}</strong> - ₹{txn.amount} | {txn.description} | {txn.date}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Transactions;