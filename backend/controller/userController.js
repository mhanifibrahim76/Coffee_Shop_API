const bcrypt = require('bcrypt');
const userModel = require('../model/users');

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
