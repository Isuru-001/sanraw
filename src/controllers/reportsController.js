const reportsService = require('../services/reportsService');

const getDailySales = async (req, res) => {
    try {
        const data = await reportsService.getDailySales();
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getMonthlySales = async (req, res) => {
    try {
        const data = await reportsService.getMonthlySales();
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getInventoryReport = async (req, res) => {
    try {
        const data = await reportsService.getInventoryReport();
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getCreditReport = async (req, res) => {
    try {
        const data = await reportsService.getCreditReport();
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getDailySales,
    getMonthlySales,
    getInventoryReport,
    getCreditReport
};
