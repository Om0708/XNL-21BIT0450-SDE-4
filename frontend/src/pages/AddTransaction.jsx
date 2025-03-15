import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddTransaction() {
  const [formData, setFormData] = useState({
    amount: '',
    description: '',
    type: '',
    date: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userId = localStorage.getItem('userId'); // ✅ Get userId
    if (!userId) {
      alert('User ID not found. Please log in again.');
      navigate('/login');
      return;
    }

    try {
      const payload = {
        amount: parseFloat(formData.amount),
        description: formData.description,
        type: formData.type.toLowerCase(),
        date: formData.date,
        userId: userId,
      };

      await axios.post('http://localhost:5000/api/transactions', payload);

      alert('✅ Transaction added successfully!');
      setFormData({
        amount: '',
        description: '',
        type: '',
        date: '',
      }); // reset form
      navigate('/home');
    } catch (error) {
      console.error('🚨 Error adding transaction:', error.response?.data || error.message);
      alert('❌ Failed to add transaction');
    }
  };

  return (
    <div className="form-container">
      <h2>Add Transaction</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={formData.amount}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <label>Type:</label>
        <select name="type" value={formData.type} onChange={handleChange} required>
          <option value="">--Select Type--</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />

        <button type="submit">Add Transaction</button>
      </form>
    </div>
  );
}

export default AddTransaction;