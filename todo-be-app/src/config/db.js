const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = async (dbName = process.env.DB_NAME) => {
  const URI = `${process.env.MONGO_URI}/${dbName}`;
  const uri = process.env.MONGO_URI;
  try {
    const conn = await mongoose.connect(uri);
    console.log(`MongoDB connected from Local Node, ${conn.connection.host}`);
    console.log(`MongoDB, ${dbName}`);
  } catch (error) {
    console.error(`MongoDB connection failed: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
