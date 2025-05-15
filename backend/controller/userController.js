const bcrypt = require('bcrypt');
const userModel = require('../model/users');

// Add User
exports.addUsers = async (req, res) => {
  const { username, password, role } = req.body;

  if (!username || !password || !role) {
    return res.status(400).json({ message: 'Semua field wajib diisi.' });
  }

  if (!['admin', 'kasir'].includes(role)) {
    return res.status(400).json({ message: 'Role tidak valid.' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    userModel.addUsers(username, hashedPassword, role, (err, result) => {
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(409).json({ message: 'Username sudah digunakan.' });
        }
        return res.status(500).json({ message: 'Gagal menambahkan user.' });
      }

      res.status(201).json({ message: 'User berhasil ditambahkan.' });
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error.' });
  }
};

// Get All Users
exports.getUsers = async (req, res) => {
  try {
    const users = await userModel.getAll();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Gagal mengambil data users.' });
  }
};

// Get User by ID
exports.getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userModel.getById(id);
    if (!user) {
      return res.status(404).json({ message: 'User tidak ditemukan.' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Gagal mengambil data user.' });
  }
};

// Update User
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, role } = req.body;

  if (!username || !role) {
    return res.status(400).json({ message: 'Username dan role wajib diisi.' });
  }

  try {
    const result = await userModel.updateUser(id, username, role);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'User tidak ditemukan.' });
    }
    res.json({ message: 'User berhasil diperbarui.' });
  } catch (err) {
    res.status(500).json({ message: 'Gagal memperbarui user.' });
  }
};

// Delete User
exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await userModel.deleteUser(id);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'User tidak ditemukan.' });
    }
    res.json({ message: 'User berhasil dihapus.' });
  } catch (err) {
    res.status(500).json({ message: 'Gagal menghapus user.' });
  }
};