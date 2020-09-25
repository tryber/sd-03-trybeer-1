const { listAllProducts } = require('../services/productsService');

const listAll = async () => {
  const products = await listAllProducts();
  return products;
};

module.exports = { listAll };
