'use strict'

var express = require('express');
var ProductController = require('../controllers/productController');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');


// Rutas
api.post('/product-register', md_auth.ensureAuth, ProductController.ProductRegister); //Registro
api.get('/products/:page?', md_auth.ensureAuth, ProductController.getProducts); // Consulta varios
api.get('/product/:id', md_auth.ensureAuth, ProductController.getProduct); // Consulta uno
api.put('/product-update/:id', md_auth.ensureAuth, ProductController.productUpdate); // Edicion
api.put('/product-status-update/:id', md_auth.ensureAuth, ProductController.ProductStatusUpdate); // Edicion estado producto
/*api.delete('/delete-product/:id', md_auth.ensureAuth, TapeController.deleteTape); // Eliminar
*/

module.exports = api;