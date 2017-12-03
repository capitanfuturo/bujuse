var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload'
});

var controller = require('./customer.controller');

var BASE_PATH = '/customer';

router.get(BASE_PATH, auth, controller.getAll);
router.get(BASE_PATH + '/:id', auth, controller.getById);

router.post(BASE_PATH, auth, controller.create);

router.put(BASE_PATH, auth, controller.edit);

router.delete(BASE_PATH + '/:id', auth, controller.delete);

module.exports = router;
