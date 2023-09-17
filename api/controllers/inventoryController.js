'use strict'

// var moment = require('moment');

var Inventory = require('../models/inventoryModel');

// REGISTRO INVENTARIOS
function inventoryRegister(req, res){
    var params = req.body;

    if (params.products){

        var inventory = new Inventory();

        inventory.name = params.name,
        inventory.products = params.products
        inventory.note = params.note,
        inventory.week = moment().isoWeek();
        inventory.date = moment().unix();
        
        inventory.save().then((inventoryStored) => {

            if(inventoryStored){
                res.status(200).send({inventory: inventoryStored});
            }else{
                res.status(404).send({message: 'No se ha podido guardar el inventario'});
            }
        }).
        catch(err => {
            console.log('Error al guardar el inventario');
            return res.status(500).send({message: 'Error al guardar el inventario'});
        });

    }else{
        res.status(404).send({message: 'No hay productos agregados'});
    }
}



module.exports = {
    inventoryRegister,

}