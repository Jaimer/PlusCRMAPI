'use strict'

var express = require('express');
var SupplierController = require('../controllers/supplier');

var api = express.Router();
var md_auth = require('../middlewares/authenticate');

var multipart = require('connect-multiparty');
//var md_upload = multipart({ uploadDir: './uploads/users'});

api.post('/supplier', md_auth.ensureAuth, SupplierController.saveSupplier);
api.put('/supplier/:id', md_auth.ensureAuth, SupplierController.updateSupplier);
api.get('/supplier/:id', md_auth.ensureAuth, SupplierController.getSupplier);
api.get('/suppliers/:itemsPerPage/:page?', md_auth.ensureAuth, SupplierController.getSuppliers);

module.exports = api;