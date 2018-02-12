'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var timestamps = require('mongoose-timestamp');

var ProductSchema = Schema({
    code: String,
    aux_code: String,
    name: String,
    cost: Number,
    price: Number,
    description: String,
    type: String,
    IVA: String,
    ICE: String,
    IRBPNR: String,
    supplier: { type: Schema.ObjectId, ref: 'Supplier'}
});
ProductSchema.plugin(timestamps);

module.exports = mongoose.model('Product', ProductSchema);