module.exports = function(app) {

  // return a pong with the current time
  app.get('/api/ping', function(req, res) {
    res.send({ pong: new Date().getTime() });
  });

};
