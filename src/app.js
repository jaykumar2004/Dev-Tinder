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
    origin: "http://localhost:5173",
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

connectDb()
  .then(() => {
    console.log("Database connection Established!!!...");
    server.listen(7000, () => {
      console.log("server is successfully listining on port 7000...");
    });
  })
  .catch((err) => {
    console.error("Database cannot be Established!!!...");
  });
