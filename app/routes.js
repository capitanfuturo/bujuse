// grab the model
var Warehouse = require('./models/warehouse');
var Item = require('./models/item');
var Operation = require('./models/operation');

module.exports = function(app) {

  // handle things like api calls
  // authentication routes

  // route to handle finding goes here (app.get)
  app.get('/api/warehouse', function(req, res) {
    console.log('-- GET /api/warehouse');
    Warehouse.find(function(err, warehouse) {
      if (err) {
        console.log('-- GET KO');
        console.log(err);
        res.send(err);
      } else {
        console.log('-- GET OK');
        console.log(warehouse);
        res.json(warehouse);
      }
    });
  });

  app.get('/api/warehouse/:id/item', function(req, res) {
    var id = req.params.id;
    console.log('-- GET /api/warehouse/' + id + '/item');
    Warehouse.findOne({
      warehouse: id
    }, function(err, items) {
      if (err) {
        console.log('-- GET KO');
        console.log(err);
        res.send(err);
      } else {
        console.log('-- GET OK');
        console.log(items);
        res.json(items);
      }
    });
  });

  // route to handle creating goes here (app.post)
  app.post('/api/warehouse', function(req, res) {
    console.log('-- POST /api/warehouse');
    console.log(req.body);

    var data = req.body;
    var warehouse = new Warehouse;

    warehouse.name = data.name;
    warehouse.description = data.description;

    warehouse.save(function(err) {
      if (err) {
        console.log('-- POST KO');
        console.log(err);
        res.send(err);
      } else {
        console.log('-- POST OK');
        //return res.send(Warehouse);
      }
    });
  });

  // route to handle delete goes here (app.delete)
  app.delete('/api/warehouse/:id', function(req, res) {
    var id = req.params.id;
    console.log('-- DELETE /api/warehouse' + id);

    Warehouse.find({
      _id: id
    }).remove(function(err) {
      if (err) {
        console.log('-- DELETE KO');
        console.log(err);
        res.send(err);
      } else {
        console.log('-- DELETE OK');
        //return res.send(Warehouse);
      }
    });

  });

  // frontend routes =========================================================
  // route to handle all angular requests
  app.get('*', function(req, res) {
    res.sendfile('./public/index.html'); // load our public/index.html file
  });

};
