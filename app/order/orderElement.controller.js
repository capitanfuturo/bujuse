var mongoose = require('mongoose');
var OrderElement = mongoose.model('OrderElement');

var controller = {};

controller.create = function (req, res) {
  var data = req.body;
  var element = new OrderElement;

  element.item = data.item._id;
  element.fabric = data.fabric;
  element.quantity = data.quantity;
  element.note = data.note;

  element.save(function (err) {
    if (err) {
      res.send(err);
    } else {
      return res.send(element._id);
    }
  });
};

module.exports = controller;
