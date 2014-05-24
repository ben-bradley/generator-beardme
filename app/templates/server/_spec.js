// SERVER SIDE TEST SUITE
var request = require('superagent'),
  expect = require('expect.js'),
  app = require('../../server.js');


// BEFORE HOOK
before(function(){
  this.server = http.createServer(app).listen(<%= httpPort %>);
});

// AFTER HOOK
after(function(done){
  this.server.close(done);
});

// TEST SUITES
describe('GET api/ping', function() {
  it('Should Return 200', function(done) {
    request.get('localhost:<%= httpPort %>/api/ping').end(function(res) {
      expect(res).to.exist;
      expect(res.status).to.equal(200);
      done();
    });
  });
});
