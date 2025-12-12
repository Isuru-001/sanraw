const pool = require('../config/db');

const addPurchase = async (purchaseData) => {
    const { product_id, quantity, buy_price, payment_type } = purchaseData;
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        // 1. Record Purchase
        const [result] = await connection.query(
            'INSERT INTO inventory_purchase (product_id, quantity, buy_price, payment_type) VALUES (?, ?, ?, ?)',
            [product_id, quantity, buy_price, payment_type]
        );

        // 2. Update Product Stock (Increase)
        await connection.query(
            'UPDATE product SET stock_quantity = stock_quantity + ? WHERE id = ?',
            [quantity, product_id]
        );

        await connection.commit();
        return result.insertId;
    } catch (err) {
        await connection.rollback();
        throw err;
    } finally {
        connection.release();
    }
};

const getAllPurchases = async () => {
    const [rows] = await pool.query('SELECT * FROM inventory_purchase');
    return rows;
};

module.exports = {
    addPurchase,
    getAllPurchases
};
