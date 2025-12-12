const reportsModel = require('../models/reportsModel');

const getDailySales = async () => {
    return await reportsModel.getDailySales();
};

const getMonthlySales = async () => {
    return await reportsModel.getMonthlySales();
};

const getInventoryReport = async () => {
    return await reportsModel.getInventoryReport();
};

const getCreditReport = async () => {
    return await reportsModel.getCreditReport();
};

module.exports = {
    getDailySales,
    getMonthlySales,
    getInventoryReport,
    getCreditReport
};
