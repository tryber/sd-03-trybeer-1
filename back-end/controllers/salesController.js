const { getAll, updateSale, getSaleById, finishSale, getSaleByUserId } = require('../services/salesService');

const listAllSales = async (_req, res, next) => {
  const response = await getAll();

  if (response.error) return next(response.error);

  return res.status(200).json(response);
};

const updateSaleById = async (req, res, next) => {
  const { id } = req.params;
  const { status } = req.body;

  const response = await updateSale(id, status);

  if (response) return next(response.error);

  return res.status(200).json(response);
};

const getSale = async (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  const response = await getSaleById(id);
  if (response.error) return next(response.error);

  return res.status(200).json(response);
};

const finishSalesController = async (req, res) => {
  const sales = await finishSale(req.user, req.body);
  console.log(sales);
  return res.status(200).json(sales);
};

const getSaleByUser = async (req, res, next) => {
  console.log('req.user.id:', req.user);
  const sale = await getSaleByUserId(req.user.id);
  console.log(sale);
  if (sale.error) return next(sale.error);

  return res.status(200).json(sale);
};

module.exports = {
  finishSalesController,
  listAllSales,
  updateSaleById,
  getSale,
  getSaleByUser,
};
