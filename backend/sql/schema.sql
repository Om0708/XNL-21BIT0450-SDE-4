-- sql/schema.sql

-- USERS
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ASSETS
CREATE TABLE assets (
  id SERIAL PRIMARY KEY,
  symbol VARCHAR(10) UNIQUE NOT NULL,
  name VARCHAR(100),
  asset_type VARCHAR(50)
);

-- TRANSACTIONS
CREATE TABLE transactions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  asset_id INTEGER REFERENCES assets(id),
  type VARCHAR(10), -- buy/sell
  quantity NUMERIC,
  price NUMERIC,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- PORTFOLIO
CREATE TABLE portfolio (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  asset_id INTEGER REFERENCES assets(id),
  total_quantity NUMERIC
);

-- INDEXING
CREATE INDEX idx_user_asset_time ON transactions(user_id, asset_id, timestamp);