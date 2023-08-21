'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'Fras3_para_tok3n_registr0_c1nta';

exports.createToken = function(user){
    var payload = {
        sub: user._id,
        name: user.name,
        surname: user.surname,
        nick: user.nick,
        role: user.role,
        image: user.image,
        iat: moment().unix(),
        exp: moment().add(30, 'days').unix
    };

    return jwt.encode(payload, secret);
};