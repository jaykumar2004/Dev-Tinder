const express = require("express");
const connectDb = require("./config/database");
const app = express();
const User = require("./models/user");
const { validateSignupData } = require("./utils/validation.js");
const bcrypt = require("bcrypt");

app.use(express.json());

app.post("/signup",async(req,res)=>{
    try{
    //validation of data
    validateSignupData(req);
    
    const {firstName, lastName,emailId ,password} = req.body;
    //encrypt the password
    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);


    //creating new user with the data or creating new instance of a user model
    const user = new User({
        firstName,
        lastName,
        emailId,
        password: passwordHash,
    }); 

        await user.save();
        res.send("User added successfully!!!")
    }catch(err){
        res.status(400).send("ERROR : " + err.message);
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


//delete api
app.delete("/user",async(req,res)=>{
    const userId = req.body.userId;
    try{
        const user = await User.findByIdAndDelete({ _id :userId });
        //const user = await User.findByIdAndDelete(userId);

        res.send("User deleted successfully");
    }catch(err){
        res.status(400).send("Something went wrong")
    }
})

// Update data of the user
app.patch("/user/:userId", async (req, res) => {
    const userId = req.params?.userId;
    const data = req.body;

    try {
        const ALLOWED_UPDATED = [
            "photoUrl", 
            "about", 
            "gender", 
            "age", 
            "skills"
        ]
    
        const isUpdateAllowed = Object.keys(data).every((k)=>{
            return ALLOWED_UPDATED.includes(k)
        });
        if(!isUpdateAllowed){
            throw new Error("Update not allowed");
        }
        if(data?.skills.length > 10){
            throw new Error("Skills cannot be more than 10")
        }
        const user = await User.findByIdAndUpdate(
            { _id: userId },
            data,
            {
                returnDocument: "after",
                runValidators: true,
            }
        );
        console.log(user);
        res.send("User updated successfully");
    } catch (err) {
        res.status(400).send("UPDATE FAILED: " + err.message);
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


