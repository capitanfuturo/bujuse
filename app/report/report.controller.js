var mongoose = require('mongoose');
var Operation = mongoose.model('Operation');

var controller = {};

controller.getMonthlySales = function (req, res) {
  var cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - 30);

  Operation.find({
      creationDate: {
        $gt: cutoff
      },
      type: 'O'
    })
    .populate('item')
    .populate('warehouse')
    .exec(function (err, data) {
      if (err) {
        res.send(err);
      } else {
        var size = data.length;
        // A map with key = warehouse._id + "|" + item.id
        // and value {warehouse.name, item.model, item.category, item.gender, item.size, quantity, price}
        var result = new Map();
        for (var i = 0; i < size; i++) {
          var row = data[i];
          if (row.item && row.item._id && row.warehouse && row.warehouse._id) {
            var key = row.item._id;
            if (row.warehouse) {
              key = row.warehouse._id + '|' + row.item._id;
            }

            if (result.has(key)) {
              var value = result.get(key);
              value.quantity = value.quantity + row.quantity;
              value.price = value.price + row.price;
              result.set(key, value);
            } else {
              var warehouse = '';
              if (row.warehouse) {
                warehouse = row.warehouse.name;
              }
              var quantity = row.quantity;
              var price = row.price;

              var newValue = {
                "warehouse": warehouse,
                "model": row.item.model,
                "category": row.item.category,
                "gender": row.item.gender,
                "size": row.item.size,
                "quantity": quantity,
                "price": price
              };
              result.set(key, newValue);
            }
          }
        } //end for

        var arr = [];
        result.forEach(function (item, key, mapObj) {
          arr.push(item);
        });
        res.json(arr);
      }
    });
};

controller.getStock = function (req, res) {
  Operation.find()
    .populate('item')
    .populate('warehouse')
    .exec(function (err, data) {
      if (err) {
        res.send(err);
      } else {
        var size = data.length;
        // A map with key = warehouse._id + "|" + item.id
        // and value {warehouse.name, item.model, item.category, item.gender, item.size, quantity}
        var result = new Map();

        for (var i = 0; i < size; i++) {
          var row = data[i];
          if (row.item && row.item._id && row.warehouse && row.warehouse._id) {
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
          }

        } //end for

        var arr = [];
        result.forEach(function (item, key, mapObj) {
          arr.push(item);
        });
        res.json(arr);
      }
    });
};

module.exports = controller;
