import type { NextApiRequest, NextApiResponse } from "next";
import client from "@/lib/mongodb";
import { getAllProduct, setProduct } from "@/lib/mongodb/controller/product";

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  const { body, query, method } = req;

  switch (method) {
    case "GET":
      let page = Number(query.page);
      let limit = Number(query.limit);
      res.status(200).json(await getAllProduct(page, limit, query));
      break;
    case "POST":
      res.status(201).json(await setProduct(body))
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default client.OnConnect(handler);
