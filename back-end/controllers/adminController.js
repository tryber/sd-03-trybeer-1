const { getAll, updateSale, getSaleById } = require('../services/adminService');

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
}

const getSale = async (req, res, next) => {
  const { id } = req.params;

  const response = await getSaleById(id);

  if (response.error) return next(response.error);

  return res.status(200).json(response);
}

module.exports = {
  listAllSales,
  updateSaleById,
  getSale,
};
