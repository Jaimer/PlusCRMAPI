'use strict'
var path = require('path');
var fs = require('fs');
var mongoosePaginate = require('mongoose-pagination');
var Supplier = require('../models/supplier');

function saveSupplier(req,res){
    var supplier = new Supplier();
    var params = req.body;

    supplier.name = params.name;
    supplier.id_type = params.id_type;
    supplier.id = params.id;
    supplier.address = params.address;
    supplier.phone = params.phone;
    supplier.ext = params.ext;
    supplier.mobile = params.mobile;
    supplier.email = params.email;

    supplier.save((err, supplierStored) => {
        if(err){
            res.status(500).send({message: "Error en el servidor"});
        }else{
            if(!supplierStored){
                res.status(404).send({message: "No se pudo guardar el proveedor"});
            }else{
                res.status(200).send({supplier: supplierStored});
            }
        }
    });
}

function updateSupplier(req, res){
    var supplierId = req.params.id;
    var update = req.body;

    Supplier.findByIdAndUpdate(supplierId, update, (err, supplierUpdated) =>{
        if(err){
            res.status(500).send({message: "Error en el servidor"});
        }else{
            if(!supplierUpdated){
                res.status(404).send({message: "No se pudo actualizar el proveedor"});
            }else{
                res.status(200).send({supplier: supplierUpdated});
            }
        }
    });
}

function getSupplier(req, res){
    var supplierId = req.params.id;
    
    Supplier.findById(supplierId, (err, supplier) => {
        if(err){
            res.status(500).send({message: "Error en el servidor"});
        }else{
            if(!supplier){
                res.status(404).send({message: "No se encontró el proveedor"});
            }else{
                res.status(200).send({supplier});
            }
        }
    });
}

function getSuppliers(req, res){
    var itemsPerPage = parseInt(req.params.itemsPerPage);
    if(req.params.page){
        var page = req.params.page;
    }else{
        var page = 1;
    }

    Supplier.find().sort('name').paginate(page, itemsPerPage, (err, suppliers, total) => {
        if(err){
            res.status(500).send({message: "Error en el servidor"});
        }else{
            if(!suppliers){
                res.status(404).send({message: "No se encontraron proveedores"});
            }else{
                res.status(200).send({
                    total_items: total,
                    suppliers: suppliers
                });
            }
        }
    });
}

module.exports = {
    saveSupplier,
    updateSupplier,
    getSupplier,
    getSuppliers
};