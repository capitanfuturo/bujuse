var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload'
});

var controller = require('./report.controller');

var BASE_PATH = '/report';

router.get(BASE_PATH + '/stock', auth, controller.getStock);
router.get(BASE_PATH + '/monthly-sales', auth, controller.getMonthlySales);

module.exports = router;
