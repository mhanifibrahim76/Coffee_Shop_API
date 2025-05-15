const db = require('../config/db');

// Find User by Username
const findByUsername = async (username) => {
  const [rows] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
  return rows;
};

// Get user by ID
const getById = async (id) => {
  const [rows] = await db.query(
    'SELECT id, username, role FROM users WHERE id = ?',
    [id]
  );
  return rows[0];
};

// Add User
const addUsers = async (username, hashedPassword, role) => {
  const [result] = await db.query(
    'INSERT INTO users (username, password, role) VALUES (?, ?, ?)',
    [username, hashedPassword, role]
  );
  return result;
};

// Get all users
const getAll = async () => {
  const [rows] = await db.query('SELECT id, username, role FROM users');
  return rows;
};

// Update user (excluding password)
const updateUser = async (id, username, role) => {
  const [result] = await db.query(
    'UPDATE users SET username = ?, role = ? WHERE id = ?',
    [username, role, id]
  );
  return result;
};

// Delete user
const deleteUser = async (id) => {
  const [result] = await db.query(
    'DELETE FROM users WHERE id = ?',
    [id]
  );
  return result;
};

module.exports = {
  addUsers,
  findByUsername,
  getById,
  getAll,
  updateUser,
  deleteUser
};
