//first require the package:
const express = require('express');

//then create a new application of express
const app = express();

//const {adminAuth} = require("./middlewares/auth")

//errors
app.get("/getUserData",(req,res)=>{
    try{
        throw new Error("adfadfg")
        res.send("User data send");
    }
    catch(err){
        res.status(500).send("Some error contact support team")
    }
});

app.use("/",(err,req,res,next)=>{
    if(err){
        res.status(500).send("Something went wrong")
    }
})





// app.use("/admin",adminAuth);


// app.get("/user",(req,res)=>{
//     res.send("User data Sent")
// })

// app.get("/admin/getAllData",(req,res)=>{
//     res.send("Get all the data")
// })


// app.get("/admin/deleteUser",(req,res)=>{
//     res.send("Deleted a User");
// })


app.listen(7000,()=>{ 
    console.log("server is successfully listining on port 7000...");
});
