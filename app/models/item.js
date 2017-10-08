var mongoose = require('mongoose');

var ItemSchema = new mongoose.Schema({
  model: String,
  category: {
    type: String,
    enum: ['CSP', 'TOP', 'VES', 'PAN', 'TUT', 'GON', 'GIL', 'FEL', 'TRI', 'CAP', 'BAG', 'SCI']
  },
  gender: {
    type: String,
    enum: ['M', 'F', 'U', 'BM', 'BF', 'BU']
  },
  size: {
    type: String,
    enum: ['S', 'M', 'L', 'U', '1', '3', '5', '7', '9', '11']
  }
});

module.exports = mongoose.model('Item', ItemSchema);
