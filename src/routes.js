const plugins = require('restify-plugins');
const errors = require('restify-errors');
const sse = require('./sse');

module.exports = function(server) {

  server.post('/signup', require('./Auth/signup.js'));
  server.post('/login', require('./Auth/login.js'));
  server.post('/creatroom', require('./room/createRoom.js'));
  server.post('/invite', require("./room/invite.js"))

  server.get('/whoami', (req, res, next) => {
    req.user.display_name = ""
    res.send(req.user);
    next()
  });

  server.get('/sse/:id', [sse.middleware() , (req, res, next) => {
    return next(errors.MethodNotAllowedError("Only event-stream allowed"))
  }]);

  let contact = require('./Controllers/contactController');
  server.get('/contact', contact.listContacts);
  server.post('/addContact', contact.addContact);

  let history = require('./Controllers/messageController');
  server.get('/history/:id', history.getHistory);

  server.get(
  '/*',
  plugins.serveStatic({
    directory: './client/dist',
    default: 'index.html'
  })
  )

};