// modules =================================================
var mongoose = require('mongoose');

// config files
console.log('Retrieve configuration');
require('./config/db');

// connect to our mongoDB database
console.log('Connecting...');

console.log('Create fake user');
var User = mongoose.model('User');

var user = new User();
var secretName = 'root';
var secretEmail = 'root@bujuse.it';
var secretPassword = 'root';

user.name = secretName;
user.email = secretEmail;
user.setPassword(secretPassword);
user.save();
