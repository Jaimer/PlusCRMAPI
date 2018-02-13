'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

//cargar rutas
var user_routes = require('./routes/user');
var supplier_routes = require('./routes/supplier');
var product_routes = require('./routes/product');
var client_routes = require('./routes/client');
var company_routes = require('./routes/company');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// configurar cabeceras http
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');

    next();
});

// rutas base
app.use('/api', user_routes);
app.use('/api', supplier_routes);
app.use('/api', product_routes);
app.use('/api', client_routes);
app.use('/api', company_routes);

module.exports = app;