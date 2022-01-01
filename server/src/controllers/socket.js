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
      let arrayUserOnline = []
        io.on('connection', (socket) => {
            // console.log('có người kết nối')

            socket.on('setUserOnl', data => {
              arrayUserOnline.push(data.id)
              arrayUserOnline = Array.from(new Set(arrayUserOnline))
              io.emit('getUserOnl', arrayUserOnline)
            })

            socket.on('joinConversion', data => {
              socket.join(data._id)
            })

            socket.on('sendMessage', data => {
              socket.join(data.conversion_id)
              socket.in(data.conversion_id).emit("getMessage", data)
            })
            // console.log(socket.handshake.headers)
        })
    }

}

module.exports = Socket