'use strict'

// var moment = require('moment');

var Product = require('../models/productModel');

// REGISTRO PRODUCTOS
function ProductRegister(req, res){
    var params = req.body;
    console.log(params);
    if (params.product_id != "" & params.name != "" & params.type != "" & params.status != ""){

        Product.find({product_id: params.product_id}).then((product) =>{

            if (product && product.length >= 1) { // Si el objeto producto tiene 1 o mas elementos entonces ya existe
                return res.status(200).send({message: 'El producto ya existe.'});
    
            }else{
                var product = new Product();
    
                product.product_id = params.product_id,
                product.name = params.name,
                product.type = params.type,
                product.status = true
    
                product.save().then((productStored) => {
    
                    if(productStored){
                        res.status(200).send({product: productStored});
                    }else{
                        res.status(404).send({message: 'No se ha podido guardar el producto'});
                    }
                }).
                catch(err => console.log('Error al guardar el producto', err));
            }
        }).
        catch(err => console.log('Error en la peticion de product', err));
    }else{
        res.status(404).send({message: 'Llene todos los campos!'});
    }
}

// CONSULTA PRODUCTOS
function getProducts(req, res){

    var page = 1;

    if(req.params.page){
        page = req.params.page;
    }

    // OPCIONES PARA EL PAGINATE
    const options = {
        page: page,
        limit: 3
    };

    Product.paginate({}, options)
        // .sort({'status':'desc'})
        .then((result) => {
            // var products = result.docs;
            // var total = result.totalDocs;
            // var limit = result.limit;

        console.log(result);
        if(!result) return res.status(404).send({message: 'No hay productos disponibles'});

        return res.status(200).send({
            products: result.docs,
            currentPage: result.page,
            total: result.totalDocs,
            pages: result.totalPages 
        });
    }).
    catch(err => console.log('Error de peticion de productos!', err));
}

// FALTA LA CONSULTA DE PRODUCTO POR ID

module.exports = {
    ProductRegister,
    getProducts
}