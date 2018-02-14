'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var timestamps = require('mongoose-timestamp');

var VenueSchema = Schema({
    pos_number: String,
    venue_number: String,
    address: String
});

VenueSchema.plugin(timestamps);

module.exports = mongoose.model('Venue', VenueSchema);