const express = require("express");
const connectDb = require("./config/database");
const app = express();
const User = require("./models/user");
const { validateSignupData } = require("./utils/validation.js");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const {userAuth} = require("./middlewares/auth.js")

app.use(express.json());
app.use(cookieParser())


//signup api
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


//login api
app.post("/login",async(req,res)=>{
    try{
        const{emailId,password} = req.body;

        const user = await User.findOne({ emailId: emailId })

        if(!user){
            throw new Error ("Invalid Credentials")
        }
        const isPasswordValid = await bcrypt.compare(password,user.password);

        if(isPasswordValid){

            //create a JWT token
            const token = await jwt.sign({ _id: user._id }, "DEV@Tinder$790");
            console.log(token);
            



            //add the token to cookie and send the response back to the user
            res.cookie("token", token);
            res.send("Login Successful!!!")
        }else{
            throw new Error("Invalid Credentials");
        }

    }catch(err){
        res.status(400).send("ERROR : " + err.message);
    }
});

//profile api
app.get("/profile",userAuth,async(req,res)=>{
    try{
    const user = req.user;
    res.send(user);
}
    catch(err){
        res.status(400).send("ERROR : " + err.message);
    }
})


app.post("/sendingConnectionRequest",userAuth,(req,res)=>{
    console.log("Sending connection request!")

    res.send("Connection request sent!!");
})


connectDb().then(()=>{
    console.log("Database connection Established!!!...")
    app.listen(7000,()=>{ 
        console.log("server is successfully listining on port 7000...");
    });
}).catch(err=>{
    console.error("Database cannot be Established!!!...")
})


