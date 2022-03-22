import { controll, listModel } from "@/lib/mongodb";
import { getSession } from "next-auth/react";
import { hashPassword, verifyPassword } from "@/lib/hash";
import { OnConnect } from "@/lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  await OnConnect()
  const collection = listModel.user;
  if (req.method !== "PATCH") {
    return;
  }

  const session = await getSession({ req: req });

  if (!session && session != undefined) {
    res.status(401).json({ message: "Not authenticated!" });
    return;
  } else {
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;

    const user = await controll.getByQuery(collection, { email: session?.user?.email ?? '' });

    if (!user) {
      res.status(404).json({ message: "User not found." });
      return;
    }

    const currentPassword = user.password;

    const passwordsAreEqual = await verifyPassword(
      oldPassword,
      currentPassword
    );

    if (!passwordsAreEqual) {
      res.status(403).json({ message: "Invalid password." });
      return;
    }

    const hashedPassword = await hashPassword(newPassword);

    await collection.updateOne(
      { email: session?.user?.email ?? '' },
      { $set: { password: hashedPassword } }
    );

    res.status(200).json({ message: "Password updated!" });
  }
};

export default handler;
