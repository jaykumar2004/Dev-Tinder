const express = require("express");
const {userAuth} = require("../middlewares/auth.js");
const requestRouter = express.Router();

requestRouter.post("/sendingConnectionRequest",userAuth,(req,res)=>{
    console.log("Sending connection request!")

    res.send("Connection request sent!!");
})

module.exports = requestRouter;
