const express = require("express");
const { validateSignupData } = require("../utils/validation.js");
const User = require("../models/user.js");
const bcrypt = require("bcrypt");

const authRouter = express.Router();


//signup api
authRouter.post("/signup",async(req,res)=>{
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


//login api
authRouter.post("/login",async(req,res)=>{
    try{
        const{emailId,password} = req.body;

        const user = await User.findOne({ emailId: emailId })

        if(!user){
            throw new Error ("Invalid Credentials")
        }
        const isPasswordValid = await user.validatedPassword(password);

        if(isPasswordValid){

            //create a JWT token
            const token = await user.getJWT();

            //add the token to cookie and send the response back to the user
            res.cookie("token", token,{
                expires : new Date(Date.now()+ 8 * 3600000),
            });
            res.send("Login Successful!!!")
        }else{
            throw new Error("Invalid Credentials");
        }

    }catch(err){
        res.status(400).send("ERROR : " + err.message);
    }
});

//logout api
authRouter.post("/logout",async(req,res)=>{
    res.cookie("token",null,{
        expires: new Date(Date.now()),
    });
    res.send("Logout Successfull!!!")
})

module.exports =  authRouter;
