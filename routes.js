module.exports = function(server) {

  server.post('/signup', require('./Auth/signup.js'));
  server.post('/login', require('./Auth/login.js'));

  server.get('/whoami', (req, res, next) => {
    res.send(req.user);
    next()
  });

  // server.get('/contact', require('./Contact/get'));
  // server.post('/addContact' /* put your callback here*/);

};