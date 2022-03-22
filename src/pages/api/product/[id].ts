import type { NextApiRequest, NextApiResponse } from "next";
import { OnConnect, listModel, controll } from "@/lib/mongodb";
import { getSession } from "next-auth/react";
import { getToken } from "next-auth/jwt"
const secret = process.env.SECRET

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  await OnConnect()
  //const token = await getToken({ req, secret })
  const { query, method, body } = req;
  const { id: _id } = query;
  const collection = listModel.product;
  const session = await getSession({ req });
  if (session) {
    switch (method) {
      case "GET":
        res.status(200).json(await controll.getByQuery(collection, { _id }));
        break;
      case "PUT":
        res
          .status(200)
          .json(await controll.updateByQuery(collection, { _id }, body));
        break;
      case "DELETE":
        res.status(200).json(await controll.deleteByQuery(collection, { _id }));
        break;
      default:
        res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  }
  res.status(403).send({
    error: "You must be sign in to view the protected content on this page.",
  })
};
export default handler;
