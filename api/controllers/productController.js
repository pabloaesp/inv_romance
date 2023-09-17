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

// CONSULTA PRODUCTOS VARIOS
function getProducts(req, res){

    var page = 1;

    if(req.params.page){
        page = req.params.page;
    }

    // OPCIONES PARA EL PAGINATE
    const options = {
        page: page,
        limit: 3,
        sort: {status: 'desc'}
    };

    Product.paginate({}, options).then((result) => {
            // var products = result.docs;
            // var total = result.totalDocs;
            // var limit = result.limit;

        if(!result.length) return res.status(404).send({message: 'No hay productos disponibles'});

        return res.status(200).send({
            products: result.docs,
            currentPage: result.page,
            total: result.totalDocs,
            pages: result.totalPages 
        });
    }).
    catch(err => console.log('Error de peticion de productos!', err));
}

// CONSULTA UN SOLO PRODUCTO
function getProduct(req, res){
    var productId = req.params.id;
    
    Product.find({productId: productId}).then((product) => {
        console.log(product);
        if(!product.length) return res.status(404).send({message: 'El producto no existe'});

        return res.status(200).send({product: product});
        
    }).
    catch(err => console.log('Error de peticion del producto!', err));
}

// EDITAR PRODUCTO
function productUpdate(req, res){
    var productId = req.params.id;
    var update = req.body;
    
    // Borro status porque maneja en otra funcion
    delete update.status;
    
    Product.findOneAndUpdate({productId:productId}, update, {new:true}).then((productUpdated) => {
        console.log(productUpdated);

        if(!productUpdated) return res.status(404).send({message: 'El producto no existe.'});

        return res.status(200).send({product: productUpdated});

    }).
    catch(err => console.log('Error de edicion del producto!', err));
}

// EDITAR STATUS PRODUCTO
function ProductStatusUpdate(req, res){
    var productId = req.params.id;

    var status = req.body.status;
    
    Product.findOneAndUpdate({productId:productId}, {status:status}, {new:true}).then((productStatusUpdated) => {
        
        if(!productStatusUpdated) return res.status(404).send({message: 'No se ha podido actualizar el status del producto'});
        
        return res.status(200).send({product: productStatusUpdated});

    }).
    catch(err => console.log('Error de edicion del status!', err));
}

// BORRAR PRODUCTO
function deleteProduct(req, res){
    var productId = req.params.id;

    Product.findOne({productId: productId}).then((product) => {
        
        if(product == null) return res.status(404).send({message: 'El producto no existe.'});

        if(product){
            Product.deleteOne({productId: productId}).then((productRemoved) => {
                if (productRemoved) return res.status(200).send({message: 'Producto eliminado correctamente.'});        
            }).
            catch(err => {
                console.log('1. Error al borrar el producto');
                return res.status(500).send({message: '1. Error al borrar el producto'});
            });
        }
    }).
    catch(err => {
        console.log('2. Error al borrar el producto');
        return res.status(500).send({message: '2. Error al borrar el producto'});
    });
    
}

module.exports = {
    ProductRegister,
    getProducts,
    getProduct,
    productUpdate,
    ProductStatusUpdate,
    deleteProduct
}