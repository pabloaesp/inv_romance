'use strict'

var moment = require('moment');

var Inventory = require('../models/inventoryModel');

// REGISTRO INVENTARIOS
function inventoryRegister(req, res){
    var params = req.body;

    if (params.products){

        var inventory = new Inventory();

        inventory.user = req.user.sub,
        inventory.products = params.products
        inventory.note = params.note,
        inventory.week = moment().isoWeek();
        inventory.date = moment().unix();
        
        inventory.save().then((inventoryStored) => {
            console.log(inventoryStored);   
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

// CONSULTA PRODUCTOS VARIOS
function getInventories(req, res){

    var page = 1;

    if(req.params.page){
        page = req.params.page;
    }


    // OBTENER INVENTARIOS
    const options = {
        page: page,
        limit: 3
        // sort: {status: 'desc'}
    };

    Inventory.paginate({}, options).then((result) => {

        console.log(result);
        if(!result) return res.status(404).send({message: 'No hay inventarios disponibles'});

        return res.status(200).send({
            inventories: result.docs, 
            currentPage: result.page,
            total: result.totalDocs,
            pages: result.totalPages
            // docs, page, totalDocs, totalPages son palabras reserevadas de mongoose
        });
    }).
    catch(err => console.log('Error de peticion de inventarios!', err));
}



module.exports = {
    inventoryRegister,
    getInventories,


}