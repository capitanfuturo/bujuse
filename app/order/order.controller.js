var mongoose = require('mongoose');
var Order = mongoose.model('Order');
var OrderElement = mongoose.model('OrderElement');

var controller = {};

controller.getAll = function (req, res) {
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
  var data = req.body;
  var order = new Order;

  order.creationDate = data.creationDate;
  order.deliveryDate = data.deliveryDate;
  order.deposit = data.deposit;
  order.customer = data.customer;
  order.state = "NEW";
  order.elements = [];

  var size = data.elements.length;
  for (var i = 0; i < size; i++) {
    var dataElement = data.elements[i];
    var element = new OrderElement;

    element.item = dataElement.item;
    element.fabric = dataElement.fabric;
    element.quantity = dataElement.quantity;
    element.note = dataElement.note;

    element.save(function (err) {
      order.elements.push(element._id);
    });
  }

  var wait = true;
  while(wait){
    if(order.elements.length == size){
      wait = false;
      console(wait);
      order.save(function (err) {
        if (err) {
          res.send(err);
        } else {
          return res.send(order._id);
        }
      });
    }
  }

};

controller.delete = function (req, res) {
  //TODO
};

controller.edit = function (req, res) {
  //TODO
};

module.exports = controller;
