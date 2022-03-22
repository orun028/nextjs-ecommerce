import type { NextApiRequest, NextApiResponse } from "next";
import { OnConnect, listModel, controll } from "@/lib/mongodb";
import prisma from "@/lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  const { body, query, method } = req;
  
  await OnConnect()
  const collection = listModel.user;

  switch (method) {
    case "GET":
      if(query.email){
        res.status(200).json(await controll.getByQuery(collection, query));
        break;
      }
      let page = Number(query.page);
      let limit = Number(query.limit);
      res.status(200).json(await controll.getAll(collection, page, limit));
      break;
    case "POST":
      res.status(201).json(await controll.create(collection, body))
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default handler;
