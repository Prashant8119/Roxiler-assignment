const express = require('express');
const router = express.Router();
const { listTransactions, getStatistics } = require('../controllers/transactionController');

router.get('/transactions', listTransactions);
router.get('/statistics', getStatistics);

module.exports = router;
