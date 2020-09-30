const { values } = require('sequelize/types/lib/operators');

const checkout = async () =>
  connect()
    .then((db) =>
      db
        .getTable('sales')
        .select([
          'id',
          'user_id',
          'total_price',
          'delevery_address',
          'delivery_number',
          'sale_date',
          'status',
        ])
        .execute()
    )
    .then((results) => results.fetchAll())
    .then((results) =>
      results.map(
        ([
          id,
          user_id,
          total_price,
          delevery_address,
          delivery_number,
          sale_date,
          status,
        ]) => ({
          id,
          user_id,
          total_price,
          delevery_address,
          delivery_number,
          sale_date,
          status,
        })
      )
    );

const finishOrder = async (
  id,
  total_price,
  delivery_address,
  delivery_number,
  sale_date,
  status
) =>
  connect().then((db) => db
    .getTable('sales')
    .insert([
      'user_id',
      'total_price',
      'delevery_address',
      'delivery_number',
      'sale_date',
      'status',
    ])
    .values(
      id,
      total_price,
      delivery_address,
      delivery_number,
      sale_date,
      status,
    )
    .execute()
  );

module.exports = {
  checkout,
  finishOrder,
};
