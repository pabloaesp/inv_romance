'use strict'

var express = require('express');
var UserController = require('../controllers/userController');

var api = express.Router();


// Rutas
api.get('/home', UserController.home);
api.post('/register', UserController.registerUser);
api.post('/login', UserController.loginUser);


module.exports = api;