var mongoose = require('mongoose');

var OperationSchema = new mongoose.Schema({
  creationDate: {
    type: Date,
    default: Date.now,
    index: true
  },
  type: {
    type: String,
    enum: ['I', 'O'],
    index: true
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
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer'
  },
  price: Number,
  note: {
    type: String,
    trim: true
  }
});

module.exports = mongoose.model('Operation', OperationSchema);
