const jwt = require('jsonwebtoken');

const validateToken = (req, _res, next) => {
  const { authorization } = req.headers;
  const handleError = (err, decoded) => {
    if (err) return next('token_error');
    console.log(decoded);
    return decoded;
  };
  const user = jwt.verify(authorization, 'paodebatata', handleError);
  req.user = user;
  next();
};

module.exports = validateToken;
