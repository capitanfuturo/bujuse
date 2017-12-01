var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload'
});

var controller = require('./order.controller');

var BASE_PATH = '/order';

router.get(BASE_PATH, auth, controller.getAll);
router.get(BASE_PATH + '/:id', auth, controller.getById);

router.post(BASE_PATH, auth, controller.create);

router.put(BASE_PATH + '/:id/state', auth, function (req, res) {
  console.log(req);
  var id = req.params.id;
  var state = req.body;
  res.json('{result: "ok"}');
});

router.delete(BASE_PATH + '/:id', auth, controller.delete);

module.exports = router;
