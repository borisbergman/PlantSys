#!/usr/bin/env node

var app = require('../app');
var debug = require('debug')('PlantSys:server');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var storage = require('../storage');

io.on('connection', function(socket) {
  socket.on('message', function(value) {

    storage[value.id].checked = value.status.checked;
    storage[value.id].time = value.status.time;


    if(value.status.checked) {
      var interval = setInterval(function() {
          let timeid = value.id
          if(storage[timeid].time < 1) {
            clearInterval(interval);
            storage[timeid].checked = false;
          } else {
            storage[timeid].time--;
          }
          io.emit('switched', {
            id: timeid,
            status : storage[timeid]
          });
      }, 1000);
    }

  });

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });



});



/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Listen on provided port, on all network interfaces.
 */

http.listen(port);
http.on('error', onError);
http.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = http.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
