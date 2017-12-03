var mongoose = require('mongoose');
var Order = mongoose.model('Order');
var controller = {};

controller.getAll = function (req, res) {
  Order.find()
    .populate('customer')
    .exec(function (err, data) {
      if (err) {
        res.send(err);
      } else {
        res.json(data);
      }
    });
};

controller.getById = function (req, res) {
  var id = req.params.id;
  Order.findOne({
      _id: id
    })
    .populate('customer')
    .exec(function (err, data) {
      if (err) {
        res.send(err);
      } else {
        res.json(data);
      }
    });
};

controller.create = function (req, res) {
  var data = req.body;
  var order = new Order;

  order.creationDate = data.creationDate;
  order.deliveryDate = data.deliveryDate;
  order.deposit = data.deposit;
  order.customer = data.customer;
  order.state = "NEW";
  order.elements = data.elements;

  order.save(function (err) {
    if (err) {
      res.send(err);
    } else {
      return res.send(order._id);
    }
  });

};

controller.delete = function (req, res) {
  var id = req.params.id;

  Order.find({
    _id: id
  }).remove(function (err) {
    if (err) {
      res.send(err);
    } else {
      return res.send(id);
    }
  });
};

controller.edit = function (req, res) {
  var data = req.body;
  var id = data._id;

  Order.findOne({
    _id: id
  }, function (err, order) {
    if (err) {
      res.send(err);
    } else {
      order.creationDate = data.creationDate;
      order.deliveryDate = data.deliveryDate;
      order.deposit = data.deposit;
      order.customer = data.customer;
      order.state = data.state;
      order.elements = data.elements;

      order.save(function (err) {
        if (err) {
          res.send(err);
        } else {
          return res.send(order._id);
        }
      });
    }
  });
};

module.exports = controller;