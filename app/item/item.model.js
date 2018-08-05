var mongoose = require('mongoose');
var SeasonSchema = mongoose.model('Season');

var ItemSchema = new mongoose.Schema({
  model: {
    type: String,
    trim: true
  },
  note: {
    type: String,
    trim: true
  },
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
  price: Number,
  target: Number,
  seasons: [{type: mongoose.Schema.Types.ObjectId, ref: 'Season'}]
});

module.exports = mongoose.model('Item', ItemSchema);
