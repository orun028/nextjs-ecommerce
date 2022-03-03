import { delProduct, getProduct, upProduct } from '@/lib/mongodb/controller/product';
import type { NextApiRequest, NextApiResponse } from "next";
import client from "@/lib/mongodb";

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  const { query, method, body, } = req;
  const { id: _id } = query;
  
  switch (method) {
    case "GET":
      res.status(200).json(await getProduct({_id}))
      break;
    case "PUT":
      res.status(200).json(await upProduct({_id}, body))
      break;
    case "DELETE":
      res.status(200).json(await delProduct({_id}))
      break;
    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};
export default client.OnConnect(handler);
