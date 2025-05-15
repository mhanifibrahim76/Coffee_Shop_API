const product = require('../model/products');

// Get All Products
exports.getAllProducts = async (req, res) => {
  try {
    const results = await product.getAll();
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add Product
exports.addProduct = async (req, res) => {
  try {
    const { name, category, price, stock } = req.body;

    if (!name || !category || !price || !stock) {
      return res.status(400).json({ message: 'Semua field wajib diisi.' });
    }

    await product.addProduct(name, category, price, stock);
    res.status(201).json({ message: 'Produk berhasil ditambahkan.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Gagal menambahkan produk.' });
  }
};

// Delete Product
exports.deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    await product.deleteProduct(id);
    res.status(200).json({ message: 'Produk berhasil dihapus.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Gagal menghapus produk.' });
  }
};

// Update Product
exports.updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, category, price, stock } = req.body;

    if (!name || !category || !price || !stock) {
      return res.status(400).json({ message: 'Semua field wajib diisi.' });
    }

    await product.updateProduct(id, name, category, price, stock);
    res.status(200).json({ message: 'Produk berhasil diupdate.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Gagal mengupdate produk.' });
  }
};