const jwt = require("jsonwebtoken")

exports.verifyJWT = (req,res,next)=>{
    const token = req.headers["x-access-token"]
    if(!token){
        res.status(403).send("You should login !!")
    }else{
        jwt.verify(token, "jwtSecret", (err,decoded)=>{
            if(err){
                res.json({auth:false, message: "U failed to authenticate"})
            }else{
                req.userId = decoded.id;
                next()
            }
        })
    }
}