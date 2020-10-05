const { getAllSales, updateSaleById, getSale, getSaleInfo } = require('../models/adminModel');

const getAll = async () => {
  const sales = await getAllSales();
  if (!sales) {
    return { error: 'no_sales' };
  }
  return sales;
};

const updateSale = async (id, status) => {
  const update = await updateSaleById(id, status);
  return update;
}

const getSaleById = async (id) => {
  const sale = await getSaleInfo(id);

  if (!sale) {
    return { error: 'no_sales' };
  }

  const saleProducts = await getSale(id);
  const fullSale = { ...sale, saleProducts};

  return fullSale;
};

module.exports = {
  getAll,
  updateSale,
  getSaleById,
};
