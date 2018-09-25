var mongoose = require('mongoose');
var Operation = mongoose.model('Operation');

var controller = {};

controller.getAll = function (req, res) {
  Operation.find()
    .populate('item')
    .populate('warehouse')
    .populate('customer')
    .exec(function (err, data) {
      if (err) {
        res.send(err);
      } else {
        res.json(data);
      }
    });
};

controller.getByDays = function (req, res) {
  var days = req.params.days;
  var cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - days);

  Operation.find({
      creationDate: {
        $gt: cutoff
      }
    })
    .populate('item')
    .populate('warehouse')
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
  Operation.findOne({
      _id: id
    })
    .populate('item')
    .populate('warehouse')
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
  var operation = new Operation();

  operation.creationDate = data.creationDate;
  operation.type = data.type;
  operation.quantity = data.quantity;
  operation.item = data.item;
  operation.warehouse = data.warehouse;
  operation.customer = data.customer;
  operation.price = data.price;

  operation.save(function (err) {
    if (err) {
      res.send(err);
    } else {
      return res.send(operation._id);
    }
  });
};

controller.delete = function (req, res) {
  var id = req.params.id;

  Operation.find({
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

  Operation.findOne({
    _id: id
  }, function (err, operation) {
    if (err) {
      res.send(err);
    } else {
      operation.creationDate = data.creationDate;
      operation.type = data.type;
      operation.quantity = data.quantity;
      operation.item = data.item;
      operation.warehouse = data.warehouse;
      operation.customer = data.customer;
      operation.price = data.price;

      operation.save(function (err) {
        if (err) {
          res.send(err);
        } else {
          return res.send(operation._id);
        }
      });
    }
  });
};

module.exports = controller;
