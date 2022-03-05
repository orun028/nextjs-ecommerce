import type { NextApiRequest, NextApiResponse } from "next";
import { OnConnect, listModel, controll } from "@/lib/mongodb";

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  const { query, method, body, } = req;
  const { id: _id } = query;
  const collection = listModel.product;
  
  switch (method) {
    case "GET":
      res.status(200).json(await controll.getByQuery(collection, {_id}))
      break;
    case "PUT":
      res.status(200).json(await controll.updateByQuery(collection, {_id}, body))
      break;
    case "DELETE":
      res.status(200).json(await controll.deleteByQuery(collection, {_id}))
      break;
    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};
export default OnConnect(handler);
