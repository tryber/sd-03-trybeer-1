const checkoutModel = require('../models/checkoutModel');

function cartTotal(cart) {
  return cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
}

const finishSale = async (user, order) => {
  const { cart, street, streetNumber } = order;
  const timeStamp = new Date();
  const total = cartTotal(cart);
  const sales = await checkoutModel.finishOrder(
    user.id,
    total,
    street,
    streetNumber,
    timeStamp.toLocaleDateString(),
    'Pending',
  );
  return sales;
};

module.exports = { finishSale };
