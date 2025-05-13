const transactionModel = require('../model/transaction');


exports.createTransaction = async (req, res) => {
    try {
      const userId = req.user.id; // dari JWT
      const { customer, items } = req.body;
  
      if (!customer) {
        return res.status(400).json({ message: 'Customer name is required' });
      }

      if (!items || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ message: 'Items array is required' });
      }
  
      const result = await transactionModel.createTransaction(userId, customer, items);
      res.status(201).json({ message: 'Transaction created', transaction: result });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
exports.getReceipt = async (req, res) => {
try {
    const transactionId = req.params.id;
    const receipt = await transactionModel.getReceipt(transactionId);

    if (!receipt) {
    return res.status(404).json({ message: 'Transaction not found' });
    }

    res.json(receipt);
} catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
}
};