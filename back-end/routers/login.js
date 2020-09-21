const { Router } = require('express');
const loginController = require('../controllers/loginController');
const rescue = require('express-rescue');
const login = Router();

login.route('/')
  .post(rescue(loginController));

module.exports = login;
