'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var timestamps = require('mongoose-timestamp');

var CompanySchema = Schema({
    name: String,
    ruc: String,
    com_name: String,
    resol: String,
    special: String,
    accounting: String,
    logo: String,
    emtype: String,
    timeout: Number,
    env: String,
    address: String,
    cert: String
});
CompanySchema.plugin(timestamps);

module.exports = mongoose.model('Company', CompanySchema);