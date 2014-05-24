module.exports = function(app, db) {

  // check current user
  app.get('/api/ping', function(req, res) {
    res.send({ pong: new Date().getTime() });
  });

};
