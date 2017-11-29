var mongoose = require('mongoose');
var Order = mongoose.model('Order');

var controller = {};

controller.getAll = function(req, res) {
  Order.find(function (err, data) {
    if (err) {
      res.send(err);
    } else {
      res.json(data);
    }
  });
};

controller.getById = function (req, res) {
  //TODO
};

controller.create = function (req, res) {
  //TODO
};

controller.delete = function (req, res) {
  //TODO
};

controller.edit = function (req, res) {
  //TODO
};

module.exports = controller;
