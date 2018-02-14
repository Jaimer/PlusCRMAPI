'use strict'

var path = require('path');
var fs = require('fs');
var mongoosePaginate = require('mongoose-pagination');
var Venue = require('../models/venue');

function saveVenue(req,res){
    var venue = new Venue();
    var params = req.body;

    venue.pos_number = params.pos_number;
    venue.venue_munber = params.venue_munber;
    venue.address = params.address;

    venue.save((err, venueStored) => {
        if(err){
            res.status(500).send({message: "Error en el servidor"});
        }else{
            if(!venueStored){
                res.status(404).send({message: "No se pudo guardar el establecimiento"});
            }else{
                res.status(200).send({venue: venueStored});
            }
        }
    });
}

function updateVenue(req,res){
    var venueId = req.params.id;
    var update = req.body;

    Venue.findByIdAndUpdate(venueId, update, (err, venueUpdated) => {
        if(err){
            res.status(500).send({message: "Error en el servidor"});
        }else{
            if(!venueUpdated){
                res.status(404).send({message: "No se pudo actualizar el establecimiento"});
            }else{
                res.status(200).send({venue: venueUpdated});
            }
        }
    });
}

function getVenue(req, res){
    var venueId = req.params.id;

    Venue.findById(venueId, (err, venue) => {
        if(err){
            res.status(500).send({message: "Error en el servidor"});
        }else{
            if(!venue){
                res.status(404).send({message: "No se encontró el establecimiento"});
            }else{
                res.status(200).send({venue});
            }
        }
    });
}

function getVenues(req, res){
    var itemsPerPage = parseInt(req.params.itemsPerPage);
    if(req.params.page){
        var page = req.params.page;
    }else{
        var page = 1;
    }

    Venue.find().sort('venue_number').paginate(page, itemsPerPage, (err, venues, total) =>{
        if(err){
            res.status(500).send({message: "Error en el servidor"});
        }else{
            if(!venues){
                res.status(404).send({message: "No se encontraron establecimientos"});
            }else{
                res.status(200).send({
                    total_items: total,
                    venues: venues
                });
            }
        }
    });
}

module.exports = {
    saveVenue,
    updateVenue,
    getVenue,
    getVenues
};