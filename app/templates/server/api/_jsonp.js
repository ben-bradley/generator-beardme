var request = require('request');

module.exports = function(app) {

  // simple way to proxy JSON requests
  app.get(/\/api\/jsonp\/(.+)/, function(req, res) {
    request.get({ url: req.params[0], json: true }, function(err, r, json) {
      res.send(json);
    });
  });

};
