const connect = require('./connection');

const getByEmail = async (mail) => {
  try {
    const db = await connect();
    const searchDb = await db
      .getTable('users')
      .select()
      .where('email = :email')
      .bind('email', mail)
      .execute();
      const result = await searchDb.fetchAll()[0]
    if (result) {
      const [id, name, email, password, role] = result;
      console.log(id, name, email, password, role);
      return id && password ? { id, email, password, name, role } : null;
    };
    return null;
  } catch (err) {
    console.error(err);
    return process.exit(1);
  }
};

module.exports = { getByEmail };
