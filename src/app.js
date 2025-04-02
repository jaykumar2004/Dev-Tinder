//first require the package:
const express = require('express');

//then create a new application of express
const app = express();


//handle the code

//this will only handle get calls to /user  
app.use("/user",(res,req)=>{
	console.log(req.query) // {userId:101}
	res.send("Hello welcome to the server")
})

// getting the user id from the route /user?userid=101 and /user?userid=101&password=hello
app.use("/user",(res,req)=>{
	console.log(req.query) // {userId:101,password:hello}
	res.send("Hello welcome to the server")
})

// getting the user id from the route /user/707 ':'represents dynamic routing
app.use("/user/:userId",(res,req)=>{
	console.log(req.params) // {userId:707}
	res.send("Hello welcome to the server")
})

// getting the user id from the route /user/707/satyam/hello ':'represents dynamic routing
app.use("/user/:userId/:name/:password",(res,req)=>{
	console.log(req.params) // {userId:707,name:satyam,password:hello}
	res.send("Hello welcome to the server")
})


app.listen(7000,()=>{
    console.log("server is successfully listining on port 7000...");
});
