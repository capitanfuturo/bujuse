var mongoose = require('mongoose');

var OperationSchema = new mongoose.Schema({
  creationDate: {
    type: Date,
    default: Date.now
  },
  type: {
    type: String,
    enum: ['I', 'O']
  },
  quantity: Number,
  item: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item'
  },
  warehouse: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Warehouse'
  },
  price: Number,
  note: {
    type: String,
    trim: true
  }
});

module.exports = mongoose.model('Operation', OperationSchema);
