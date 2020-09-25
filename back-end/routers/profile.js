const express = require('express');
const rescue = require('express-rescue');
const { updateUser } = require('../controllers/profileController');

const profile = express.Router();

profile.put('/profile', rescue(updateUser));

module.exports = profile;
