const express = require('express');
const rescue = require('express-rescue');

const { finishSalesController } = require('../controllers/checkoutController');
const validateToken = require('../middlewares/validateToken');

const checkout = express.Router();

checkout.post('/', validateToken, rescue(finishSalesController));

module.exports = checkout;
