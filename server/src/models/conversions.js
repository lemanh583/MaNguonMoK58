const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const conversionSchema = new Schema(
  {
    members: Array,
    type: String, // private or group 
    name: String,
    created_by: {type: Schema.Types.ObjectId, ref: "users"},
    last_message: {type: Schema.Types.ObjectId, ref: "messages"},
    created_time: {type: Number, default: Date.now()},
    updated_time: {type: Number, default: Date.now()}
  },
);

const rooms = mongoose.model("conversions", conversionSchema);
module.exports = rooms
