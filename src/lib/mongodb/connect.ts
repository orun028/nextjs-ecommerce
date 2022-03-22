import mongoose from "mongoose";

if (!process.env.DATABASE_URL)
  throw new Error("Please add your DATABASE_URL to .env");
const uri: string = process.env.DATABASE_URL;
const options: object = { useUnifiedTopology: true, useNewUrlParser: true };

async function dbConnect() {
  if (mongoose.connection.readyState >= 1) {
    // if connection is open return the instance of the databse for cleaner queries
    return mongoose.connection.db;
  }

  return mongoose.connect(uri, options);
}

export default dbConnect;
