const db = require(`../config/db`)

const getAll = (callback) => {
    db.query('SELECT * FROM products', callback)
}

// Update Product
const updateProduct = (id, name, category, price, stock, callback) => {
    const query = 'UPDATE products SET name = ?, category = ?, price = ?, stock = ? WHERE id = ?';
    db.query(query, [name, category, price, stock, id], callback);
};
  
// Delete Product
const deleteProduct = (id, callback) => {
    const query = 'DELETE FROM products WHERE id = ?';
    db.query(query, [id], callback);
};

const addProduct = (name, category, price, stock, callback) => {
    const query = 'INSERT INTO products (name, category, price, stock) VALUES (?, ?, ?, ?)';
    db.query(query, [name, category, price, stock], callback);
  };

  module.exports = {
    getAll,
    addProduct,
    updateProduct,
    deleteProduct
  };


