var mongoose = require('mongoose');

var OrderElementSchema = new mongoose.Schema({
  itemId: {
    type: String,
    trim: true
  },
  itemFullName: {
      type: String,
      trim: true
  },
  fabric:{
    type: String,
    trim: true
  },
  quantity: Number,
  note: {
    type: String,
    trim: true
  }
});

module.exports = mongoose.model('OrderElementSchema', OrderElementSchema);

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
    enum: ['NEW', 'WORKING', 'READY', 'DELIVERED']
  },
  elements: [OrderElementSchema]
});

module.exports = mongoose.model('Order', OrderSchema);
