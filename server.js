var restify = require('restify');
var mongodb = require('mongodb').MongoClient;
restify.plugins = require('restify-plugins');
const config = require('./config');


var server = restify.createServer();

server.post('/signup', require('./signup.js'));
server.post('/login', require('./login.js'));

server.use(restify.plugins.bodyParser());

server.listen(8080, function () {
  console.log('%s listening at %s', server.name, server.url);
});

