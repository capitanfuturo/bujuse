var mongoose = require('mongoose');
var Season = mongoose.model('Season');

var controller = {};

controller.getAll = function(req, res) {
  Season.find(function (err, data) {
    if (err) {
      res.send(err);
    } else {
      res.json(data);
    }
  });
};

controller.getById = function (req, res) {
  var id = req.params.id;
  Season.findOne({
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
  var season = new Season;

  season.name = data.name;
  season.year = data.year;

  season.save(function (err) {
    if (err) {
      res.send(err);
    } else {
      return res.send(season._id);
    }
  });
};

controller.delete = function (req, res) {
  var id = req.params.id;

  Season.find({
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

  Season.findOne({
    _id: id
  }, function (err, season) {
    if (err) {
      res.send(err);
    } else {
      season.name = data.name;
      season.year = data.year;

      season.save(function (err) {
        if (err) {
          res.send(err);
        } else {
          return res.send(season._id);
        }
      });
    }
  });
};

module.exports = controller;
