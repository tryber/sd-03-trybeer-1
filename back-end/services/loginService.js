const jwt = require('jsonwebtoken');
const getUser = require('../models/userModel');

const loginService = async (email, password) => {
  const user = await getUser(email);
  if (user.password === password) {
    delete user.password;
    const token = jwt.sign(user);
    return token;
  }
  return { code: 'invalid_user' };
};

module.exports = loginService;
