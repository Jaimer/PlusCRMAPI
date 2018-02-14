'use strict'

var express = require('express');
var VenueController = require('../controllers/venue');

var api = express.Router();
var md_auth = require('../middlewares/authenticate');

var multipart = require('connect-multiparty');
//var md_upload = multipart({ uploadDir: './uploads/users'});

//Rutas
api.post('/venue', md_auth.ensureAuth, VenueController.saveVenue);
api.put('/venue/:id', md_auth.ensureAuth, VenueController.updateVenue);
api.get('/venue/:id', md_auth.ensureAuth, VenueController.getVenue);
api.get('/venues/:itemsPerPage/:page?', md_auth.ensureAuth, VenueController.getVenues);

module.exports = api;