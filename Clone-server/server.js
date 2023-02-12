var express = require('express');
var app = express();
var http = require('http').Server(app);
const io = require('socket.io')(http, {
    cors: {
        origin: ['http://localhost:8080', 'https://admin.socket.io'],
        methods: ['GET', 'POST'],
    },
})
const port = process.env.PORT || 3000;

let users = []
let rooms = []

io.on('connection', (socket) => {
    // console.log(`User connected ${socket.id}`);

    socket.on('chatMessage', (msg, room) => {
        const user = users.find(user => user.id === socket.id)
        io.to(room).emit('message', user.username, msg)
    })
    
    socket.on('join-room', (username, room) => {
        const user = {
            username,
            room,
            id: socket.id,
        }
        users.push(user)
        if(user.room){
            if (!rooms.includes(room)) rooms.push(room)
            console.log('room: '+ room);
            socket.join(room)
            socket.emit('create-room', room)
            io.to(room).emit('all-user-room', users)
        }

    })
    io.emit('room-list', rooms)

    // console.log(io.sockets.adapter.rooms);

    // console.log(socket.rooms);

    // console.log(Object.keys(io.engine.clients)) //all users
    

    // console.log(socket.rooms);

    socket.on('disconnect', () => {
        const index = users.findIndex(user => user.id === socket.id)
        
        if (index !== -1) {

            users.splice(index, 1);
        }
        // console.log(`Socket disconnect! ${socket.id}`);
    });
});


http.listen(port, function() {
    console.log('listening on *: ' + port);
});
