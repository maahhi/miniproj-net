const config = require('../config');
const Message = require('../model/Message');
const socketio = require('socket.io');
const socketioJwt   = require("socketio-jwt");

var socketManager = require('../model/SocketManager');

module.exports = function (server) {
  let io = socketio.listen(server.server);

  io.use(socketioJwt.authorize({
    secret: config.jwt.secret,
    handshake: true
  }));

  io.on('connection', function (socket) {
    console.log(socket.decoded_token.username, ' is connected!');

    socketManager[socket.decoded_token.id] = socket;

    socket.on("unauthorized", function(error) {
      if (error.data.type == "UnauthorizedError" || error.data.code == "invalid_token") {
        // redirect user to login page perhaps?
        console.log("User's token has expired");
      }
    });

    socket.on('disconnect', function () {
      delete socketManager[socket.decoded_token.id];
      console.log("user disconnected")
    });

    socket.on('msg', function (data) {
      console.log("msg received!");

      data.sender_id = socket.decoded_token.id;
      let receiverID = data.receiver_id;

      if(socketManager[receiverID]) {
        socketManager[receiverID].emit('msgBack', data)
      }
      console.log(data)
      let message = new Message(data);
      message.save(function(err) {
        if (err) {
          console.log("ERROR IN SAVE MESSAGE")
          console.log(err.toString())
        }
      })
    })

    socket.on('offer', function (data) {
      console.log("offer received on server")
      data.caller = socket.decoded_token.id;
      let receiverID = data.callee;

      if(socketManager[receiverID]) {
        socketManager[receiverID].emit('offer', data)
      }
      else {
        console.log("Callee is not Online")
      }
    })
    socket.on('answer', function (data) {
      console.log("answer received on server")
      data.callee = socket.decoded_token.id;
      let receiverID = data.caller;

      if(socketManager[receiverID]) {
        socketManager[receiverID].emit('answer', data)
      }
      else {
        console.log("Caller is not Online")
      }
    });
    socket.on('candidate', function (data) {
      console.log("candidate received on server")
      let receiverID = data.peer;

      if(socketManager[receiverID]) {
        socketManager[receiverID].emit('candidate', data)
      }
      else {
        console.log("Caller is not Online")
      }
    })
  })

};