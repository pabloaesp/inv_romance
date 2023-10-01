'use strict'

var express = require('express');
var InventoryController = require('../controllers/inventoryController');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');


// Rutas
api.post('/inventory-register', md_auth.ensureAuth, InventoryController.inventoryRegister); //Registro
api.get('/inventories/:page?', md_auth.ensureAuth, InventoryController.getInventories); // Consulta varios
api.get('/inventory/:id', md_auth.ensureAuth, InventoryController.getInventory); // Consulta uno
api.put('/inventory-update/:id', md_auth.ensureAuth, InventoryController.inventoryUpdate); // Edicion
api.delete('/inventory-delete/:id', md_auth.ensureAuth, InventoryController.deleteInventory); // Eliminar


module.exports = api;