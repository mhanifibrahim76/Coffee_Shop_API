const express = require('express');
const router = express.Router();
const productController = require('../controller/addProductController');
const updateProductController = require('../controller/updateProductController');
const delProductController = require('../controller/delProductController');
const getAllProducts = require('../controller/productController');
const authMiddleware = require('../middleware/auth');

router.get('/', getAllProducts.getAllProducts);
router.post('/add', authMiddleware, productController.addProduct);
router.put('/update/:id', authMiddleware, updateProductController.updateProduct);
router.delete('/delete/:id', authMiddleware, delProductController.deleteProduct);


module.exports = router;
