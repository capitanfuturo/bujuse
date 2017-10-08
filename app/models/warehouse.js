var mongoose = require('mongoose');

var WarehouseSchema = new mongoose.Schema({
  name: String,
  description: String
});

module.exports = mongoose.model('Warehouse', WarehouseSchema);
