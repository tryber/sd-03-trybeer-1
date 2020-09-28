const express = require('express');
const rescue = require('express-rescue');

const productsController = require('../controllers/productsController');
const validateToken = require('../middlewares/validateToken');

const products = express.Router();

products.get('/', validateToken, rescue(productsController));

module.exports = products;
