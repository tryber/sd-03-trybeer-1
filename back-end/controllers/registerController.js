const registerService = require('../services/registerService');

const createUser = async (req, res, next) => {
  const { name, email, password, role } = req.body;
  const user = new user(name, email, password, role);
  const response = await registerService (name, email, password, role);
  
  if (response.error) next (reponse.error);

  return res.status(200).json(response);
};

module.exports = { createUser };
