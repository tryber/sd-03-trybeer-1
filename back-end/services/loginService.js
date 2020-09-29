const createToken = require('../token/createToken');
const { getByEmail } = require('../models/userModel');

const loginService = async (mail, password) => {
  console.log('mail, password:', mail, password)
  const user = await getByEmail(mail);
  console.log('user:', user)
  const { name, email, role } = user;
  if (user && user.password === password) {
    return createToken(name, email, role);
  }
  return { error: 'invalid_user' };
};

module.exports = loginService;
