var mongoose = require('mongoose');
var Customer = mongoose.model('Customer');

var controller = {};

controller.getAll = function(req, res) {
  Customer.find(function (err, data) {
    if (err) {
      res.send(err);
    } else {
      res.json(data);
    }
  });
};

controller.getById = function (req, res) {
  var id = req.params.id;
  Customer.findOne({
    _id: id
  }, function (err, data) {
    if (err) {
      res.send(err);
    } else {
      res.json(data);
    }
  });
};

controller.create = function (req, res) {
  var data = req.body;
  var customer = new Customer;

  customer.name = data.name;
  customer.phone = data.phone;
  customer.email = data.email;
  customer.address = data.address;
  customer.breast = data.breast;
  customer.waist = data.waist;
  customer.hip = data.hip;
  customer.legLength = data.legLength;
  customer.shoulder = data.shoulder;
  customer.note = data.note;

  customer.save(function (err) {
    if (err) {
      res.send(err);
    } else {
      return res.send(customer._id);
    }
  });
};

controller.delete = function (req, res) {
  var id = req.params.id;

  Customer.find({
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

  Customer.findOne({
    _id: id
  }, function (err, customer) {
    if (err) {
      res.send(err);
    } else {

      customer.name = data.name;
      customer.phone = data.phone;
      customer.email = data.email;
      customer.address = data.address;
      customer.breast = data.breast;
      customer.waist = data.waist;
      customer.hip = data.hip;
      customer.legLength = data.legLength;
      customer.shoulder = data.shoulder;
      customer.note = data.note;

      customer.save(function (err) {
        if (err) {
          res.send(err);
        } else {
          return res.send(customer._id);
        }
      });
    }
  });
};

module.exports = controller;
