import {io} from "socket.io-client"

//local server
// const socket = io('http://localhost:3000/')

//deploy server
const socket = io('https://test-server-production-b456.up.railway.app/',{
  extraHeaders: {
    "my-custom-header": "colonist"
  }
})

export default socket
