// DEPENDENCIES
// ============
var express   = require('express'),
    bodyParser  = require('body-parser'),
    errorHandler = require('errorhandler'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    morgan = require('morgan'),<% if (inputs.ssl == false) { %>
    http      = require('http'),<% } %><% if (inputs.ssl == true) { %>
    https     = require('https'),
    pem       = require('pem'),<% } %><% if (inputs.winston == true) { %>
    winston   = require('winston'),<% } %>
    request   = require('request'),
    mongoose  = require('mongoose'),
    fs        = require('fs'),
    path      = require('path');

var config    = require('./config/config'),
    paths     = {
      api     : path.resolve(__dirname+'/api'),
      schemas : path.resolve(__dirname+'/schemas')
    },
    app       = module.exports = express();

<% if (inputs.winston == true) { %>// LOGGING CONFIGURATION
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
app.use(express.static(__dirname + '/../public'));
app.use(errorHandler({
  dumpExceptions: true,
  showStack: true
}));
app.use(bodyParser());
app.use(cookieParser());
app.use(session({ secret: config.sessionSecret }));<% if (inputs.winston == true) { %>
app.use(morgan({ stream: logStream }));<% } %>

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
<% if (inputs.ssl == false) { %>var server = http.createServer(app);
server.on('listening', function() { app.emit('listening'); });
server.listen(config.port);<% } %><% if (inputs.ssl == true) { %>pem.createCertificate({ days: 1, selfSigned: true }, function(err, keys) {
  var server = https.createServer({ key: keys.serviceKey, cert: keys.certificate }, app);
  server.on('listening', function() { app.emit('listening'); });
  server.listen(config.port);
});<% } %>

console.log('\n\nYou\'ve been Bearded!\n\nPlease go to http<% if (inputs.ssl == true) { %>s<% } %>://localhost:' + config.port + ' to wear your Beard\n\n');
