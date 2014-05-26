// CONFIG
// ======
module.exports = {

  // port to start the app on
  port: <%= inputs.httpPort %>,

  // this could be anything, I chose to use the date
  sessionSecret: ''+new Date().getTime(),

  // config options for the Mongoose connection
  db: {
    //username: 'dbusername',
    //password: 'dbpassword',
    host: '<%= inputs.mongoHost %>',
    port: <%= inputs.mongoPort %>,
    dbname: '<%= inputs.mongoDatabase %>'
  }

};
