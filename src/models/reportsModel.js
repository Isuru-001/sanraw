const pool = require('../config/db');

const getDailySales = async () => {
    // MySQL 8, simple date check
    const [rows] = await pool.query(
        'SELECT * FROM sale WHERE DATE(created_at) = CURDATE()'
    );
    return rows;
};

const getMonthlySales = async () => {
    const [rows] = await pool.query(
        'SELECT * FROM sale WHERE MONTH(created_at) = MONTH(CURRENT_DATE()) AND YEAR(created_at) = YEAR(CURRENT_DATE())'
    );
    return rows;
};

const getInventoryReport = async () => {
    const [rows] = await pool.query('SELECT * FROM product'); // Current stock levels
    return rows;
};

const getCreditReport = async () => {
    const [rows] = await pool.query('SELECT * FROM customer_credit');
    return rows;
};

module.exports = {
    getDailySales,
    getMonthlySales,
    getInventoryReport,
    getCreditReport
};
