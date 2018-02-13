'use strict'

var express = require('express');
var ClientController = require('../controllers/client');

var api = express.Router();
var md_auth = require('../middlewares/authenticate');

var multipart = require('connect-multiparty');
//var md_upload = multipart({ uploadDir: './uploads/users'});

//Rutas
api.post('/client', md_auth.ensureAuth, ClientController.saveClient);
api.put('/client/:id', md_auth.ensureAuth, ClientController.updateClient);
api.get('/client/:id', md_auth.ensureAuth, ClientController.getClient);
api.get('/clients/:itemsPerPage/:page?', md_auth.ensureAuth, ClientController.getClients);

module.exports = api;