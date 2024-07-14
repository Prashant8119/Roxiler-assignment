
/*
const Transaction = require('../models/transactionModel');

const listTransactions = async (req, res) => {
  const { page = 1, perPage = 10, search = '' } = req.query;
  const month = req.query.month;

  const query = {
    dateOfSale: {
      $gte: new Date(`2000-${new Date(month + ' 1, 2000').getMonth() + 1}-01`),
      $lt: new Date(`2000-${new Date(month + ' 1, 2000').getMonth() + 2}-01`),
    },
  };

  if (search) {
    query.$or = [
      { title: new RegExp(search, 'i') },
      { description: new RegExp(search, 'i') },
      { price: new RegExp(search, 'i') },
      { category: new RegExp(search, 'i') },
    ];
  }

  const transactions = await Transaction.find(query)
    .skip((page - 1) * perPage)
    .limit(parseInt(perPage));
  
  res.json(transactions);
};

const getStatistics = async (req, res) => {
  const month = req.query.month;
  const startDate = new Date(`2000-${new Date(month + ' 1, 2000').getMonth() + 1}-01`);
  const endDate = new Date(`2000-${new Date(month + ' 1, 2000').getMonth() + 2}-01`);

  const totalSaleAmount = await Transaction.aggregate([
    { $match: { dateOfSale: { $gte: startDate, $lt: endDate }, sold: true } },
    { $group: { _id: null, totalAmount: { $sum: '$price' } } }
  ]);

  const soldItems = await Transaction.countDocuments({ dateOfSale: { $gte: startDate, $lt: endDate }, sold: true });
  const notSoldItems = await Transaction.countDocuments({ dateOfSale: { $gte: startDate, $lt: endDate }, sold: false });

  res.json({
    totalSaleAmount: totalSaleAmount[0] ? totalSaleAmount[0].totalAmount : 0,
    soldItems,
    notSoldItems,
  });
};

module.exports = {
  listTransactions,
  getStatistics,
};
*/

const Transaction = require('../models/transactionModel');

const listTransactions = async (req, res) => {
  try {
    const { page = 1, perPage = 10, search = '' } = req.query;
    const month = req.query.month;

    const query = {
      dateOfSale: {
        $gte: new Date(`2000-${new Date(month + ' 1, 2000').getMonth() + 1}-01`),
        $lt: new Date(`2000-${new Date(month + ' 1, 2000').getMonth() + 2}-01`),
      },
    };

    if (search) {
      query.$or = [
        { title: new RegExp(search, 'i') },
        { description: new RegExp(search, 'i') },
        { price: new RegExp(search, 'i') },
        { category: new RegExp(search, 'i') },
      ];
    }

    const totalCount = await Transaction.countDocuments(query);
    const transactions = await Transaction.find(query)
      .skip((page - 1) * perPage)
      .limit(parseInt(perPage));
    
    console.log(`Sending ${transactions.length} transactions`);
    res.json({
      transactions,
      totalCount,
      page: parseInt(page),
      perPage: parseInt(perPage)
    });
  } catch (error) {
    console.error('Error in listTransactions:', error);
    res.status(500).json({ error: 'An error occurred while fetching transactions' });
  }
};

const getStatistics = async (req, res) => {
  try {
    const month = req.query.month;
    const startDate = new Date(`2000-${new Date(month + ' 1, 2000').getMonth() + 1}-01`);
    const endDate = new Date(`2000-${new Date(month + ' 1, 2000').getMonth() + 2}-01`);

    const totalSaleAmount = await Transaction.aggregate([
      { $match: { dateOfSale: { $gte: startDate, $lt: endDate }, sold: true } },
      { $group: { _id: null, totalAmount: { $sum: '$price' } } }
    ]);

    const soldItems = await Transaction.countDocuments({ dateOfSale: { $gte: startDate, $lt: endDate }, sold: true });
    const notSoldItems = await Transaction.countDocuments({ dateOfSale: { $gte: startDate, $lt: endDate }, sold: false });

    console.log('Sending statistics:', { totalSaleAmount, soldItems, notSoldItems });
    res.json({
      totalSaleAmount: totalSaleAmount[0] ? totalSaleAmount[0].totalAmount : 0,
      soldItems,
      notSoldItems,
    });
  } catch (error) {
    console.error('Error in getStatistics:', error);
    res.status(500).json({ error: 'An error occurred while fetching statistics' });
  }
};

module.exports = {
  listTransactions,
  getStatistics,
};
