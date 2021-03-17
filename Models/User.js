const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    firstName: {type:String, required:true},
    lastName: {type:String, required:true},
    username: { type: String, required: true},
    slug: { type: String, required: true},
    email:{type:String, required:true},
    password: {type:String, required:true},
    games: [{
        game_name : String,
        game_rank : Number
    }],
    created_at: { type: Date,
         default: Date.now()
        }
});

module.exports = mongoose.model('User', UserSchema)