const express = require('express');
const cors = require('cors');
const connectDB = require('./database/db'); // MongoDB
const pool = require('./database/pg');      // PostgreSQL
const userRoutes = require('./routes/userRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const sqlRoutes = require('./routes/sqlRoutes');

require('dotenv').config();
const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json()); // Parse JSON request body

// ✅ Connect MongoDB
connectDB(); // logs inside db.js

// ✅ Routes
app.use('/api/users', userRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/sql', sqlRoutes);

// ✅ Direct login route using PostgreSQL
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query(
      'SELECT * FROM users WHERE email = $1 AND password = $2',
      [email, password]
    );

    if (result.rows.length > 0) {
      const user = result.rows[0];
      res.status(200).json({ message: 'Login successful', userId: user.id });
    }else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});