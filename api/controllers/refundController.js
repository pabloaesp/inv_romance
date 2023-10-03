'use strict'

var moment = require('moment');

var Refund = require('../models/refundModel');

// REGISTRO INVENTARIOS
function refundRegister(req, res){
    var params = req.body;
    // console.log(params);

    if (params.products){

        var refund = new Refund();

        refund.user = req.user.sub,
        refund.products = params.products
        refund.note = params.note,
        refund.week = moment().isoWeek();
        refund.date = moment().unix();
        
        refund.save().then((refundStored) => {
            // console.log(refundStored);   
            if(refundStored){
                res.status(200).send({refund: refundStored});
            }else{
                res.status(404).send({message: 'No se ha podido guardar la devolucion'});
            }
        }).
        catch(err => {
                console.log('Error al guardar la devolucion', err);
            return res.status(500).send({message: 'Error al guardar la devolucion'});
        });

    }else{
        res.status(404).send({message: 'No hay productos agregados'});
    }
}


// CONSULTA INVENTARIOS
function getRefunds(req, res){

    var page = 1;

    if(req.params.page){
        page = req.params.page;
    }

    // OPCIONES DE PAGINACION
    const options = {
        page: page,
        limit: 3
        // sort: {status: 'desc'}
    };

    Refund.paginate({}, options).then((result) => {
        console.log(result)

        if(!result) return res.status(404).send({message: 'No hay devoluciones disponibles'});

        return res.status(200).send({
            refunds: result.docs, 
            currentPage: result.page,
            total: result.totalDocs,
            pages: result.totalPages
            // docs, page, totalDocs, totalPages son palabras reservadas de mongoose
        });
    }).
    catch(err => console.log('Error de peticion de devolucion!', err));
}


// CONSULTA UN SOLO INVENTARIO
function getRefund(req, res){
    var refundId = req.params.id;
    
    Refund.findOne({_id: refundId}).then((refund) => {
        console.log(refund);
        if(!refund) return res.status(404).send({message: 'La devolucion no existe'});

        return res.status(200).send({refund: refund});
        
    }).
    catch(err => console.log('Error de peticion de la devolucion!', err));
}

// MODIFICAR INVENTARIO
function updateRefund(req, res){
    var refundId = req.params.id;

    Refund.findOne({_id: refundId}).then((refund) => {

        if (!refund) res.status(500).send({message: 'La devolucion no existe'});
        
        var update = req.body;

        Refund.findByIdAndUpdate(refund._id, update, {new:true}).then((refundUpdated) => {

            return res.status(200).send({refund: refundUpdated});
    
        }).
        catch(err => console.log('No se pudo guardar la modificacion', err));
    
    }).
    catch(err => console.log('Error en la peticion', err));
}


function deleteRefund(req, res){
    var refundId = req.params.id;

    Refund.findById({_id: refundId}).then((refund) => {

        if(!refund){
            return res.status(404).send({message: 'La devolucion no existe.'});

        }else{
            refund.deleteOne({'_id': refundId}).then((refundDeleted) => {
        
                if (refundDeleted) return res.status(200).send({message: 'Devolucion del ' + refund.date + ' eliminado correctamente.'});        
            }).
            catch(err => console.log('No se pudo eliminar la devolucion', err));

        }
    }).
    catch(err => console.log('Error en la peticion de borrado de devolucion', err));

}

    

module.exports = {
    refundRegister,
    getRefunds,
    getRefund,
    updateRefund,
    deleteRefund


}