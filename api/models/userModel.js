'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({
    name: String,
    surname: String,
    nick: String,
    dni: String, //Cedula de Identidad
    telephone: String,
    password: String,
    role: String,
    image: String,
    state: String
});

module.exports = mongoose.model('User', UserSchema);