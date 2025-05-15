const db = require('../config/db');

// Get all products
const getAll = async () => {
  const [rows] = await db.query('SELECT * FROM products');
  return rows;
};

// Add Product
const addProduct = async (name, category, price, stock) => {
  const [result] = await db.query(
    'INSERT INTO products (name, category, price, stock) VALUES (?, ?, ?, ?)',
    [name, category, price, stock]
  );
  return result;
};

// Update Product
const updateProduct = async (id, name, category, price, stock) => {
  const [result] = await db.query(
    'UPDATE products SET name = ?, category = ?, price = ?, stock = ? WHERE id = ?',
    [name, category, price, stock, id]
  );
  return result;
};

// Delete Product
const deleteProduct = async (id) => {
  const [result] = await db.query(
    'DELETE FROM products WHERE id = ?',
    [id]
  );
  return result;
};

module.exports = {
  getAll,
  addProduct,
  updateProduct,
  deleteProduct
};
