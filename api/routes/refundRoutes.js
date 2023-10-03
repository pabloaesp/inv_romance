'use strict'

var express = require('express');
var RefundController = require('../controllers/refundController');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');


// Rutas
api.post('/refund-register', md_auth.ensureAuth, RefundController.refundRegister); //Registro
api.get('/refunds/:page?', md_auth.ensureAuth, RefundController.getRefunds); // Consulta varios
api.get('/refund/:id', md_auth.ensureAuth, RefundController.getRefund); // Consulta uno
api.put('/refund-update/:id', md_auth.ensureAuth, RefundController.updateRefund); // Edicion
api.delete('/refund-delete/:id', md_auth.ensureAuth, RefundController.deleteRefund); // Eliminar


module.exports = api;