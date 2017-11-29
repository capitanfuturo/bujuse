var mongoose = require('mongoose');

var WarehouseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  }
});

module.exports = mongoose.model('Warehouse', WarehouseSchema);
