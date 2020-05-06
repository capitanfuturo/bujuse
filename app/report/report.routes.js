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
router.get(BASE_PATH + '/quarterly-sales', auth, controller.getQuarterlySales);
router.get(BASE_PATH + '/yearly-sales/:year', auth, controller.getYearlySales);
router.get(BASE_PATH + '/five-years-sales', auth, controller.getLastFiveYearsSales);
router.get(BASE_PATH + '/target/:seasonId', auth, controller.getTarget);
router.get(BASE_PATH + '/customers-total-sales', auth, controller.getCustomersTotalSales);
router.get(BASE_PATH + '/customer-sales/:customerId', auth, controller.getCustomerSales);
router.get(BASE_PATH + '/not-sent-orders/', auth, controller.getNotSentOrders);

module.exports = router;