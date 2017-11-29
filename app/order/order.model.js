var mongoose = require('mongoose');

var OrderSchema = new mongoose.Schema({
  creationDate: {
    type: Date,
    default: Date.now
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer'
  },
  deliveryDate: {
    type: Date
  },
  deposit: Number,
  elements: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'OrderElement'
  }]
});

module.exports = mongoose.model('Order', OrderSchema);
