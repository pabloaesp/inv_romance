'use strict'

var bcrypt = require('bcrypt-nodejs');
var jwt = require('../services/jwt');

var User = require('../models/userModel');

// HOME
function home(req, res) {
    res.status(200).send({message: 'Respondiendo desde Home'});
}

// REGISTRO
function registerUser(req, res){
    var params = req.body;
    var user = new User();

    console.log(params);

    if(params.name && params.surname && params.email && params.password){

        user.name = params.name;
        user.surname = params.surname;
        user.email = params.email;
        user.dni = params.dni;
        user.telephone = params.telephone;
        user.password = params.password;
        user.role = 'ROLE_USER';
        user.image = null;
        user.status = params.status;

        // Query para comprobar si el usuario a registra ya no existe
        User.find({email: user.email.toLowerCase()}).then((users) => {
            // if(err) return res.status(500).send({message: 'Error en la peticion de usuarios'});

            // Compruebo que el email/ID del usuario exista.
            if(users && users.length >= 1){
                return res.status(200).send({message: 'El usuario que intenta registrar ya existe.'});
            
            }else{

                // Encriptando contraseña
                bcrypt.hash(params.password, null, null, (err, hash) => {
                    if(err){
                        return res.status(500).send({message: 'Error encriptando password'});
                    }else{
                        user.password = hash;
                    }

                    // Guardando el usuario despues de encriptar la password
                    user.save().then((userSaved) => {
                        // if(err) return res.status(500).send({message: 'Error al guarda el usuario'});

                        if (userSaved) {
                            res.status(200).send({user: userSaved});
                        }else{
                            res.status(404).send({message: 'No se ha registrado el usuario'});
                        }
                    }).
                    catch(err => console.log('Error al guardar el usuario', err));
                });
            }
        })
        .catch(err => console.log('Error en la peticion de usuarios'));

    }else{
        return res.status(200).send({message: 'Envia todos los campos necesarios!!'});
    }
}

// LOGIN
function loginUser(req, res){
    var params = req.body;

    var email = params.email;
    var password = params.password;

    User.findOne({email: email}).then((user) => {
        // if(err) return res.status(500).send({message: 'Error en la peticion'});

        if (user){
            bcrypt.compare(password, user.password, (err, checked) => {
                if (checked) {
                    if(params.gettoken){
                        // Generar token y devolver
                        return res.status(200).send({token: jwt.createToken(user)});

                    }else{
                        // Devolver datos del usuario
                        user.password = undefined;
                        return res.status(200).send({user});
                    }

                }else{
                    return res.status(404).send({message: 'Usuario o Contraseña incorrectos.'});
                }
            });

        }else{
            return res.status(404).send({message: 'Usuario o Contraseña incorrectos!'});
        }
    }).
    catch(err => console.log('Error en la peticion', err));
}


module.exports = {
    home,
    registerUser,
    loginUser
}