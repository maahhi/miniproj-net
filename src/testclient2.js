var io = require('socket.io-client');
var socket = io('http://localhost:8080/test');


socket.on('connection', function(){
    console.log('connection2');
});

socket.emit('joinroom',{clientID : 2, roomID : 123123 })
for(var i=0 ; i < 90000 ; i++){

}
socket.emit('msg',{clientID : 2, roomID : 123123 , msg : '2-1'})
socket.emit('msg',{clientID : 2, roomID : 123123 , msg : '2-2'})
socket.emit('msg',{clientID : 2, roomID : 123123 , msg : '2-3'})

socket.on('msgback',function(data){
    console.log('message recived');
    console.log(data);
});

socket.on('join',function(data){
    console.log('join recived');
    console.log(data);
});

socket.on('disconnect', function(){
    console.log('disconnect2');
    socket.emit('left',{clientID : 2, roomID : 123123 , msg : 'leave'})
});