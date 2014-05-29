// PROCESS THE ARGS
// ================
var args = {};
process.argv.forEach(function(arg) {
  arg = arg.match(/^--([^=]+)=(.+)$/);
  if (arg)
    args[arg[1]] = arg[2];
});

// INIT THE APP
// ============
var async = require('async'),
    express = require('express'),
    app = module.exports = express(),
    server;

// BUILD THE APP
// ============
async.series([
  loadConfig,
  loadLogger,
  loadDb,
  loadMiddleware,
  loadApi,<% if (!inputs.ssl) { %>
  loadHttpServer,<% } %><% if (inputs.ssl) { %>
  loadHttpsServer,<% } %>
  loadSocketIO,
  startServer
]);

// LOAD THE APP CONFIG
// ===================
function loadConfig(done) {
  app.config = require('./config/config')[args.env || 'dev'];
  done();
}

// LOAD THE LOGGER
// ===============
function loadLogger(done) {
  var winston = require('winston');
  app.logger = new (winston.Logger)({
    transports: [
      new (winston.transports.File)({
        filename: './server/logs/app.log',
        json: false
      })
    ]
  });
  app.logger.stream = {
    write: function(message, encoding) {
      app.logger.info(message.replace(/\n+/,''));
    }
  };
  done();
}

// LOAD THE DB
// ===========
function loadDb(done) {
  var mongoose = require('mongoose');
  app.db = mongoose.createConnection('mongodb://'+app.config.db);
  app.db.on('error', function(err) {
    console.log('DB connection error:', err);
    done();
  });
  app.db.once('open', function(){
    console.log('\n\nDB connected: '+app.config.db+'\n\n');
    _eachModuleIn('schemas', function(file) {
      require(file)(app);
    });
    done();
  });
}

// LOAD THE MIDDLEWARE
// ===================
function loadMiddleware(done) {
  var express       = require('express'),
      bodyParser    = require('body-parser'),
      errorHandler  = require('errorhandler'),
      cookieParser  = require('cookie-parser'),
      session       = require('express-session'),
      morgan        = require('morgan');
  app.use(express.static(__dirname+'/../public'));
  app.use(errorHandler({ dumpExceptions: true, showStack: true }));
  app.use(bodyParser());
  app.use(cookieParser());
  app.use(session({ secret: app.config.sessionSecret }));
  app.use(morgan({ stream: app.logger.stream }));
  done();
}

// LOAD THE API
// ============
function loadApi(done) {
  _eachModuleIn('./api', function(file) {
    require(file)(app);
  });
  done();
}

// LOAD THE SERVER
// ================
<% if (!inputs.ssl) { %>function loadHttpServer(done) {
  var http = require('http');
  server = http.createServer(app);
  done();
}<% } %><% if (inputs.ssl) { %>function loadHttpsServer(done) {
  var https = require('https'),
      pem = require('pem');
  pem.createCertificate({ days: 1, selfSigned: true }, function(err, keys) {
    server = https.createServer({ key: keys.serviceKey, cert: keys.certificate }, app);
    done();
  });
}<% } %>

// LOAD SOCKETIO
// =============
function loadSocketIO(done) {
  var socketio = require('socket.io');
  app.io = socketio.listen(server);
  _eachModuleIn('./io', function(file) {
    require(file)(app);
  });
  done();
}

// START THE SERVER
// ================
function startServer(done) {
  server.listen(app.config.port);
  console.log('\n\nYou\'ve been Bearded!\n\nPlease go to http<% if (inputs.ssl) { %>s<% } %>://localhost:' + app.config.port + ' to wear your Beard\n\n');
  app.emit('started');
  done();
}

// Helper fn to load modules in a directory
function _eachModuleIn(dir, callback) {
  var fs = require('fs'),
      path = require('path'),
      dir = path.resolve(__dirname+'/'+dir);
  fs.readdir(dir, function(err, files) {
    files.forEach(function(file) {
      if (/.js$/.test(file))
        callback(dir+'/'+file);
    });
  });
}
