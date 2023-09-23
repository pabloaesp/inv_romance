'use strict'

var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate-v2');

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

ReturnSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Return', ReturnSchema);