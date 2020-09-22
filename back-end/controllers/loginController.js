const loginService = require('../services/loginService');

const loginController = async (req, res, next) => {
  const { email, password } = req.body;
  console.log('email, password:', email, password);
  const response = await loginService(email, password);

  if (response.error) next(response.error);

  return res.status(200).json(response);
};

module.exports = loginController;