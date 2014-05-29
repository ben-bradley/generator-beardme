// SERVER SIDE TEST SUITE
var request = require('request'),
    expect = require('expect.js');


// BEFORE HOOK
before(function(done) {
  var app = require('../server');
  app.on('started', function() { done(); });
});

// TEST SUITES
describe('GET api/ping', function() {
  this.timeout(2000);

  it('should return "{ pong: <timestamp> }"', function(done) {
    request.get({
      url: 'http<% if (inputs.ssl) { %>s<% } %>://localhost:<%= inputs.httpPort %>/api/ping',<% if (inputs.ssl) { %>
      strictSSL: false, <% } %>
      json: true
    },
    function(err, res, json) {
      expect(res).to.exist;
      expect(res.statusCode).to.equal(200);
      expect(json.pong).to.exist;
      done();
    });
  });

});

describe('GET api/jsonp', function() {
  this.timeout(10000);

  it('should return .downloads', function(done) {
    request.get({
      url: 'http<% if (inputs.ssl) { %>s<% } %>://localhost:<%= inputs.httpPort %>/api/jsonp/https://api.npmjs.org/downloads/point/last-week/generator-beardme',<% if (inputs.ssl) { %>
      strictSSL: false, <% } %>
      json: true
    },
    function(err, res, json) {
      expect(res).to.exist;
      expect(res.statusCode).to.equal(200);
      expect(json.downloads).to.exist;
      done();
    });
  });

});
