const express = require('express');
const loginController = require('../controllers/loginController');
const rescue = require('express-rescue');
const login = express.Router();

login
  .post('/', rescue(loginController));

module.exports = login;
