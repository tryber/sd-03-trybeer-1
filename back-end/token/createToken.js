const jwt = require('jsonwebtoken');

module.exports = function createToken(name, email, role) {
  const signOptions = {
    algorithm: 'HS256',
    expiresIn: '2d',
  };
  const userWithNoPassword = { name, email, role };
  const token = jwt.sign(userWithNoPassword, 'paodebatata', signOptions);
  return { token, name, email, role };
};
