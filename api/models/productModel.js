'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductSchema = Schema({
    product_id: String,
    name: String,
    type: String,
    state: Boolean

});

module.exports = mongoose.model('Product', ProductSchema);