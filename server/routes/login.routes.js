const express = require("express")
const router =express.Router();
const controller = require("../controller/user.controller")


router.use("/",controller.login)






module.exports=router;