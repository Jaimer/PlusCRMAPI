'use strict'
var path = require('path');
var fs = require('fs');
var mongoosePaginate = require('mongoose-pagination');
var Product = require('../models/product');

function saveProduct(req,res){
    var product = new Product();
    var params = req.body;

    product.code = params.code;
    product.aux_code = params.aux_code;
    product.name = params.name;
    product.cost = params.cost;
    product.price = params.price;
    product.description = params.description;
    product.type = params.type;
    product.IVA = params.IVA;
    product.ICE = params.ICE;
    product.IRBPNR = params.IRBPNR;
    product.supplier = params.supplier;

    product.save((err, productStored) => {
        if(err){
            res.status(500).send({message: "Error en el servidor"});
        }else{
            if(!productStored){
                res.status(404).send({message: "No se pudo guardar el producto"});
            }else{
                res.status(200).send({product: productStored});
            }
        }
    });
}

function updateProduct(req,res){
    var productId = req.params.id;
    var update = req.body;

    Product.findByIdAndUpdate(productId, update, (err, productUpdated) =>{
        if(err){
            res.status(500).send({message: "Error en el servidor"});
        }else{
            if(!productUpdated){
                res.status(404).send({message: "No se pudo actualizar el producto"});
            }else{
                res.status(200).send({producto: productUpdated});
            }
        }
    });
}

function getProduct(req, res){
    var productId = req.params.id;
    
    Product.findById(productId, (err, product) => {
        if(err){
            res.status(500).send({message: "Error en el servidor"});
        }else{
            if(!product){
                res.status(404).send({message: "No se encontró el producto"});
            }else{
                res.status(200).send({product});
            }
        }
    });
}

function getProducts(req, res){
    var itemsPerPage = parseInt(req.params.itemsPerPage);
    if(req.params.page){
        var page = req.params.page;
    }else{
        var page = 1;
    }

    Product.find().sort('name').paginate(page, itemsPerPage, (err, products, total) => {
        if(err){
            res.status(500).send({message: "Error en el servidor"});
        }else{
            if(!products){
                res.status(404).send({message: "No se encontraron productos"});
            }else{
                res.status(200).send({
                    total_items: total,
                    products: products
                });
            }
        }
    });
}

module.exports = {
    saveProduct,
    updateProduct,
    getProduct,
    getProducts
}