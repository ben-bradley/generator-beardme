// DEPENDENCIES
// ============
var express   = require('express'),<% if (ssl == false) { %>
    http      = require('http'),<% } %><% if (ssl == true) { %>
    https     = require('https'),
    pem       = require('pem'),<% } %><% if (winston == true) { %>
    winston   = require('winston'),<% } %>
    mongoose  = require('mongoose'),
    fs        = require('fs'),
    path      = require('path');

var config    = require('./config/config'),
    paths     = {
      api     : path.resolve(__dirname+'/api'),
      schemas : path.resolve(__dirname+'/schemas')
    },
    app       = express();

<% if (winston == true) { %>// LOGGING CONFIGURATION
// =====================
app.logger = new(winston.Logger)({
  transports: [
    new (winston.transports.File)({
      filename: './server/logs/app.log',
      json: false
    })
  ]
});
var logStream = {
  write: function(message, encoding){
    app.logger.info(message.replace(/\n+/,''));
  }
};

<% } %>// DATABASE CONFIGURATION
// ======================
var dbstring  = 'mongodb://'+
                ((config.db.username && config.db.password) ? config.db.username+':'+config.db.password+'@' : '')+
                config.db.host+':'+config.db.port+'/'+config.db.dbname,
    db        = mongoose.createConnection(dbstring);
db.on('error', console.error.bind(console, 'DB connection error:'));
db.once('open', function callback () {
  console.log('Connected to ' + config.db.dbname);
  fs.readdir(paths.schemas, function(err, files) {
    files.forEach(function(file) {
      if (!/\.js$/.test(file)) return false;
      require(paths.schemas+'/'+file)(db);
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
  app.use(express.session({ secret: config.sessionSecret }));<% if (winston == true) { %>
  app.use(express.logger({ stream: logStream }));<% } %>
  app.use(app.router);
});

// READ THE API MODULES
// ====================
fs.readdir(paths.api, function(err, files) {
  files.forEach(function(file) {
    if (!/\.js$/.test(file)) return false;
    require(paths.api+'/'+file)(app, db);
  });
});

// KICK THIS PIG!
// ==============
<% if (ssl == false) { %>var server = http.createServer(app);
server.listen(config.port);<% } %><% if (ssl == true) { %>pem.createCertificate({ days: 1, selfSigned: true }, function(err, keys) {
  https.createServer({ key: keys.serviceKey, cert: keys.certificate }, app).listen(config.port);
});<% } %>

console.log('\n\nYou\'ve been Bearded!\n\nPlease go to http<% if (ssl == true) { %>s<% } %>://localhost:' + config.port + ' to wear your Beard\n\n');
