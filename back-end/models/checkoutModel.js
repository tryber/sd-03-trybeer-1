const connection = require('./connection');

const getSaleByUserId = async (userId) => connection()
  .then((db) => db
    .getTable('sales')
    .select([
      'id',
      'user_id',
      'total_price',
      'delivery_address',
      'delivery_number',
      'sale_date',
      'status',
    ])
    .where('user_id =: userId')
    .bind('userId', userId)
    .execute())
  .then((results) => results.fetchAll())
  .then((results) => results.map(
    ([
      id,
      userId,
      totalPrice,
      deliveryAddress,
      deliveryNumber,
      saleDate,
      status,
    ]) => ({
      id,
      userId,
      totalPrice,
      deliveryAddress,
      deliveryNumber,
      saleDate,
      status,
    }),
  ));

const checkout = async (
  id,
  totalPrice,
  deliveryAddress,
  deliveryNumber,
  saleDate,
  status,
) => connection().then((db) => db
  .getTable('sales')
  .insert([
    'user_id',
    'total_price',
    'delivery_address',
    'delivery_number',
    'sale_date',
    'status',
  ])
  .values(
    id,
    totalPrice,
    deliveryAddress,
    deliveryNumber,
    saleDate,
    status,
  )
  .execute());

module.exports = {
  getSaleByUserId,
  checkout,
};
