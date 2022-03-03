import type { NextApiRequest, NextApiResponse } from "next";
import client from "@/lib/mongodb";
import { getAllOrder, getOrder } from "@/lib/mongodb/controller/order";

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  const { body, query, method } = req;
  const collection = client.OrderModel;

  switch (method) {
    case "GET":
      if(query.slug){
        res.status(200).json(await getOrder(query));
        break;
      }
      let page = Number(query.page);
      let limit = Number(query.limit);
      res.status(200).json(await getAllOrder(page, limit, query));
      break;
    case "POST":
      await collection
        .create(body)
        .then((value: any) => {
          res.status(200).json(value);
        })
        .catch((err: any) => console.log(err));
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default client.OnConnect(handler);
