'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ReturnSchema = Schema({
    return_id: String,
    products: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product'
        }
      ],
    note: String,
    week: String,


});

module.exports = mongoose.model('Return', ReturnSchema);