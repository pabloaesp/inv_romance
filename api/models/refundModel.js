'use strict'

var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate-v2');

var Schema = mongoose.Schema;

var RefundSchema = Schema({
    user: { type: Schema.ObjectId, ref: 'User' },
    products: [ {type: mongoose.Schema.Types.ObjectId, ref: 'Product'} ], // ARREGLO DE PROPDUCTOS
    note: String,
    week: String, // DATO COLOCADO POR DEFECTO CON MOMENT
    date: String // DATO COLOCADO POR DEFECTO CON MOMENT

});

RefundSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Refund', RefundSchema);