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

app.get('/api/items', function (req, res, next) {
  Item.find({}, function (err, items) {
    console.log(items);

    if (err) {
      return next(err);
    }

    if (!items) {
      return res.status(404).send({ message: 'No items found.' });
    }

    res.send(items);
  });
});

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
  var whoFor = req.body.whoFor;

  var item = new Item({
    name: name,
    url: url,
    price: price,
    isBought: isBought,
    assignee: assignee,
    whoFor: whoFor
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

app.get('/api/items/seek-and-destroy-all', function (req, res) {
  Item.find({}).remove().exec();
  res.send({
    message: 'All items deleted'
  });
});

app.get('/api/items/:id', function (req, res, next) {
  var id = req.params.id;
  Item.findOne({
    _id: id
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

app.put('/api/items/:id/:prop', function (req, res, next) {
  var id = req.params.id;
  var prop = req.params.prop;
  // var name = req.body.name;
  // var url = req.body.url;
  // var price = req.body.price;
  // var isBought = req.body.isBought;
  // var assignee = req.body.assignee;
  // var whoFor = req.body.whoFor;
  var newValue = req.body[prop];
  Item.findOne({
    _id: id
  }, function (err, item) {
    // item.name = name;
    // item.url = url;
    // item.price = price;
    // item.isBought = isBought;
    // item.assignee = assignee;
    // item.whoFor = whoFor;
    item[prop] = newValue;

    item.save(function (err) {
      if (err) {
        return next(err);
      }
      res.status(200).end();
    });
  });
});

app.get('/api/items/:id/seek-and-destroy', function (req, res, next) {
  var id = req.params.id;
  var item = Item.findOne({
    _id: id
  });
  var itemName = item.name;
  item.remove().exec();
  res.send({
    message: itemName + ' has been removed'
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
