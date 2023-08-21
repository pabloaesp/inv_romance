'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = 3800;

// Conexion DB
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0..0.1/inv_romance', {useNewUrlParser:true, useUnifiedTopology: true})
.then(() => {
    console.log("DB Ok");

    // Crear servidor
    app.listen(port, ()=> {
        console.log("Server Ok");
    });
})
.catch(err => console.log(err))