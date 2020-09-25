const userModel = require('../models/userModel');

const updateUser = async (name, email) => {
  const userExists = await userModel.getByEmail(email);
  if (!userExists) {
    return { error: 'user_not_exist' };
  }
  const result = await userModel.updateUser(name, email);
  return result;
};

module.exports = { updateUser };
