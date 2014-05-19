// CONFIG
// ======
module.exports = {

  // port to start the app on
  port: 8000,

  // this could be anything, I chose to use the date
  sessionSecret: ''+new Date().getTime(),

  // config options for the Mongoose connection
  db: {
    // username: 'dbusername',
    // password: 'dbpassword',
    host: 'localhost',
    name: 'dbname',
    port: 27017 // 27017 is default, you could omit this line
  }

};
