import { createServer } from "http";
import { Server } from "socket.io";
import State from './modules/State/State.js';

const httpServer = createServer();

const io = new Server(httpServer, {
    cors: {
      origin: ['http://localhost:8080', 'https://admin.socket.io', 'https://fluffy-panda-da842f.netlify.app']
    }
});

const port = process.env.PORT || 3000;

let allrooms = []
const allGame = new Map() 

io.on("connection", (socket) => {

    socket.on('join-room', (username, room) => {
        const index = allrooms.findIndex(findRoom => findRoom.room === room)
        if (index == -1) {
            const roomInfo = {
                room,
                users: [{
                    username,
                    id: socket.id,
                    ready: false,
                }],
                colors: ['red', 'blue', 'orange', 'green'],
                hideBank: true,
                friendlyRobber: true,
                gameMode: 'classic',
                gameMap: 'newbie',
                dice: 'random',
                lobbyState: 'Lobby',
            }
            allrooms.push(roomInfo)
            socket.join(room)
            io.to(room).emit('all-user-room', roomInfo.users)

            document.getElementById("gameMap").addEventListener("change", (e) => {
                console.log(e.target.value)
                roomInfo.gameMap = e.target.value;
            })
        } else {
            if (allrooms[index].lobbyState == 'Lobby') {
                const user = {
                    username,
                    id: socket.id,
                    ready: false,
                }
                socket.join(room)
                allrooms[index].users.push(user)
                io.to(room).emit('all-user-room', allrooms[index].users)
            } else {
                socket.emit('create-room-late', room)
            }
        } 
        socket.emit('create-room', room)
        io.emit('room-list', allrooms)
    })

    socket.on('create-game', room => {
        if (!allGame.has(room)) {
            const index = allrooms.findIndex(findRoom => findRoom.room === room)
            const gameSettings = allrooms[index]
            const state = new State()

            state.playersCount = gameSettings.users.length
            state.gameMap = gameSettings.gameMap
            state.initialState()
            for (let i = 0; i < state.playersCount; i++) {
                state.playersInfo[i].color = gameSettings.colors[i]
            }
            allGame.set(room, state)
        }
        const state = allGame.get(room)
        socket.emit('Map-object', state.mapObject, state.playersInfo)
    })

    socket.on('leave-lobby', (room, name) =>{
        const index = allrooms.findIndex(findRoom => findRoom.room === room)
        if (index !== -1) {
            const indexUser = allrooms[index].users.findIndex(findUser => findUser.username === name)
            if (indexUser !== -1) {
                allrooms[index].users.splice(indexUser, 1);
                const msg = 'disconnect'
                io.to(room).emit('message', name, msg)
                io.to(room).emit('all-user-room', allrooms[index].users)
        
                if ( allrooms[index].users.length === 0) {
                    allrooms.splice(index, 1)
                    io.emit('room-list', allrooms)
                }
            }
        }
    })

    io.emit('room-list', allrooms)

    socket.on('chatMessage', (msg, room, user) => {
        io.to(room).emit('message', user, msg)
    })

    
    socket.on('change-prepared', (room, name, status) => {
        const index = allrooms.findIndex(findRoom => findRoom.room === room)
        const indexUser = allrooms[index].users.findIndex(findUser => findUser.username === name)
        allrooms[index].users[indexUser].ready = status
        const msg = status ? 'ready' : 'not ready'
        io.to(room).emit('message', name, msg)
        io.to(room).emit('all-user-room', allrooms[index].users)
    })

    socket.on('StartGame', (room) => {
        io.to(room).emit('ChangeToGamePage')
    })

    // game
    socket.on('join-game-room', (room) => {
        const index = allrooms.findIndex(findRoom => findRoom.room === room)
        allrooms[index].lobbyState = 'Started'
        socket.join(room)
    })
    
    socket.on('give-room-list-players', (room, name) => {

        const index = allrooms.findIndex(findRoom => findRoom.room === room)
        const indexUser = allrooms[index].users.findIndex(findName => findName.username === name)

        console.log(allGame.get(room));
        socket.emit('players-hand', allGame.get(room).playersInfo[indexUser].hand.resources)
        io.to(room).emit('list-players', allrooms[index].users, allGame.get(room).playersInfo)
    })
    

    socket.on('disconnect', () => {
    });
});


io.listen(port, function () {
    console.log('CORS-enabled web server listening on port '+ port)
})