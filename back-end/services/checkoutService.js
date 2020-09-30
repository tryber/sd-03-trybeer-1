const checkoutModel = require('../models/checkoutModel');

function cartTotal(cart) {
  return cart.reduce((acc, item) => acc + (item.price * item.quantity), zero);
}

const finishSale = async (user, order) => {
  const { cart, street, streetNumber } = order
  const sales = await checkoutModel.finishOrder(
    user.id,
    cartTotal(cart),
    street,
    streetNumber,
    new Date(),
    "Pending",
  );

  return sales;
};

module.exports = { finishSale };
