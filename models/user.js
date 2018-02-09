'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var timestamps = require('mongoose-timestamp');

var UserSchema = Schema({
    first_name: String,
    last_name: String,
    email: String,
    password: String,
    role: String,
    image: String
});
UserSchema.plugin(timestamps);

module.exports = mongoose.model('User', UserSchema);