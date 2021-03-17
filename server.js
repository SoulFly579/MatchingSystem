const express = require("express");
const app = express();
const server = require("http").Server(app);
// const io = require("socket.io")(server);
const { v4:uuid4 } = require("uuid");
const mongoose = require("mongoose");
const helmet = require("helmet");
const bodyParser = require('body-parser');
const expressSession = require('express-session');
const cors = require('cors');
require('dotenv').config();

// Router
const router = require("./Routers/router");

// Configure View Engine
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


//Configure Helmet
app.use(helmet({
  contentSecurityPolicy: false,
}));

app.use(cors())

// Static Files
// app.use("/public",express.static("./public"))

// Connection Database
const connect_url = "mongodb+srv://SoulFly579:I3JzZdAZ8bhkRvU5@cluster0.isoi9.mongodb.net/Pair_Game?retryWrites=true&w=majority";
mongoose.connect(connect_url,{
    useNewUrlParser:true,
    useUnifiedTopology: true,
    useCreateIndex: true,
})
mongoose.connection.once('open', ()=>{
    console.log('Database connection succesfully...');
})

app.use(expressSession({
    secret:'lasdkalwdxzial',
    resave: false,
    saveUninitialized:true,
}))

//Router
app.use(router)


server.listen(process.env.PORT || 5000, console.log("Server running now..."));

