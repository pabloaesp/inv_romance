'use strict'

var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate-v2');

var Schema = mongoose.Schema;

var UserSchema = Schema({
    name: String,
    surname: String,
    email: String,
    dni: String, //Cedula de Identidad
    telephone: String,
    password: String,
    role: String,
    image: String,
    status: String
});

UserSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('User', UserSchema);