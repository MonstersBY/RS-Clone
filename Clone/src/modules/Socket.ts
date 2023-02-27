import {io} from "socket.io-client"

const socket = io('http://localhost:3000/')

// const socket = io('https://example-pdrb.onrender.com',{
//   extraHeaders: {
//     "my-custom-header": "colonist"
//   }
// })
// 127.0.0.1
// const socket = io('https://test-server-production-b456.up.railway.app/',{
//   extraHeaders: {
//     "my-custom-header": "colonist"
//   }
// })

export default socket
