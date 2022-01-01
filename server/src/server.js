require("dotenv").config()
const mongoose = require("mongoose");
const express = require("express");
const roles = require("./models/role");
const users = require("./models/user");
const bcrypt = require("bcryptjs")
const router = require("./router");
const cors = require('cors')
const app = express();
app.use(express.json());
app.use(cors())
app.use(router);
const server = require('http').createServer(app)
const socketCtr =  require("./controllers/socket")
socketCtr.connectSocket(server)


// const { Server } = require("socket.io");
// const io = new Server(server, {
//   cors: {
//     origin: "*",
//     // allowedHeaders: ["my-custom-header"],
//     credentials: true
//   }
// });





 
const connectDB = async () => {
  try {
    const connect = await mongoose.connect(
      `mongodb+srv://socket:fbfMyLdSVKDbaR09@dbsocket-app.rwxou.mongodb.net/dbsocket-app?retryWrites=true&w=majority`,
      // `mongodb://127.0.0.1:27017/socket`
    );
    if (connect) console.log("DB connected");
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};
connectDB();

const seeder = async (req, res) => {
  try {
    const find = await roles.findOne({
      name: "Administrator",
      role: 0,
      descriptions: "Quyền quản trị cao nhất",
    });

    if (!find) {
      const data = [
        {
          name: "Administrator",
          role: 0,
          descriptions: "Quyền quản trị cao nhất",
        },
        {
          name: "Moderator",
          role: 1,
          descriptions: "Quyền dưới admin",
        },
        {
          name: "Member",
          role: 2,
          descriptions: "Member",
        },
      ];
      await Promise.all(
        data.map(async (value) => {
          await roles.create(value);
        })
      );
    }

    const findAdmin = await users.findOne({
      username: "admin",
      name: "admin",
      role: 0,
      note: "admin",
    });
    if (!findAdmin) {
      await users.create({
        name: "admin",
        phone: "1",
        password: bcrypt.hashSync("1", 10),
        role: 0,
        note: "admin",
      });
    }
  } catch (error) {
    console.error(error);
  }
};

seeder();


// app.get('/', () => console.log('ahihi'))
const PORT = process.env.PORT || 3003;
server.listen(PORT, console.log(`Server run on ${PORT}`));
