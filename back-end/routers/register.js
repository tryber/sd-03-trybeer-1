const express = require('express');
const rescue = require('express-rescue');
const { createUser } = require('../controllers/registerController');

const register = express.Router();

register.post('/register', rescue(createUser));

module.exports = register;
