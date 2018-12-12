var restify = require('restify');

restify.plugins = require('restify-plugins');


var server = restify.createServer();

server.post('/signup', require('./signup.js'));

server.use(restify.plugins.bodyParser());

server.listen(8080, function () {
  console.log('%s listening at %s', server.name, server.url);
});