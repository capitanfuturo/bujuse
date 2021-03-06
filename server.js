// server.js

console.log('[BUJUSE] starting the server...');

console.log('[BUJUSE] loading modules...');
// modules =================================================
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var passport = require('passport');
const debug = require('debug')
const appName = 'Bujuse'
debug('booting %s', appName)
console.log('[BUJUSE] modules loaded.');

// configuration ===========================================

console.log('[BUJUSE] loading configuration...');
// config files
require('./config/db');
require('./config/passport');

// set our port
var port = process.env.PORT || 9000;

// get all data/stuff of the body (POST) parameters
// parse application/json
app.use(bodyParser.json());

// parse application/vnd.api+json as json
app.use(bodyParser.json({
  type: 'application/vnd.api+json'
}));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: true
}));

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override'));

// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/public'));

console.log('[BUJUSE] configuration loaded.');

// routes ==================================================
console.log('[BUJUSE] routes registering...');
var authenticationRoutes = require('./app/authentication/authentication.routes');
var customerRoutes = require('./app/customer/customer.routes');
var warehouseRoutes = require('./app/warehouse/warehouse.routes');
var itemRoutes = require('./app/item/item.routes');
var operationRoutes = require('./app/operation/operation.routes');
var reportRoutes = require('./app/report/report.routes');
var orderRoutes = require('./app/order/order.routes');
var seasonRoutes = require('./app/season/season.routes')

app.use('/api', authenticationRoutes);
app.use('/api', customerRoutes);
app.use('/api', warehouseRoutes);
app.use('/api', itemRoutes);
app.use('/api', operationRoutes);
app.use('/api', reportRoutes);
app.use('/api', orderRoutes);
app.use('/api', seasonRoutes);

app.get('*', function (req, res) {
  res.sendfile('./public/index.html'); // load our public/index.html file
});

console.log('[BUJUSE] Routes registered.')

// error handlers
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401);
    res.json({"message" : err.name + ": " + err.message});
  }
});

// start app ===============================================
// startup our app at http://localhost:8080
app.listen(port);
console.log('[BUJUSE] listening on port:  ' + port);

// expose app
exports = module.exports = app;
console.log('[BUJUSE] Server started. Good work!')
