var mongoose = require('mongoose');
var Order = mongoose.model('Order');
var Operation = mongoose.model('Operation');
var controller = {};

controller.getAll = function (req, res) {
  var showDelivered = req.query.showDelivered;
  if (showDelivered && showDelivered=='true') {
    Order.find()
      .populate('customer')
      .populate('warehouse')
      .exec(function (err, data) {
        if (err) {
          res.send(err);
        } else {
          res.json(data);
        }
      });
  } else {
    Order.find({
        'state': {
          $in: ['NEW', 'WORKING', 'READY']
        }
      })
      .populate('customer')
      .populate('warehouse')
      .exec(function (err, data) {
        if (err) {
          res.send(err);
        } else {
          res.json(data);
        }
      });
  }

};

controller.getById = function (req, res) {
  var id = req.params.id;
  Order.findOne({
      _id: id
    })
    .populate('customer')
    .populate('warehouse')
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
  order.customerName = data.customerName;
  order.warehouse = data.warehouse;
  order.state = "NEW";
  order.elements = data.elements;
  order.isLoadOrder = data.isLoadOrder;

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
      order.customerName = data.customerName;
      order.warehouse = data.warehouse;
      order.isLoadOrder = data.isLoadOrder;

      if (data.state == 'READY') {
        // case upload to warehouse
        var size = order.elements.length;
        for (var i = 0; i < size; i++) {
          var element = order.elements[i];
          var operation = new Operation;
          operation.creationDate = new Date();
          operation.type = 'I';
          operation.quantity = element.quantity;
          operation.item = element.itemId;
          operation.warehouse = order.warehouse;
          operation.price = element.price;
          operation.note = order.customerName;
          operation.save();
        }
      } else if (data.state == 'DELIVERED') {
        // case download to warehouse
        var size = order.elements.length;
        for (var i = 0; i < size; i++) {
          var element = order.elements[i];
          var operation = new Operation;
          operation.creationDate = new Date();
          operation.type = 'O';
          operation.quantity = element.quantity;
          operation.item = element.itemId;
          operation.warehouse = order.warehouse;
          operation.price = element.price;
          operation.note = order.customerName;
          operation.save();
        }
      }

      order.state = data.state;
      if(order.state == 'READY' && order.isLoadOrder){
        // change to DELIVERED without download the warehouse
        order.state = 'DELIVERED';
      }

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
