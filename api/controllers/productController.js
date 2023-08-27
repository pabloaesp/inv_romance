'use strict'

// var moment = require('moment');
var mongoosePaginate = require('mongoose-pagination');

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

    var itemsPerPage = 3;
    var page = 1;

    if(req.params.page){
        page = req.params.page;
    }

    Product.find()
        .sort({'status':'desc'})
        .paginate(page, itemsPerPage)
        .then((result) => {
            var products = result.docs;
            var total = result.total;

        console.log(products);
        if(!products) return res.status(404).send({message: 'No hay productos disponibles'});

        return res.status(200).send({
            products,
            total,
            pages: Math.ceil(total/itemsPerPage)
        });
    }).
    catch(err => console.log('Error de peticion de productos!', err));
}

// FALTA LA CONSULTA DE PRODUCTO POR ID

module.exports = {
    ProductRegister,
    getProducts
}