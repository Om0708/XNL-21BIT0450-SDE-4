-- users table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- accounts table
CREATE TABLE IF NOT EXISTS accounts (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  account_type VARCHAR(50),
  balance NUMERIC(18, 2) DEFAULT 0.00,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- assets table
CREATE TABLE IF NOT EXISTS assets (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  symbol VARCHAR(20) UNIQUE,
  asset_type VARCHAR(50)
);

-- portfolios table
CREATE TABLE IF NOT EXISTS portfolios (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  asset_id INTEGER REFERENCES assets(id),
  quantity NUMERIC(18, 4),
  avg_price NUMERIC(18, 4),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- transactions table
CREATE TABLE IF NOT EXISTS transactions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  account_id INTEGER REFERENCES accounts(id),
  asset_id INTEGER REFERENCES assets(id),
  transaction_type VARCHAR(20), -- e.g., buy/sell
  amount NUMERIC(18, 2),
  price NUMERIC(18, 4),
  quantity NUMERIC(18, 4),
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);