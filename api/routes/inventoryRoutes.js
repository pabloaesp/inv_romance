'use strict'

var express = require('express');
var InventoryController = require('../controllers/inventoryController');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');


// Rutas
api.post('/inventory-register', md_auth.ensureAuth, InventoryController.inventoryRegister); //Registro
api.get('/inventories/:page?', md_auth.ensureAuth, InventoryController.getInventories); // Consulta varios
/*api.get('/product/:id', md_auth.ensureAuth, ProductController.getProduct); // Consulta uno
api.put('/product-update/:id', md_auth.ensureAuth, ProductController.productUpdate); // Edicion
api.put('/product-status-update/:id', md_auth.ensureAuth, ProductController.ProductStatusUpdate); // Edicion estado producto
api.delete('/delete-product/:id', md_auth.ensureAuth, ProductController.deleteProduct); // Eliminar*/


module.exports = api;