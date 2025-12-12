const salesModel = require('../models/salesModel');
const productModel = require('../models/productModel');
const creditModel = require('../models/creditModel'); // to check credit account existence

const createSale = async (data) => {
    const { product_id, quantity, payment_type, customer_nic } = data;

    // 1. Get Product Price & Check Stock
    const product = await productModel.getProductById(product_id);
    if (!product) throw new Error('Product not found');
    if (product.stock_quantity < quantity) throw new Error('Insufficient stock');

    // 2. If Credit, check if customer has account
    if (payment_type === 'credit') {
        if (!customer_nic) throw new Error('Customer NIC required for credit sales');
        const creditAccount = await creditModel.getCreditByNIC(customer_nic);
        if (!creditAccount) throw new Error('Customer credit account not found. Create one first.');
    }

    return await salesModel.createSale(data, product.unit_price);
};

const getAllSales = async () => {
    return await salesModel.getAllSales();
};

const getSaleById = async (id) => {
    return await salesModel.getSaleById(id);
};

module.exports = {
    createSale,
    getAllSales,
    getSaleById
};
