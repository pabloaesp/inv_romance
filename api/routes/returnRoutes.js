'use strict'

var express = require('express');
var ReturnController = require('../controllers/returnController');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');


// Rutas
api.post('/return-register', md_auth.ensureAuth, ReturnController.returnRegister); //Registro
api.get('/returns/:page?', md_auth.ensureAuth, ReturnController.getReturns); // Consulta varios
api.get('/return/:id', md_auth.ensureAuth, ReturnController.getReturn); // Consulta uno
api.put('/return-update/:id', md_auth.ensureAuth, ReturnController.updateReturn); // Edicion
api.delete('/return-delete/:id', md_auth.ensureAuth, ReturnController.deleteReturn); // Eliminar


module.exports = api;