var uniqid = require('uniqid');
var Room = require('./model/Room.js');
var Rooms = require('./model/Rooms.js');

module.exports = function(req, res, next){ 
    var room_id = uniqid();
    var creator_id = req.user.id;
    let new_room = new Room(room_id,creator_id);
    new_room.listOfMembers.push(creator_id)
    Rooms[room_id] = new_room
    res.send(room_id);
    return(next);
}