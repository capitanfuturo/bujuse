var mongoose = require('mongoose');

var ItemSchema = new mongoose.Schema({
  model: String,
  category: {
    type: String,
    enum: ['CSP', 'TOP', 'VES', 'PAN', 'TUT', 'GON', 'GIL', 'FEL', 'TRI', 'CAP', 'BAG', 'SCI']
  },
  gender: {
    type: String,
    enum: ['G_M', 'G_F', 'G_U', 'G_BM', 'G_BF', 'G_BU']
  },
  size: {
    type: String,
    enum: ['S_S', 'S_M', 'S_L', 'S_U', 'S_1', 'S_3', 'S_5', 'S_7', 'S_9', 'S_11']
  },
  price: Number
});

module.exports = mongoose.model('Item', ItemSchema);
