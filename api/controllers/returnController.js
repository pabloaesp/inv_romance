'use strict'

var moment = require('moment');

var Return = require('../models/returnModel');

// REGISTRO INVENTARIOS
function returnRegister(req, res){
    var params = req.body;
    console.log(params);

    if (params.products){

        var refund = new refund();

        refund.user = req.user.sub,
        refund.products = params.products
        refund.note = params.note,
        refund.week = moment().isoWeek();
        refund.date = moment().unix();
        
        refund.save().then((inventoryStored) => {
            console.log(inventoryStored);   
            if(inventoryStored){
                res.status(200).send({refund: inventoryStored});
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
function getReturns(req, res){

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
function getReturn(req, res){
    var inventoryId = req.params.id;
    
    Inventory.findOne({_id: inventoryId}).then((inventory) => {
        console.log(inventory);
        if(!inventory) return res.status(404).send({message: 'El inventario no existe'});

        return res.status(200).send({inventory: inventory});
        
    }).
    catch(err => console.log('Error de peticion del inventario!', err));
}

// MODIFICAR INVENTARIO
function updateReturn(req, res){
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


function deleteReturn(req, res){
    var inventoryId = req.params.id;

    Inventory.findById({_id: inventoryId}).then((inventory) => {

        if(!inventory){
            return res.status(404).send({message: 'El inventario no existe.'});

        }else{
            Inventory.deleteOne({'_id': inventoryId}).then((inventoryDeleted) => {
        
                if (inventoryDeleted) return res.status(200).send({message: 'Inventario del ' + inventory.date + ' eliminado correctamente.'});        
            }).
            catch(err => console.log('No se pudo eliminar el inventario', err));

        }
    }).
    catch(err => console.log('Error en la peticion de borrado de inventario', err));

}

    

module.exports = {
    returnRegister,
    getReturns,
    getReturn,
    updateReturn,
    deleteReturn


}