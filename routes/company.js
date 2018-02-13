'use strict'

var express = require('express');
var CompanyController = require('../controllers/company');

var api = express.Router();
var md_auth = require('../middlewares/authenticate');

var multipart = require('connect-multiparty');
//var md_upload = multipart({ uploadDir: './uploads/users'});

//Rutas
api.post('/company', md_auth.ensureAuth, CompanyController.saveCompany);
api.put('/company/:id', md_auth.ensureAuth, CompanyController.updateCompany);
api.get('/company/:id', md_auth.ensureAuth, CompanyController.getCompany);
api.get('/companies/:itemsPerPage/:page?', md_auth.ensureAuth, CompanyController.getCompanies);

module.exports = api;