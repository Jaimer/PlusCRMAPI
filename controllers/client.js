'use strict'
var path = require('path');
var fs = require('fs');
var mongoosePaginate = require('mongoose-pagination');
var Client = require('../models/client');

function saveClient(req,res){
    var client = new Client();
    var params = req.body;

    client.name = params.name;
    client.id_type = params.id_type;
    client.id = params.id;
    client.address = params.address;
    client.phone = params.phone;
    client.ext = params.ext;
    client.mobile = params.mobile;
    client.email = params.email;

    client.save((err, clientStored) => {
        if(err){
            res.status(500).send({message: "Error en el servidor"});
        }else{
            if(!clientStored){
                res.status(404).send({message: "No se pudo guardar el cliente"});
            }else{
                res.status(200).send({client: clientStored});
            }
        }
    });
}

function updateClient(req,res){
    var clientId = req.params.id;
    var update = req.body;

    Client.findByIdAndUpdate(clientId,update,(err, clientUpdated) => {
        if(err){
            res.status(500).send({message: "Error en el servidor"});
        }else{
            if(!clientUpdated){
                res.status(404).send({message: "No se pudo actualizar el cliente"});
            }else{
                res.status(200).send({client: clientUpdated});
            }
        }
    });
}

function getClient(req,res){
    var clientId = req.params.id;

    Client.findById(clientId, (err, client) => {
        if(err){
            res.status(500).send({message: "Error en el servidor"});
        }else{
            if(!client){
                res.status(404).send({message: "No se encontró el cliente"});
            }else{
                res.status(200).send({client});
            }
        }
    });
}

function getClients(req,res){
    var itemsPerPage = parseInt(req.params.itemsPerPage);
    if(req.params.page){
        var page = req.params.page;
    }else{
        var page = 1;
    }

    Client.find().sort('name').paginate(page, itemsPerPage, (err, clients, total) =>{
        if(err){
            res.status(500).send({message: "Error en el servidor"});
        }else{
            if(!clients){
                res.status(404).send({message: "No se encontraron clientes"});
            }else{
                res.status(200).send({
                    total_items: total,
                    clients: clients
                });
            }
        }
    });
}

module.exports = {
    saveClient,
    updateClient,
    getClient,
    getClients
};