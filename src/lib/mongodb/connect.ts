import { MongoClient } from "mongodb";
import mongoose from "mongoose";
import type { NextApiRequest, NextApiResponse } from "next";

if (!process.env.DATABASE_URL) throw new Error("Please add your DATABASE_URL to .env");
const uri: string = process.env.DATABASE_URL
const options: object = { useUnifiedTopology: true, useNewUrlParser: true };

const connectDB = (handler: (arg0: NextApiRequest, arg1: NextApiResponse<any>) => any) => async (req: NextApiRequest, res: NextApiResponse) => {
  if (mongoose.connections[0].readyState) {
    // Use current db connection
    return handler(req, res);
  }
  // Use new db connection
  await mongoose.connect(uri, options);
  return handler(req, res);
};

const client = new MongoClient(uri, options)
export const clientPromise = client.connect()

export default connectDB;