const express = require("express");
const connectDb = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();
const http = require("http");
const app = express();

// Routers
const authRouter = require("./routes/auth.js");
const profileRouter = require("./routes/profile.js");
const requestRouter = require("./routes/request.js");
const userRouter = require("./routes/user.js");
const initializeSocket = require("./utils/socket.js");
const chatRouter = require("./routes/chat.js");

// Middleware
app.use(
  cors({
    origin: "https://devtinder-wmma.onrender.com",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// Use Routers
app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);
app.use("/", chatRouter);

const server = http.createServer(app);

initializeSocket(server);

const PORT = process.env.PORT || 7000;

connectDb()
  .then(() => {
    console.log("Database connection Established!!!...");
    server.listen(7000, () => {
      console.log(`Server is successfully listening on port ${PORT}...`);
    });
  })
  .catch((err) => {
    console.error("Database cannot be Established!!!...");
  });
