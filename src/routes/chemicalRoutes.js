const express = require('express');
const router = express.Router();
const chemicalController = require('../controllers/chemicalController');
const verifyToken = require('../middleware/authMiddleware');
const verifyRole = require('../middleware/roleMiddleware');

router.use(verifyToken);

router.post('/', verifyRole(['owner', 'employee']), chemicalController.createChemical);
router.get('/', chemicalController.getAllChemicals);
router.get('/:id', chemicalController.getChemicalById);
router.put('/:id', verifyRole(['owner', 'employee']), chemicalController.updateChemical);
router.delete('/:id', verifyRole(['owner']), chemicalController.deleteChemical);

module.exports = router;
