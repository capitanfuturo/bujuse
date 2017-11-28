var mongoose = require('mongoose');

var CustomerSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  address: String,
  breast: Number,
  waist: Number,
  hip: Number,
  legLength: Number,
  shoulder: Number
});

module.exports = mongoose.model('Customer', CustomerSchema);
