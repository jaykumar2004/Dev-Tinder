//first require the package:
const express = require('express');

//then create a new application of express
const app = express();


//handle the code

app.get("/",(req,res)=>{
    res.send("Namaste from the dashbord!!!")
});

app.get("/hello",(req,res)=>{
    res.send("HEllo!!!")
});
    
app.get("/test",(req,res)=>{
    res.send("Hello from the test!!!")
});

app.listen(7000,()=>{
    console.log("server is successfully listining on port 7000...");
});
