var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser')


var recorder = require('./recorder');

var app = express();
app.use(bodyParser.raw({ inflate: true, limit: '100kb', type: '*/*' }))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.get('/',function(req,res){
  res.json(recorder.get());
});

app.get('/favicon.ico',function(req,res){
  res.status(404).send("");
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var data = {
    body: req.body.toString(),
    method: req.method,
    headers: req.headers,
    cookies: req.cookies,
    url: req.url
  }
  recorder.rec(data);
  res.json({});
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
