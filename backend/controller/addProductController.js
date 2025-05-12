const productModel = require('../model/products');

exports.addProduct = (req, res) => {
  const { name, category, price, stock } = req.body;

  if (!name || !category || !price || !stock) {
    return res.status(400).json({ message: 'Semua field wajib diisi.' });
  }

  productModel.addProduct(name, category, price, stock, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Gagal menambahkan produk.' });
    }
    res.status(201).json({ message: 'Produk berhasil ditambahkan.' });
  });
};
