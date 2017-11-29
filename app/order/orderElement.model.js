var mongoose = require('mongoose');

var OrderElementSchema = new mongoose.Schema({
  item: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item'
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

module.exports = mongoose.model('OrderElement', OrderElementSchema);
