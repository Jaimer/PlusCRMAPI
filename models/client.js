'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var timestamps = require('mongoose-timestamp');

var ClientSchema = Schema({
    name: String,
    id_type: String,
    id: String,
    address: String,
    phone: String,
    ext: String,
    mobile: String,
    email: String
});
ClientSchema.plugin(timestamps);

module.exports = mongoose.model('Client', ClientSchema);