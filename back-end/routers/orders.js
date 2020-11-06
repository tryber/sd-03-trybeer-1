const express = require('express');
const rescue = require('express-rescue');

const { getSalesByUser, getSale } = require('../controllers/salesController');
const validateToken = require('../middlewares/validateToken');

const orders = express.Router();

orders.get('/:id', validateToken, rescue(getSale));
orders.get('/', validateToken, rescue(getSalesByUser));

module.exports = orders;
