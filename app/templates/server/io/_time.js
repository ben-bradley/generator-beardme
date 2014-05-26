module.exports = function(app, db, io) {

  // SOCKET.IO CONFIGURATION
  // =======================
  io.sockets.on('connection', function(socket) {
    setInterval(function() { // every 1 sec, send the current timestamp to the browser
      socket.emit('time', new Date().getTime());
    }, 1000);
  });

};
