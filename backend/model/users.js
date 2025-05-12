// model/users.js
const db = require('../config/db');

const findByUsername = (username, callback) => {
  db.query('SELECT * FROM users WHERE username = ?', [username], callback);
};

const addUsers = (username, hashedPassword, role, callback) => {
  const query = 'INSERT INTO users (username, password, role) VALUES (?, ?, ?)';
  db.query(query, [username, hashedPassword, role], callback);
};

module.exports = {
  addUsers,
  findByUsername
};
