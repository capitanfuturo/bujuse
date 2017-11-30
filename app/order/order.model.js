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
  state : {
    type: String,
    enum: ['NEW', 'WORKING', 'DONE', 'CLOSED']
  },
  elements: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'OrderElement'
  }]
});

module.exports = mongoose.model('Order', OrderSchema);
