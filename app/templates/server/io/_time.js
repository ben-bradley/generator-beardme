module.exports = function(app) {

  // SOCKET.IO CONFIGURATION
  // =======================
  app.io.sockets.on('connection', function(socket) {
    setInterval(function() { // every 1 sec, send the current timestamp to the browser
      socket.emit('time', new Date().getTime());
    }, 1000);
  });

};
