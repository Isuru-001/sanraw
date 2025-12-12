const express = require('express');
const router = express.Router();
const reportsController = require('../controllers/reportsController');
const verifyToken = require('../middleware/authMiddleware');

router.use(verifyToken);

router.get('/sales/daily', reportsController.getDailySales);
router.get('/sales/monthly', reportsController.getMonthlySales);
router.get('/inventory', reportsController.getInventoryReport);
router.get('/credit', reportsController.getCreditReport);

module.exports = router;
