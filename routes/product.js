'use strict'

var express = require('express');
var ProductController = require('../controllers/product');

var api = express.Router();
var md_auth = require('../middlewares/authenticate');

var multipart = require('connect-multiparty');
//var md_upload = multipart({ uploadDir: './uploads/users'});

//Rutas
api.post('/product', md_auth.ensureAuth, ProductController.saveProduct);
api.put('/product/:id', md_auth.ensureAuth, ProductController.updateProduct);
api.get('/product/:id', md_auth.ensureAuth, ProductController.getProduct);
api.get('/products/:itemsPerPage/:page?', md_auth.ensureAuth, ProductController.getProducts);

module.exports = api;