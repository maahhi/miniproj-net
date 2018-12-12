module.exports = function(server) {

  server.post('/signup', require('./Auth/signup.js'));
  server.post('/login', require('./Auth/login.js'));

};