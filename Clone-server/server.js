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
        const index = allrooms.findIndex(findRoom => findRoom.room === room)
        if (index != -1) {
            if (!allGame.has(room)) {
                const gameSettings = allrooms[index]
                const state = new State()
                state.playersCount = gameSettings.users.length
                state.gameMap = gameSettings.gameMap
                state.initialState()
                for (let i = 0; i < state.playersCount; i++) {
                    state.playersInfo[i].name = gameSettings.users[i].username
                    state.playersInfo[i].color = gameSettings.colors[i]
                }
                allGame.set(room, state)
            }
            socket.emit('Map-object', allGame.get(room).mapObject, allGame.get(room).playersInfo)
        }
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
        if (index !== -1) {
            allrooms[index].lobbyState = 'Started'
            socket.join(room)
        }
    })

    socket.on('give-room-list-players', (room, name) => {

        const index = allrooms.findIndex(findRoom => findRoom.room === room)
        const indexUser = allrooms[index].users.findIndex(findName => findName.username === name)

        socket.emit('players-hand', allGame.get(room).playersInfo[indexUser].hand.resources)
        socket.emit('players-stock', allGame.get(room).playersInfo[indexUser])
        io.to(room).emit('list-players', allGame.get(room).playersInfo)
    })

    socket.on('isYouTurnPlayer', (room, name) =>{
        const index = allGame.get(room).playersInfo.findIndex(findUser => findUser.name === name)
        const active = allGame.get(room).activePlayer === index ? true : false
        if (allGame.get(room).turn > 0) {
            socket.emit('Turn-player', allGame.get(room).playersInfo[index], active)
        } else {
            socket.emit('firstSettlementMode', allGame.get(room).playersInfo[index], active)
        }
<<<<<<< HEAD
=======

>>>>>>> d55dad2f8a60d0e06a590b2ac220178d826648a3
    })

    socket.on('setNewSettlement', (player, id, room) => {
        allGame.get(room).setNewSettlement(player, id)
        const index = allGame.get(room).playersInfo.findIndex(findUser => findUser.name === player.name)
        allGame.get(room).playersInfo[index] = player
        allGame.get(room).playersInfo[index].settlementsStock--
        if (allGame.get(room).turn == 0) {
            // console.log(allGame.get(room).mapObject[6])
            allGame.get(room).addResoursesFirstSettlement(allGame.get(room).mapObject, allGame.get(room).playersInfo[index])
            socket.emit('players-hand', allGame.get(room).playersInfo[index].hand.resources)
        }
        socket.emit('Change-playerInfo', allGame.get(room).playersInfo[index])
        io.to(room).emit('list-players', allGame.get(room).playersInfo)
    })

    socket.on('setNewRoad', (player, id, room) =>{
        allGame.get(room).setNewRoad(player, id)
        const index = allGame.get(room).playersInfo.findIndex(findUser => findUser.name === player.name)
        allGame.get(room).playersInfo[index] = player
        allGame.get(room).playersInfo[index].roadsStock--
        socket.emit('Change-playerInfo', allGame.get(room).playersInfo[index])
    })

    socket.on('updateMap', (room) => {
        io.to(room).emit('renderFullMapView', allGame.get(room).mapObject)
    })

    socket.on('Next-person', (room, name) => {
        if (allGame.get(room).turn) {
            if (allGame.get(room).activePlayer < allGame.get(room).playersInfo.length -1) {
                allGame.get(room).activePlayer++
            } else if(allGame.get(room).activePlayer >= allGame.get(room).playersInfo.length -1){
                allGame.get(room).turn++
                if (allGame.get(room).turn){
                    allGame.get(room).activePlayer = 0
                } else {
                    allGame.get(room).activePlayer = allGame.get(room).playersInfo.length-1
                }
            }
        } else {
            if (allGame.get(room).activePlayer > 0) {
                allGame.get(room).activePlayer--
            } else if(allGame.get(room).activePlayer <= 0){
                allGame.get(room).turn++
                allGame.get(room).activePlayer = 0
            }
        }
        io.to(room).emit('Client-turn')
    })

    socket.on('weRollDice', (room, roll) => {
        allGame.get(room).diceRoll = roll;
        allGame.get(room).addResoursesThisTurn(
            (roll[0] + roll[1]),
            allGame.get(room).mapObject,
            allGame.get(room).playersInfo);
<<<<<<< HEAD
=======

        console.log(allGame.get(room).diceRoll);
        console.log(allGame.get(room).playersInfo[0].hand)
>>>>>>> d55dad2f8a60d0e06a590b2ac220178d826648a3
    });

    socket.on('disconnect', () => {
    });
});


io.listen(port, function () {
    console.log('CORS-enabled web server listening on port '+ port)
})
