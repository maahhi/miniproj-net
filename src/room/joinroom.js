
var Room = require('../model/Room.js');
var Rooms = require('../model/Rooms.js');
var watershed = require('watershed')
module.exports = function(req, res, next){ 
    console.log('inside');
    // if (!res.claimUpgrade) {
    //     next(new Error('Connection Must Upgrade For WebSockets'));
    //     return;
    //   }
    
      var upgrade = res.upgrade()
      var shed = ws.accept(req, upgrade.socket, upgrade.head);
      
      console.log('test');
      shed.on('text', function(msg) {
        console.log('Received message from websocket client: ' + msg);
      });
      shed.send('hello there!');
    
      next(false);
}