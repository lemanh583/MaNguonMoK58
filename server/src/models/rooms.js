const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roomSchema = new Schema(
  {
    id: String,
    name: String,
    created_time: {type: Number, default: Date.now()},
    updated_time: {type: Number, default: Date.now()}
  },
);

const rooms = mongoose.model("rooms", roomSchema);
module.exports = rooms
