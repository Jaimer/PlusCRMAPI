'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

//cargar rutas
var user_routes = require('./routes/user');
var supplier_routes = require('./routes/supplier');
/*var album_routes = require('./routes/album');
var song_routes = require('./routes/song');` */

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
/*app.use('/api', album_routes);
app.use('/api', song_routes); */

module.exports = app;