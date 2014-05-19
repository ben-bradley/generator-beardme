// DEPENDENCIES
// ============
var express   = require('express'),
    http      = require('http'),
    mongoose  = require('mongoose'),
    fs        = require('fs'),
    path      = require('path');

var config    = require('./config/config'),
    paths     = {
      api     : path.resolve(__dirname+'/api'),
      schemas : path.resolve(__dirname+'/schemas')
    };

var dbstring  = 'mongodb://'+
                ((config.db.username) ? config.db.username : '')+
                ((config.db.password) ? ':'+config.db.password : '')+
                config.db.host+
                ((config.db.port) ? ':'+config.db.port : '')+
                '/'+config.db.name,
    db        = mongoose.createConnection(dbstring),
    schemas   = {};

var app       = express(),
    server    = http.createServer(app);

// DATABASE CONFIGURATION
// ======================
db.on('error', console.error.bind(console, 'DB connection error:'));
db.once('open', function callback () {
  console.log('Connected to ' + config.db.name);
  fs.readdir(paths.schemas, function(err, files) {
    files.forEach(function(file) {
      if (!/\.js$/.test(file)) return false;
      var Schema = require(paths.schemas+'/'+file);
      schemas[Schema.name] = new Schema(db);
    });
  });
});

// APP CONFIGURATION
// =================
app.configure(function() {
  app.use(express['static'](__dirname + '/../public'));
  app.use(express.errorHandler({
    dumpExceptions: true,
    showStack: true
  }));
  app.use(express.bodyParser());
  app.use(express.cookieParser());
  app.use(express.session({ secret: config.sessionSecret }));
  app.use(app.router);
});

// READ THE API MODULES
// ====================
fs.readdir(paths.api, function(err, files) {
  files.forEach(function(file) {
    if (!/\.js$/.test(file)) return false;
    require(paths.api+'/'+file)(app, schemas);
  });
});

// KICK THIS PIG!
// ==============
server.listen(config.port);

console.log('\n\nYou\'ve been Bearded!\n\nPlease go to http://localhost:' + config.port + ' to wear your Beard\n\n');
