import mongoose from "mongoose";
import type { NextApiRequest, NextApiResponse } from "next";
let uri: string = process.env.MONGODB_URI ? process.env.MONGODB_URI : "";
let options: object = {
  useUnifiedTopology: true,
  useNewUrlParser: true
};

const connectDB = (handler: (arg0: NextApiRequest, arg1: NextApiResponse<any>) => any) => async (req: NextApiRequest, res: NextApiResponse) => {
  if (mongoose.connections[0].readyState) {
    // Use current db connection
    return handler(req, res);
  }
  // Use new db connection
  await mongoose.connect(uri, options);
  return handler(req, res);
};

export default connectDB;