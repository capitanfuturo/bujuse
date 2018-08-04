var mongoose = require('mongoose');

var SeasonSchema = new mongoose.Schema({
  name: {
    type: String,
    enum: ['FW', 'SS']
  },
  year: Number
});

module.exports = mongoose.model('Season', SeasonSchema);
