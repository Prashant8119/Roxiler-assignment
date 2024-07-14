const axios = require('axios');
const Transaction = require('../models/transactionModel');

const fetchAndInitializeData = async () => {
  try {
    const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
    const transactions = response.data;

    await Transaction.deleteMany({}); // Clear existing data
    await Transaction.insertMany(transactions);
    console.log('Database initialized with seed data');
  } catch (error) {
    console.error('Error initializing database', error);
  }
};

module.exports = fetchAndInitializeData;
