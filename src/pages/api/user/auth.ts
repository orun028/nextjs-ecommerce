import { controll, listModel } from "@/lib/mongodb";
import { hashPassword, verifyPassword } from "@/lib/hash";
import { OnConnect } from "@/lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  const collection = listModel.user;
  if (req.method !== "POST") return;
  const Email = req.body.email;
  const Password = req.body.password;
  
  const user = await controll.getByQuery(collection, { email: Email });
  if (!user) {
    res.status(404).json({ message: "User not found." });
    return;
  }

  const passwordsCheck = await verifyPassword(Password, user.password);
  if (!passwordsCheck) {
    res.status(403).json({ message: "Invalid password." });
    return;
  }

  res.status(200).json(user);
};

export default OnConnect(handler);
