const express = require('express');
const rescue = require('express-rescue');

const { getSaleByUser, getSale } = require('../controllers/salesController');
const validateToken = require('../middlewares/validateToken');

const orders = express.Router();

orders.get('/', validateToken, rescue(getSaleByUser));

orders.get('/:id', validateToken, rescue(getSale));

module.exports = orders;
