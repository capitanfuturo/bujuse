var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload'
});

var controller = require('./orderElement.controller');

var BASE_PATH = '/order-element';

router.post(BASE_PATH, auth, controller.create);

module.exports = router;
