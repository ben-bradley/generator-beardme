module.exports = function(app) {

  // check current user
  app.get('/api/user', function(req, res) {
    res.send(req.session.user || { _loggedIn: false });
  });

  // do a user login
  app.post('/api/user', function(req, res) {
    var user = req.body;
    if (user.username == 'ben' && user.password == 'b')
      req.session.user = {
        _loggedIn: true,
        id: new Date().getTime(),
        username: user.username
      };
    else
      req.session.user = { _loggedIn: false };
    res.send(req.session.user);
  });

  // do a user logout
  app.delete('/api/user', function(req, res) {
    req.session.destroy();
    res.send({ _loggedIn: false });
  });

  // get all users
  app.get('/api/users', function(req, res) {
    app.db.model('User').find({}, function(err, users) {
      res.send(users);
    });
//    app.db.model('User').myfindall(function(err, users) {
//      res.send(users);
//    });
  });

};
