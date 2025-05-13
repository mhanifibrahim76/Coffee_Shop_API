const express = require('express');
const router = express.Router();
const transactionController = require('../controller/transactionController');
const authMiddleware = require('../middleware/auth');

router.get('/:id/receipt', authMiddleware, transactionController.getReceipt);
router.post('/', authMiddleware, transactionController.createTransaction);

module.exports = router;
