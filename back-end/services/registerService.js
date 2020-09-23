const userModel = require('../models/userModel');

const createUser = async (userInfo) => {
  const { name, email, password, role } = userInfo;

  const result = await userModel.getByEmail(email);
  if (result) {
    return { error: 'email_in_use' };
  }
  const whichRole = role === 'true' ? 'administrator' : 'client';
  const modelInfo = { name, email, password, whichRole };
  const createdUser = await userModel.registerUser(modelInfo);
  return createdUser;
};

module.exports = { createUser };
