var io = require('socket.io-client');
var socket = io('http://localhost:8080/test');


socket.on('connection', function(){
    console.log('connection3');
});

socket.emit('joinroom',{clientID : 3, roomID : 123123 })
for(var i=0 ; i < 90000 ; i++){

}
socket.emit('msg',{clientID : 3, roomID : 123123 , msg : '3-1'})
socket.emit('msg',{clientID : 3, roomID : 123123 , msg : '3-2'})
socket.emit('msg',{clientID : 3, roomID : 123123 , msg : '3-3'})

socket.on('msgback',function(data){
    console.log('message recived');
    console.log(data);
});

socket.on('join',function(data){
    console.log('join recived');
    console.log(data);
});

socket.on('disconnect', function(){
    console.log('disconnect3');
    socket.emit('left',{clientID : 3, roomID : 123123 , msg : 'leave'})
});