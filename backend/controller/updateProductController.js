const productModel = require('../model/products');

// Update
exports.updateProduct = (req, res) => {
    const id = req.params.id;
    const { name, category, price, stock } = req.body;
  
    if (!name || !category || !price || !stock) {
      return res.status(400).json({ message: 'Semua field wajib diisi.' });
    }
  
    productModel.updateProduct(id, name, category, price, stock, (err) => {
      if (err) return res.status(500).json({ message: 'Gagal mengupdate produk.' });
      res.status(200).json({ message: 'Produk berhasil diupdate.' });
    });
  };