'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'Fras3_para_tok3n_1nv-R0manc4';

exports.createToken = function(user){
    var payload = {
        sub: user._id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        dni: user.dni,
        telephone: user.telephone,
        role: user.role,
        image: user.image,
        status: user.status,
        iat: moment().unix(),
        exp: moment().add(30, 'days').unix
    };

    return jwt.encode(payload, secret);
};