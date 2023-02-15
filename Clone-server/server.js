import Room from "../Clone/src/backend/Room";

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

// let users = [];
let rooms = [];

io.on('connection', (socket) => {
    // console.log(`User connected ${socket.id}`);

    socket.on('chatMessage', (msg, room) => {
        const user = users.find(user => user.id === socket.id)
        io.to(room).emit('message', user.username, msg)
    })
    
    socket.on('join-room', (room) => {
        const user = {
            username,
            id: socket.id,
            color,
            ready,
        }
        room.users.push(user);
    })

    socket.on('create-room', (username, room) => {
        const user = {
            username,
            id: socket.id,
            color,
            ready,
        }

        room.users.push(user);
        if(user.room){
            const newRoom = {
                room,
                users: [],
                HideBank,
                GameMode,
                GameMap,
                Dice,
            };
    })


        users.push(user);


            if (!rooms.includes(room)) rooms.push(newRoom);

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
