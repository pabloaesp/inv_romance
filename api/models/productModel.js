'use strict'

var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate-v2');

var Schema = mongoose.Schema;

var ProductSchema = Schema({
    product_id: String,
    name: String,
    type: String,
    status: Boolean
});

ProductSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Product', ProductSchema);