// CONFIG
// ======
module.exports.dev = {

  // port to start the app on
  port: <%= inputs.httpPort %>,

  // this could be anything, I chose to use the date
  sessionSecret: ''+new Date().getTime(),

  // config options for the Mongoose connection
  db: '<%= inputs.devDb %>'

};
module.exports.test = {

  // port to start the app on
  port: <%= inputs.httpPort %>,

  // this could be anything, I chose to use the date
  sessionSecret: ''+new Date().getTime(),

  // config options for the Mongoose connection
  db: '<%= inputs.testDb %>'

};
module.exports.prod = {

  // port to start the app on
  port: <%= inputs.httpPort %>,

  // this could be anything, I chose to use the date
  sessionSecret: ''+new Date().getTime(),

  // config options for the Mongoose connection
  db: '<%= inputs.prodDb %>'

};
