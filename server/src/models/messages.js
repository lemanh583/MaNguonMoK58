const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema(
  {
    id_user: {type: Schema.Types.ObjectId, ref: "users"},
    id_room: {type: Schema.Types.ObjectId, ref: "rooms"},
    message: String,
    created_time: {type: Number, default: Date.now()},
    updated_time: {type: Number, default: Date.now()}
  },
);

const messages = mongoose.model("messages", messageSchema);
module.exports = messages
