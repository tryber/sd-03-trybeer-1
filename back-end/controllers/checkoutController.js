const { finishSale } = require('../services/checkoutService');

const finishSalesController = async (req, res) => {
  const sales = await finishSale(req.user, req.body);
  
  return res.status(200).json(sales);
};

module.exports = { finishSalesController };
