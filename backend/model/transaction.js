const db = require(`../config/db`)


const createTransaction = async (userId, customer, items) => {
  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();

    // Hitung total dan total product
    let totalPrice = 0;
    let totalProduct = 0;

    for (let item of items) {
      const [productRows] = await conn.query('SELECT price FROM products WHERE id = ?', [item.product_id]);
      if (productRows.length === 0) throw new Error('Product not found');

      const price = productRows[0].price;
      totalPrice += price * item.quantity;
      totalProduct += item.quantity;
    }

    // Simpan transaksi utama
    const [transactionResult] = await conn.query(
      'INSERT INTO transactions (user_id, customer, total_price, total_product, date) VALUES (?, ?, ?, ?, NOW())',
      [userId, customer, totalPrice, totalProduct]
    );

    const transactionId = transactionResult.insertId;

    // Simpan detail per item
    for (let item of items) {
      await conn.query(
        'INSERT INTO transaction_items (transaction_id, product_id, quantity) VALUES (?, ?, ?)',
        [transactionId, item.product_id, item.quantity]
      );
    }

    await conn.commit();

    return {
      transaction_id: transactionId,
      customer: customer,
      total_price: totalPrice,
      total_product: totalProduct
    };
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
};

const getReceipt = async (transactionId) => {
  const [transactionRows] = await db.query('SELECT * FROM transactions WHERE id = ?', [transactionId]);
  if (transactionRows.length === 0) return null;

  const [items] = await db.query(
    `SELECT ti.quantity, p.name, p.price 
     FROM transaction_items ti 
     JOIN products p ON ti.product_id = p.id 
     WHERE ti.transaction_id = ?`,
    [transactionId]
  );

  return {
    transaction: transactionRows[0],
    items
  };
};


module.exports = { 
  createTransaction,
  getReceipt
};
