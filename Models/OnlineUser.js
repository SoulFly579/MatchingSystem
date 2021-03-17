const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OnlineUserSchema = new mongoose.Schema({
    player_id : { type: String },
    game: { type: Schema.Types.ObjectId, ref:"games"},
    rank : { type: Number }
});

module.exports = mongoose.model('OnlineUser', OnlineUserSchema)