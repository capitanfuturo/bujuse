// grab the model
var Warehouse = require('./models/warehouse');
var Item = require('./models/item');
var Operation = require('./models/operation');

module.exports = function (app) {

  // handle things like api calls
  // authentication routes

  var reqLogger = function (req, res, next) {
    var method = req.method;
    var url = req.originalUrl;
    //uncomment for debug
    //console.log('--> ' + method + ' ' + url);
    next();
  }

  app.use(reqLogger);

  // route to handle finding goes here (app.get)
  app.get('/api/warehouse', function (req, res) {
    Warehouse.find(function (err, data) {
      if (err) {
        res.send(err);
      } else {
        res.json(data);
      }
    });
  });

  app.get('/api/warehouse/:id', function (req, res) {
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
  });

  app.get('/api/item', function (req, res) {
    Item.find(function (err, data) {
      if (err) {
        res.send(err);
      } else {
        res.json(data);
      }
    });
  });

  app.get('/api/item/:id', function (req, res) {
    var id = req.params.id;
    Item.findOne({
      _id: id
    }, function (err, data) {
      if (err) {
        res.send(err);
      } else {
        res.json(data);
      }
    });
  });

  app.get('/api/operation', function (req, res) {
    Operation.find()
      .populate('item')
      .populate('warehouse')
      .exec(function (err, data) {
        if (err) {
          res.send(err);
        } else {
          res.json(data);
        }
      });
  });

  app.get('/api/operation/:id', function (req, res) {
    var id = req.params.id;
    Operation.findOne({
        _id: id
      })
      .populate('item')
      .populate('warehouse')
      .exec(function (err, data) {
        if (err) {
          res.send(err);
        } else {
          res.json(data);
        }
      });
  });

  app.get('/api/report/stock', function (req, res) {
    Operation.find()
      .populate('item')
      .populate('warehouse')
      .exec(function (err, data) {
        if (err) {
          res.send(err);
        } else {
          var size = data.length;
          /*
           * A map with key = warehouse._id + "|" + item.id
           * and value {warehouse.name, item.model, item.category, item.gender, item.size, quantity}
           */
          var result = new Map();

          for (var i = 0; i < size; i++) {
            var row = data[i];
            var key = row.item._id;
            if (row.warehouse) {
              key = row.warehouse._id + '|' + row.item._id;
            }

            if (result.has(key)) {
              var value = result.get(key);
              var type = row.type;
              if ('I' == type) {
                value.quantity = value.quantity + row.quantity;
              } else {
                value.quantity = value.quantity - row.quantity;
              }
              result.set(key, value);
            } else {
              var warehouse = '';
              if (row.warehouse) {
                warehouse = row.warehouse.name;
              }
              var quantity = 0;
              var type = row.type;
              if ('I' == type) {
                quantity = row.quantity;
              } else {
                quantity = -row.quantity;
              }

              var newValue = {
                "warehouse": warehouse,
                "item": row.item.model,
                "category": row.item.category,
                "gender": row.item.gender,
                "size": row.item.size,
                "quantity": quantity
              };
              result.set(key, newValue);
            }
          } //end for

          var arr = [];
          result.forEach(function (item, key, mapObj) {
            arr.push(item);
          });
          res.json(arr);
        }
      });
  });

  // route to handle creating goes here (app.post)
  app.post('/api/warehouse', function (req, res) {
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
  });

  app.post('/api/item', function (req, res) {
    var data = req.body;
    var item = new Item;

    item.model = data.model;
    item.note = data.note;
    item.category = data.category;
    item.gender = data.gender;
    item.size = data.size;
    item.price = data.price;

    item.save(function (err) {
      if (err) {
        res.send(err);
      } else {
        return res.send(item._id);
      }
    });
  });

  app.post('/api/operation', function (req, res) {
    var data = req.body;
    var operation = new Operation;

    operation.creationDate = data.creationDate;
    operation.type = data.type;
    operation.quantity = data.quantity;
    operation.item = data.item;
    operation.warehouse = data.warehouse;
    operation.price = data.price;

    operation.save(function (err) {
      if (err) {
        res.send(err);
      } else {
        return res.send(operation._id);
      }
    });
  });

  // route to handle update goes here (app.put)
  app.put('/api/warehouse', function (req, res) {
    var data = req.body;
    var id = data._id;

    Warehouse.findOne({
      _id: id
    }, function (err, item) {
      if (err) {
        res.send(err);
      } else {
        warehouse.name = data.name;
        warehouse.description = data.description;

        warehouse.save(function (err) {
          if (err) {
            res.send(err);
          } else {
            return res.send(item._id);
          }
        });
      }
    });
  });

  app.put('/api/item', function (req, res) {
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

        item.save(function (err) {
          if (err) {
            res.send(err);
          } else {
            return res.send(item._id);
          }
        });
      }
    });
  });

  app.put('/api/operation', function (req, res) {
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
  });

  // route to handle delete goes here (app.delete)
  app.delete('/api/warehouse/:id', function (req, res) {
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
  });

  app.delete('/api/item/:id', function (req, res) {
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
  });

  app.delete('/api/operation/:id', function (req, res) {
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
  });

  // frontend routes =========================================================
  // route to handle all angular requests
  app.get('*', function (req, res) {
    res.sendfile('./public/index.html'); // load our public/index.html file
  });

};
