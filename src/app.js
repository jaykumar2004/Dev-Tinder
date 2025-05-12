const express = require("express");
const connectDb = require("./config/database");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const cors = require("cors");
require("dotenv").config();


const app = express();

// Middleware
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Routers
const authRouter = require("./routes/auth.js");
const profileRouter = require("./routes/profile.js");
const requestRouter = require("./routes/request.js");
const userRouter = require("./routes/user.js");

// Use Routers
app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);


connectDb().then(()=>{
    console.log("Database connection Established!!!...")
    app.listen(7000,()=>{ 
        console.log("server is successfully listining on port 7000...");
    });
}).catch(err=>{
    console.error("Database cannot be Established!!!...")
})
