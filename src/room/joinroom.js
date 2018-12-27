
module.exports = function(server) {
  var restify = require('restify');
  var socketio = require('socket.io');
  //var server = restify.createServer();
  var io = socketio.listen(server.server);
  var Room = require('../model/Room.js');
  var Rooms = require('../model/Rooms.js');
  



  //create instance room
var room_id = 123123;
var creator_id = 1;
let new_room = new Room(room_id,creator_id);
Rooms[room_id] = new_room;

io.of('/test').on('connection', function (socket) {
    console.log('connection');

    //join
    socket.on('joinroom',function(data){
        var clientID = data.clientID ;
        var roomID = data.roomID;
        var thisroom = Rooms[roomID];
        var otherclient;
        if(thisroom!=null){
            thisroom.listOfMembers[clientID]=socket;
            Rooms[room_id] = thisroom;
            console.log('joined',clientID)

            var membersofthisroom = thisroom.listOfMembers;
            for (otherclient in membersofthisroom){
                if (otherclient != clientID){
                    console.log(data,{from:'server', in:roomID , msg:clientID+' joiend' });
                    var othersocket = membersofthisroom[otherclient]
                    othersocket.emit('join',{from:'server', in:roomID , msg:clientID+' joiend' })
                }
              }
        }
    });

    //chating
    socket.on('msg', function (data) {
        console.log(data);
        var clientID = data.clientID ;
        var roomID = data.roomID;
        var thisroom = Rooms[roomID];
        var otherclient;
        if(thisroom!=null){
            var membersofthisroom = thisroom.listOfMembers;
            for (otherclient in membersofthisroom){
                if (otherclient != clientID){
                    console.log(data,{from:clientID, in:roomID , msg:data.msg });
                    var othersocket = membersofthisroom[otherclient]
                    othersocket.emit('msgback',{from:clientID, in:roomID , msg:data.msg })
                }
            }
        }
    });

    //left
    socket.on('left',function(data){
      console.log("left");
      console.log(data);
    });
});


};