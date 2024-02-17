const express = require("express")
const router = express.Router();
const smsRoute = require("./sms.routes")
const userRoute = require("./user.routes")
const loginRoute = require("./login.routes")



router.use("/sms",smsRoute)
router.use("/user",userRoute)
router.use("/login",loginRoute)


module.exports=router;