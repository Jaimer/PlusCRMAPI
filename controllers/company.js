'use strict'
var path = require('path');
var fs = require('fs');
var mongoosePaginate = require('mongoose-pagination');
var Company = require('../models/company');

function saveCompany(req,res){
    var company = new Company();
    var params = req.body;

    company.name = params.name;
    company.ruc = params.ruc;
    company.com_name = params.com_name;
    company.resol = params.resol;
    company.special = params.special;
    company.accounting = params.accounting;
    company.logo = params.logo;
    company.emtype = params.emtype;
    company.timeout = params.timeout;
    company.env = params.env;
    company.address = params.address;
    company.cert = params.cert;

    company.save((err, companyStored) => {
        if(err){
            res.status(500).send({message: "Error en el servidor"});
        }else{
            if(!companyStored){
                res.status(404).send({message: "No se pudo guardar la empresa"});
            }else{
                res.status(200).send({company: companyStored});
            }
        }
    });
}

function updateCompany(req,res){
    var companyId = req.params.id;
    var update = req.body;

    Company.findByIdAndUpdate(companyId, update, (err, companyUpdated) => {
        if(err){
            res.status(500).send({message: "Error en el servidor"});
        }else{
            if(!companyUpdated){
                res.status(404).send({message: "No se pudo actualizar la empresa"});
            }else{
                res.status(200).send({company: companyUpdated});
            }
        }
    });
}

function getCompany(req,res){
    var companyId = req.params.id;

    Company.findById(companyId, (err, company) => {
        if(err){
            res.status(500).send({message: "Error en el servidor"});
        }else{
            if(!company){
                res.status(404).send({message: "No se encontró la compañía"});
            }else{
                res.status(200).send({company});
            }
        }
    });
}

function getCompanies(req,res){
    var itemsPerPage = parseInt(req.params.itemsPerPage);
    if(req.params.page){
        var page = req.params.page;
    }else{
        var page = 1;
    }

    Company.find().sort('name').paginate(page, itemsPerPage, (err, companies, total) =>{
        if(err){
            res.status(500).send({message: "Error en el servidor"});
        }else{
            if(!companies){
                res.status(404).send({message: "No se encontraron compañias"});
            }else{
                res.status(200).send({
                    total_items: total,
                    companies: companies
                });
            }
        }
    });
}

module.exports = {
    saveCompany,
    updateCompany,
    getCompany,
    getCompanies
};