#!/usr/bin/env node

var express = require('express');
var app = express();

var path = require("path")

var fs = require('graceful-fs');
//for babel to understand jsx
require('babel-register')({
  presets: ['es2015', 'react']
});

var Log = require('log'),
  log = new Log('debug', fs.createWriteStream('my.log'))

app.use(function(req, res, next) {
  GLOBAL.navigator = {
    userAgent: req.headers['user-agent']
  }
  next();
});
// global.navigator.userAgent = 'all'  // need to check it on server
app.engine('jade', require('jade').__express);
app.set('view engine', 'jade');
app.use(express.static(__dirname + '/public'));

var React = require("react");
var createDoc = require("./createDoc")

var renderToString = require('react-dom/server').renderToString
var match = require('react-router').match
var RouterContext = require('react-router').RouterContext
var routes = require('./routes')
var glob = require("glob")

var url = require('url');

app.get("/create", function(req, res) {
  var url_parts = url.parse(req.url, true);
  var query = url_parts.query;

  var answersObj = JSON.parse(query.answersObj)
  var docIndexes = JSON.parse(query.docIndexes)

  createDoc.create(docIndexes, answersObj,  function(err, filename) {
    if (err) res.send({"err" : err})
    else res.send({"filename":filename})
  });
})

app.get('*', function(req, res) {

  match({
    routes,
    location: req.url
  }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message)
    }
    else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    }
    else if (renderProps) {
      res.render('index', {
        react: renderToString(React.createElement(RouterContext, renderProps)),
      })
    }
    else {
      res.status(404).send('The page run away!')
    }
  })
})

app.listen(process.env.PORT || 3030, process.env.IP || "0.0.0.0", function() {
  console.log("App is running");
});
