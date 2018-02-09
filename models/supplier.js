'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var timestamps = require('mongoose-timestamp');

var SupplierSchema = Schema({
    name: String,
    id_type: String,
    id: String,
    address: String,
    phone: String,
    ext: String,
    mobile: String,
    email: String
});
SupplierSchema.plugin(timestamps);

module.exports = mongoose.model('Supplier', SupplierSchema);