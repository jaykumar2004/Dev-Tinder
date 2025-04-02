//first require the package:
const express = require('express');

//then create a new application of express
const app = express();


app.use("/user",(req,res)=>{
    // res.send("route handler 1")
});


app.listen(7000,()=>{ 
    console.log("server is successfully listining on port 7000...");
});
