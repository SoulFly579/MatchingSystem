const express = require("express");
const router = express.Router();

//Middlewares
const Middlewares = require("../Middlewares/middlewares");

//Function Helpers
const helpers = require("../Functions/helpers")

//Controllers
const HomeController = require("../Controllers/HomeController");

router.get("/",HomeController.home)
router.get("/test",HomeController.pair)
router.get("/test2",HomeController.pair2)
router.get("/isUserAuth",Middlewares.verifyJWT,HomeController.isUserAuth)
router.get("/login",HomeController.login)
router.post("/login",HomeController.login_post)
router.get("/register",HomeController.register)
router.post("/register",HomeController.register_post)


module.exports = router;