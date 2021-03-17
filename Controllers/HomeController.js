//Require
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const slugify = require("slugify")

//Models
const User = require("../Models/User");
const OnlineUser = require("../Models/OnlineUser");
const Games = require("../Models/Games");

//Helpers
const helpers = require("../Functions/helpers");

exports.home = (req,res)=>{
    res.status(200).send({message: "Anasayfa"})
}

exports.login = (req,res)=>{

}

exports.login_post = (req,res)=>{
    const email = req.body.email
    const password = req.body.password

    User.findOne({email},(err,user)=>{
        if(err){
            res.json({err: err})
        }
        if(user){
            bcrypt.compare(password, user.password, (error, response)=>{
                if(response){
                    
                    const id = user._id
                    const token = jwt.sign({id}, "jwtSecret" , {
                        expiresIn: 300,
                    })
                    req.session.user = user

                    res.json({auth:true, token: token, user:user})
                }else{
                    res.json({auth:false ,message: "Wrong username/password combination !"})
                }
            })
        }else{
            res.json({auth:false, message: " User doesn't exist"});
        }
    })
}

exports.register = (req,res)=>{
    
}

exports.register_post = (req,res)=>{
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const username = req.body.username
    const email = req.body.email
    const password = req.body.password

    bcrypt.hash(password, saltRounds, (err, hash) => {
        if(err){
            console.log(err)
        }
        User.create({
            firstName: firstName,
            lastName: lastName,
            username: username,
            slug: slugify(username),
            email: email,
            password: hash
        }).then(user=>{
            if(user){
                res.status(200).send('Kayıt başarılı...'+ user)
            }
        })

    })
}

exports.isUserAuth = (req,res)=>{
    User.findById(req.userId).then(user=>{
        res.send(user)
    })
}

exports.pair = (req,res)=>{
    req.game = "604fa5dbfe32163d048dbdb3"
    OnlineUser.find({game: req.game}).then((avaible_game)=>{
        let search = avaible_game
        search.sort(function(a, b) {
            return parseFloat(a.rank) - parseFloat(b.rank);
        });
        console.log(search)
        let group = []
        for (var index = 1; ; index++) {
            const element = search[0];
            if(!helpers.CheckUserCount(search, group)){
                res.send(search)
                break
            }
            if(group.length != 0  && (group.length % 5) == 0 ){
                console.log('Silinmeden önceli grup: ', group)
                if(helpers.CheckRank(group)){
                    // Sending information to users from here with socket.io
                    group = []
                    group.push(element)
                    search.splice(0, 1)
                }else{
                    group = []
                    if(!helpers.CheckUserCount(search, group)){
                        res.send(search)
                        break
                    }
                    group.push(element)
                    search.splice(0, 1)
                }
            }else{
                if(!helpers.CheckUserCount(search, group)){
                    res.send(search)
                    break
                }
                group.push(element)
                search.splice(0, 1)
            }
        }
    })
}

exports.pair2 = async(req,res) => {
    let game = await Games.findOne({name: "CS:GO"})
    OnlineUser.create({
        player_id : "12",
        game: game,
        rank : 5
    }).then(user => {
        res.json(user)
    })
}