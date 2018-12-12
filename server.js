var restify = require('restify');
const mongoose = require('mongoose');

restify.plugins = require('restify-plugins');
const config = require('./config');


var server = restify.createServer();

server.use(restify.plugins.bodyParser());
server.use(restify.plugins.fullResponse());

server.listen(8080, function () {
  console.log('%s listening at %s', server.name, server.url);
  mongoose.Promise = global.Promise;
  mongoose.connect(config.db.uri, { useNewUrlParser: true });

  const db = mongoose.connection;

  db.on('error', (err) => {
    console.error(err);
    process.exit(1);
  });

  db.once('open', () => {
    require('./routes')(server);
    console.log(`Server is listening on port ${config.port}`);
  });
});

