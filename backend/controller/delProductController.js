const productModel = require('../model/products');

// Delete
exports.deleteProduct = (req, res) => {
    const id = req.params.id;
  
    productModel.deleteProduct(id, (err) => {
      if (err) return res.status(500).json({ message: 'Gagal menghapus produk.' });
      res.status(200).json({ message: 'Produk berhasil dihapus.' });
    });
  };