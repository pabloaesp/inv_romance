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

// CONSULTA INVENTARIOS
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

// CONSULTA UN SOLO INVENTARIO
function getInventory(req, res){
    var inventoryId = req.params.id;
    
    Inventory.findOne({_id: inventoryId}).then((inventory) => {
        console.log(inventory);
        if(!inventory) return res.status(404).send({message: 'El inventario no existe'});

        return res.status(200).send({inventory: inventory});
        
    }).
    catch(err => console.log('Error de peticion del inventario!', err));
}

// MODIFICAR INVENTARIO
function inventarioUpdate(req, res){
    var inventoryId = req.params.id;
    console.log(inventoryId);

    Inventory.findOne({_id: inventoryId}).then((inventory) => {

        if (!inventory) res.status(500).send({message: 'El inventario no existe'});
        
        var update = req.body;

        Inventory.findByIdAndUpdate(inventory._id, update, {new:true}).then((inventoryUpdated) => {

            return res.status(200).send({inventory: inventoryUpdated});
    
        }).
        catch(err => console.log('No se pudo guardar la modificacion', err));
    
    }).
    catch(err => console.log('Error en la peticion', err));
}

    

module.exports = {
    inventoryRegister,
    getInventories,
    getInventory,
    inventarioUpdate


}