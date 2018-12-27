var eventsource = require('restify-eventsource');
module.exports = eventsource({
    connections: 2
  });