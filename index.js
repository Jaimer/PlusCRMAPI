'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var webport = 3977;
var port = process.env.PORT || webport;
var dbhost = 'localhost';
var dbport = '27017';
var dbname = 'PlusCRM';
var dbuser = 'plus';
var dbpassword = 'plus';

mongoose.connect('mongodb://'+dbuser+':'+dbpassword+'@'+dbhost+':'+dbport+'/'+dbname,(err, res) => {
    if(err){
        throw err;
    }else{
        console.log("Conexión correcta a la base de datos...");

        app.listen(port, function(){
            console.log("Servidor API REST escuchando en http://localhost:"+port);
        });
    }
});