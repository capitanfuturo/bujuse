var mongoose = require('mongoose');
var Item = mongoose.model('Item');
var Season = mongoose.model('Season');

var controller = {};

controller.getAll = function (req, res) {
  Item.find()
  .populate('seasons')
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
  Item.findOne({_id: id})
  .populate('seasons')
  .exec( function (err, data) {
    if (err) {
      res.send(err);
    } else {
      res.json(data);
    }
  });
};

controller.create = function (req, res) {
  var data = req.body;
  var item = new Item;

  item.model = data.model;
  item.note = data.note;
  item.category = data.category;
  item.gender = data.gender;
  item.size = data.size;
  item.price = data.price;
  item.target = data.target;

  var seasons = [];
  var size = data.seasons.length;
  for (var i = 0; i < size; i++) {
    seasons.push(data.seasons[i]._id);
  }
  item.seasons = seasons;

  item.save(function (err) {
    if (err) {
      res.send(err);
    } else {
      return res.send(item._id);
    }
  });
};

controller.delete = function (req, res) {
  var id = req.params.id;

  Item.find({
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

  Item.findOne({
    _id: id
  }, function (err, item) {
    if (err) {
      res.send(err);
    } else {
      item.model = data.model;
      item.note = data.note;
      item.category = data.category;
      item.gender = data.gender;
      item.size = data.size;
      item.price = data.price;
      item.target = data.target;

      var seasons = [];
      var size = data.seasons.length;
      for (var i = 0; i < size; i++) {
        seasons.push(data.seasons[i]._id);
      }
      item.seasons = seasons;

      item.save(function (err) {
        if (err) {
          res.send(err);
        } else {
          return res.send(item._id);
        }
      });
    }
  });
};

module.exports = controller;
