const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');

// ✅ POST: Add new transaction
router.post('/transactions', async (req, res) => {
  try {
    const { amount, description, type, date, userId } = req.body;

    // Basic Validation
    if (!amount || !description || !type || !date || !userId) {
      return res.status(400).json({ message: 'All fields (amount, description, type, date, userId) are required' });
    }

    const newTransaction = new Transaction({
      amount,
      description,
      type,
      date: new Date(date),
      userId
    });

    const savedTransaction = await newTransaction.save();
    res.status(201).json(savedTransaction);
  } catch (err) {
    console.error('🚨 Error adding transaction:', err.message);
    res.status(500).json({ message: 'Server error while adding transaction' });
  }
});

router.get('/', async (req, res) => {
  const userId = req.query.userId;
  
  if (!userId) {
    return res.status(400).json({ message: 'User ID is required in query params' });
  }

  try {
    const transactions = await Transaction.find({ userId }).sort({ date: -1 });
    res.json(transactions);
  } catch (err) {
    console.error('🚨 Error fetching user transactions:', err.message);
    res.status(500).json({ message: 'Server error while fetching user transactions' });
  }
});

// ✅ NEW: GET Analytics per user
router.get('/analytics/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const transactions = await Transaction.find({ userId });

    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach(txn => {
      if (txn.type === 'income') totalIncome += txn.amount;
      else if (txn.type === 'expense') totalExpense += txn.amount;
    });

    const balance = totalIncome - totalExpense;

    res.json({ totalIncome, totalExpense, balance });
  } catch (err) {
    console.error('🚨 Analytics fetch error:', err.message);
    res.status(500).json({ message: 'Analytics fetch failed', error: err.message });
  }
});
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTxn = await Transaction.findByIdAndDelete(id);

    if (!deletedTxn) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    res.json({ message: 'Transaction deleted successfully', deletedTxn });
  } catch (err) {
    console.error('🚨 Delete error:', err.message);
    res.status(500).json({ message: 'Server error while deleting transaction' });
  }
});

module.exports = router;