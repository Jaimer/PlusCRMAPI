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

module.exports = {
    saveSupplier
};