var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');

var index = require('./routes/index');

var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(3001);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

// SOCKETS
io.on('connection', function (socket) {
  //socket.emit('news', { hello: 'world' });
  socket.on('canvas', function (data) {
    console.log("mis dans la fifo");
    export_canvas(data);
  });
});


module.exports = app;

function export_canvas(data)
{
  var pipe = fs.createWriteStream('img_queue');
  var img_b64 = data.split(',')[1];
  var buffer = new Buffer(img_b64, 'base64');
  pipe.write(buffer);
  pipe.end();
}
