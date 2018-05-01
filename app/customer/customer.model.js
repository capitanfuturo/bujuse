var mongoose = require('mongoose');

var CustomerSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true
  },
  phone: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    trim: true
  },
  address: {
    type: String,
    trim: true
  },
  note: {
    type: String,
    trim: true
  },
  breast: Number,
  waist: Number,
  hip: Number,
  legLength: Number,
  shoulder: Number
});

module.exports = mongoose.model('Customer', CustomerSchema);
