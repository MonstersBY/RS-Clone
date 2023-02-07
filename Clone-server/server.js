const { userJoin, getCurrentUser,userLeave, getRoomUsers } = require('./utils/users')

const io = require('socket.io')(3000, {
    cors: {
        origin: ['http://localhost:8080', 'https://admin.socket.io'],
        methods: ['GET', 'POST'],
    },
})

io.sockets.on('connection', (socket) => {
    console.log(`User connected ${socket.id}`);

    socket.on('chatMessage', msg => {
        const user = socket.id
        io.emit('message', user, msg)
    })

    socket.on('joinRoom', (room, cb) =>{
        console.log('room: '+ room);
        socket.join(room)
        console.log(socket.rooms)
    })

    // console.log(socket.rooms);

    socket.on('disconnect', () => {
        console.log(`Socket disconnect! ${socket.id}`);
    });
});
