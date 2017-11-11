var mongoose = require('mongoose');
var Warehouse = mongoose.model('Warehouse');

var controller = {};

controller.getAll = function(req, res) {
  Warehouse.find(function (err, data) {
    if (err) {
      res.send(err);
    } else {
      res.json(data);
    }
  });
};

controller.getById = function (req, res) {
  var id = req.params.id;
  Warehouse.findOne({
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
  var warehouse = new Warehouse;

  warehouse.name = data.name;
  warehouse.description = data.description;

  warehouse.save(function (err) {
    if (err) {
      res.send(err);
    } else {
      return res.send(warehouse._id);
    }
  });
};

controller.delete = function (req, res) {
  var id = req.params.id;

  Warehouse.find({
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

  Warehouse.findOne({
    _id: id
  }, function (err, warehouse) {
    if (err) {
      res.send(err);
    } else {
      warehouse.name = data.name;
      warehouse.description = data.description;

      warehouse.save(function (err) {
        if (err) {
          res.send(err);
        } else {
          return res.send(warehouse._id);
        }
      });
    }
  });
};

module.exports = controller;
