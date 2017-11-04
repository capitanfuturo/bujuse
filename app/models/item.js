var mongoose = require('mongoose');

var ItemSchema = new mongoose.Schema({
  model: String,
  note: String,
  category: {
    type: String,
    enum: ['CSP', 'TOP', 'VES', 'PAN', 'TUT', 'GON', 'GIL', 'FEL', 'TRI', 'CAP', 'BAG', 'SCI', 'JAC', 'BEL']
  },
  gender: {
    type: String,
    enum: ['G_M', 'G_F', 'G_U', 'G_BM', 'G_BF', 'G_BU']
  },
  size: {
    type: String,
    enum: ['S_S', 'S_M', 'S_L', 'S_U', 'S_X', 'S_1M', 'S_3M', 'S_6M', 'S_9M', 'S_12M', 'S_1', 'S_3', 'S_5', 'S_7', 'S_9', 'S_11']
  },
  price: Number
});

module.exports = mongoose.model('Item', ItemSchema);
