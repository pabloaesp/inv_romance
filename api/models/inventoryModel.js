'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var InventorySchema = Schema({
    inventory_id: String,
    products: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product'
        }
      ],
    note: String,
    week: String,


});

module.exports = mongoose.model('Inventory', InventorySchema);