const express = require("express");
const connectDb = require("./config/database");
const app = express();
const User = require("./models/user")

app.use(express.json());

app.post("/signup",async(req,res)=>{
    
    //creating new user with the data or creating new instance of a user model
    const user = new User(req.body); 

    try{
        await user.save();
        res.send("User added successfully!!!")
    }catch(err){
        res.status(400).send("Error saving the user" + err.message);
    }
    
});


//  Get user from email
app.get("/user",async(req,res)=>{
    const userEmail = req.body.emailId;

    try{
        const users = await User.find({emailId : userEmail})
        if(users.length === 0){
            res.status(400).send("User not found!!!")
        }else{
            res.send(users);
        }   
    }catch(err){
        res.status(400).send("Something went wrong")
    }
   
})

//feed api
app.get("/feed",async(req,res)=>{

    try{
        const users = await User.find({});
        res.send(users);
    }catch(err){
        res.status(400).send("Something went wrong")
    }

});

connectDb().then(()=>{
    console.log("Database connection Established!!!...")
    app.listen(7000,()=>{ 
        console.log("server is successfully listining on port 7000...");
    });
}).catch(err=>{
    console.error("Database cannot be Established!!!...")
})


