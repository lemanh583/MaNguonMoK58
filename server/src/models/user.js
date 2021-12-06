const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: { type: String, unique: true },
    password: { type: String, required: true },
    name: String,
    role: {type: Number, default: 2},
    note: String,
    date: String,
    id_socket: String,
    phone:{ type: String, required: true },
    active: {type: Boolean, default: true},
    img: String,
    room: Array,
    created_time: {type: Number, default: Date.now()},
    updated_time: {type: Number, default: Date.now()}
  },
);

const users = mongoose.model("users", userSchema);
module.exports = users
