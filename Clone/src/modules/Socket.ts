import {io} from "socket.io-client"

// const socket = io('http://localhost:3000/')
const socket = io('https://example-pdrb.onrender.com', {
    withCredentials: true,
    extraHeaders: {
      "my-custom-header": "abcd"
    }
  })

export default socket
