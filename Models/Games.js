const mongoose = require("mongoose");

const GamesSchema = new mongoose.Schema({
    name : { type: String }
});

module.exports = mongoose.model('Games', GamesSchema)