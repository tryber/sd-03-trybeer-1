const jwt = require('jsonwebtoken');
const { getByEmail } = require('../models/userModel');

const loginService = async (mail, password) => {
  const user = await getByEmail(mail);

  if (user.password === password) {
    const signOptions = {
      algorithm: 'HS256',
      expiresIn: '2d',
    };
    const { name, email, role } = user;
    const userWithNoPassword = { name, email, role };
    const token = jwt.sign(userWithNoPassword, 'paodebatata', signOptions);
    return { token, name, email, role };
  }
  return { error: 'invalid_user' };
};

module.exports = loginService;
