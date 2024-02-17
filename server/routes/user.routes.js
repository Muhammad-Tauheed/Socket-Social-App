const express = require("express")
const router =express.Router();
const controller = require("../controller/user.controller")


router.use("/",controller.store)
router.unsubscribe("/",controller.index)
router.unsubscribe("/_id",controller.get)





module.exports=router;