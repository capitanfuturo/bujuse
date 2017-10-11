// grab the model
var Warehouse = require('./models/warehouse');
var Item = require('./models/item');
var Operation = require('./models/operation');

module.exports = function(app) {

  // handle things like api calls
  // authentication routes

  var reqLogger = function(req, res, next) {
    var method = req.method;
    var url = req.originalUrl;
    console.log('--> ' + method + ' ' + url);
    next();
  }

  app.use(reqLogger);

  // route to handle finding goes here (app.get)
  app.get('/api/warehouse', function(req, res) {
    Warehouse.find(function(err, data) {
      if (err) {
        res.send(err);
      } else {
        res.json(data);
      }
    });
  });

  app.get('/api/item', function(req, res) {
    Item.find(function(err, data) {
      if (err) {
        res.send(err);
      } else {
        res.json(data);
      }
    });
  });

  app.get('/api/operation', function(req, res) {
    Operation.find(function(err, data) {
      if (err) {
        res.send(err);
      } else {
        res.json(data);
      }
    });
  });

  // route to handle creating goes here (app.post)
  app.post('/api/warehouse', function(req, res) {
    var data = req.body;
    var warehouse = new Warehouse;

    warehouse.name = data.name;
    warehouse.description = data.description;

    warehouse.save(function(err) {
      if (err) {
        res.send(err);
      } else {
        return res.send(warehouse._id);
      }
    });
  });

  // route to handle delete goes here (app.delete)
  app.delete('/api/warehouse/:id', function(req, res) {
    var id = req.params.id;

    Warehouse.find({
      _id: id
    }).remove(function(err) {
      if (err) {
        res.send(err);
      }
    });
  });

  // frontend routes =========================================================
  // route to handle all angular requests
  app.get('*', function(req, res) {
    res.sendfile('./public/index.html'); // load our public/index.html file
  });

};
