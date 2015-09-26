var swig = require('swig');
var React = require('react');
var Router = require('react-router');
var routes = require('./src/js/app/routes');
var express = require('express');
var path = require('path');
var async = require('async');
var request = require('request');
var xml2js = require('xml2js');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Item = require('./models/item');
var config = require('./config');

mongoose.connect(config.database);
mongoose.connection.on('error', function () {
  console.info('Error: Could not connect to MongoDB. Did you forget to run `mongod`?');
});

var app = express();

app.set('port', process.env.PORT || 6789);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

/**
 * POST /api/items
 * Adds new items to the database
 */
app.post('/api/items', function (req, res, next) {
  var name = req.body.name;
  var url = req.body.url;
  var price = req.body.price;
  var isBought = req.body.isBought;
  var assignee = req.body.assignee;

  var item = new Item({
    name: name,
    url: url,
    price: price,
    isBought: isBought,
    assignee: assignee
  });

  item.save(function (err) {
    if (err) {
      return next(err);
    }
    res.send({
      message: name + ' added successfully'
    });
  });
});

/**
 * GET /api/items/count
 * Returns the total number of items
 */
app.get('/api/items/count', function (req, res, next) {
  Item.count({}, function (err, count) {
    if (err) {
      return next(err);
    }
    res.send({
      count: count
    });
  });
});

app.get('/api/items/remove-all', function (req, res) {
  Item.find({}).remove().exec();
  res.send({
    message: 'All items deleted'
  });
});

app.get('/api/items/:name', function (req, res, next) {
  var name = req.params.name;
  Item.findOne({
    name: name
  }, function (err, item) {

    if (err) {
      return next(err);
    }
    if (!item) {
      return res.status(404).send({ message: 'Item not found.' });
    }

    res.send(item);
  });
});

app.use(function (req, res) {
  Router.run(routes, req.path, function (Handler) {
    var html = React.renderToString(React.createElement(Handler));
    var page = swig.renderFile('views/index.html', { html: html });
    res.send(page);
  });
});

var server = require('http').createServer(app);
var io = require('socket.io')(server);
var onlineUsers = 0;

io.sockets.on('connection', function (socket) {
  onlineUsers++;
  io.sockets.emit('onlineUsers', { onlineUsers: onlineUsers });

  socket.on('disconnect', function () {
    onlineUsers--;
    io.sockets.emit('onlineUsers', { onlineUsers: onlineUsers });
  });
});

server.listen(app.get('port'), function () {
  console.log('express server listening on port ' + app.get('port'));
});
