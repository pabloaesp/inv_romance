'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var InventorySchema = Schema({
    user: { type: Schema.ObjectId, ref: 'User' },
    products: [ {type: mongoose.Schema.Types.ObjectId, ref: 'Product'} ], // ARREGLO DE PROPDUCTOS
    note: String,
    week: String, // DATO COLOCADO POR DEFECTO CON MOMENT
    date: String // DATO COLOCADO POR DEFECTO CON MOMENT

});

module.exports = mongoose.model('Inventory', InventorySchema);