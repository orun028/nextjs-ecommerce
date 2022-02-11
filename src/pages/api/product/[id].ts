import type { NextApiRequest, NextApiResponse } from "next";
import client from "@/lib/mongodb";

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  const { query, method, body, } = req;
  const { id } = query;
  const collection = client.ProductModel;

  switch (method) {
    case "GET":
      await collection.findOne({ _id: id })
      .then((value) => {
        res.status(200).json(value);
      })
      .catch((err: any) => console.log(err));
      break;
    case "PUT":
      await collection.findOneAndUpdate({ _id: id }, body).then((value) => {
        res.status(200).json(value);
      });
      break;
    case "DELETE":
      await collection.deleteOne({ _id: id }).then(() => res.status(204).json({}));
      break;
    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};
export default client.OnConnect(handler);
