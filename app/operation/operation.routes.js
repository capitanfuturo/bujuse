var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload'
});

var controller = require('./operation.controller');

var BASE_PATH = '/operation';

router.get(BASE_PATH, auth, controller.getAll);
router.get(BASE_PATH + '/:id', auth, controller.getById);
router.get(BASE_PATH + '/days/:days', auth, controller.getByDays);

router.post(BASE_PATH, auth, controller.create);

router.put(BASE_PATH, auth, controller.edit);

router.delete(BASE_PATH + '/:id', auth, controller.delete);

module.exports = router;
