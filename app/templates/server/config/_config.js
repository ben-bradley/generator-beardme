// CONFIG
// ======
module.exports = {

  // port to start the app on
  port: <%= httpPort %>,

  // this could be anything, I chose to use the date
  sessionSecret: ''+new Date().getTime(),

  // config options for the Mongoose connection
  db: {
    //username: 'dbusername',
    //password: 'dbpassword',
    host: '<%= mongoHost %>',
    port: <%= mongoPort %>,
    dbname: '<%= mongoDatabase %>'
  }

};
