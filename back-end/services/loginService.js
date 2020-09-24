const createToken = require('../token/createToken');
const { getByEmail } = require('../models/userModel');

const loginService = async (mail, password) => {
  const user = await getByEmail(mail);
  const { name, email, role } = user;
  if (user && user.password === password) {
    return createToken(name, email, role);
  }
  return { error: 'invalid_user' };
};

module.exports = loginService;
