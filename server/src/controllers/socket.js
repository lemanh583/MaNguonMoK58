const socketConstruc = require("socket.io");
class Socket {
    static connectSocket (server) {
        const io = socketConstruc(server, {
            cors: {
              origin: "http://localhost:8081",
              methods: ["GET", "POST"],
              transports: ['websocket', 'polling'],
              credentials: true
            },
            allowEIO3: true
          })

        io.on('connection', (socket) => {
            console.log('có người kết nối')
            // console.log(socket.handshake.headers)
        })
    }

}

module.exports = Socket