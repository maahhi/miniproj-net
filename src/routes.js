const plugins = require('restify-plugins');
module.exports = function(server) {

  server.post('/signup', require('./Auth/signup.js'));
  server.post('/login', require('./Auth/login.js'));
  server.post('/creatroom', require('./room/createRoom.js'));
  server.get('/joinroom', require("./room/joinroom.js"))

  server.get('/whoami', (req, res, next) => {
    res.send(req.user);
    next()
  });

  contact = require('./Controllers/contactController');
  server.get('/contact', contact.listContacts);
  server.post('/addContact', contact.addContact);
  server.get('/sse', require('./sse.js'))

  server.get(
  '/*',
  plugins.serveStatic({
    directory: './client/dist',
    default: 'index.html'
  })
  )

};