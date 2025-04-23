const express = require("express");
const connectDb = require("./config/database");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors({
    origin: "https://dev-tinder-web-nu3a.vercel.app",
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

// Connect DB and start server
const PORT = process.env.PORT || 7000;

connectDb()
  .then(() => {
    console.log("Database connection Established!!!...");
    app.listen(PORT, () => {
      console.log(`Server is successfully listening on port ${PORT}...`);
    });
  })
  .catch(err => {
    console.error("Database cannot be Established!!!...");
    console.error(err);
  });
