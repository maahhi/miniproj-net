var io = require('socket.io-client');
var socket = io('http://localhost:8888');

socket.on('connection', function(){
    console.log('connection2');
});

socket.emit('joinroom',{clientID : 2, roomID : 123123 })
for(var i=0 ; i < 10000 ; i++){

}
socket.emit('msg',{clientID : 2, roomID : 123123 , msg : '2-1'})
socket.emit('msg',{clientID : 2, roomID : 123123 , msg : '2-2'})
socket.emit('msg',{clientID : 2, roomID : 123123 , msg : '2-3'})

socket.on('msgback',function(data){
    console.log('message recived');
    console.log(data);
});

socket.on('disconnect', function(){
    console.log('disconnect2');
});