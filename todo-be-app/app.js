const express = require("express");
// const dotenv = require("dotenv");
require('dotenv').config();

const cors = require("cors");
const cookieParser = require("cookie-parser");

const logger = require("./src/utils/logger");
const connectDB = require("./src/config/db");

//routes
const routes = require("./src/routes/index");

// dotenv.config();
connectDB();

const server = express();
server.use(cookieParser());
server.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, 
  })
);
// Middleware
server.use(express.json());
// server.use(function (req, res, next) {
//   res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
//   res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "X-Requested-With,content-type"
//   );
//   next();
// });

server.use("/api", routes);
// Temp to check if the server is running
server.get("/", (req, res) => {
  res.send("Hello World!");
});

const PORT = process.env.PORT || 5001;

server.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});

// Error handling
server.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

process.on("unhandledRejection", (err) => {
  console.error(`Unhandled Rejection: ${err.message}`);
  server.close(() => process.exit(1));
});

// JWT_SECRETKey generation code one time use
// const crypto = require("crypto");
// const secret = crypto.randomBytes(64).toString("hex");
// console.log(secret); 
