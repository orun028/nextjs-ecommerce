import type { NextApiRequest, NextApiResponse } from "next";
import client from "@/lib/mongodb";

const handler = async ( req: NextApiRequest, res: NextApiResponse<any> ) => {
  const { body, query, method } = req;
  const collection = client.ProductModel

  switch (method) {
    case "GET":
      let page = Number(query.page);
      let limit = Number(query.limit);
      if (page >= 1 || limit >= 1) {
        let skipPage = 0;
        if(page >= 1){ skipPage = (page - 1) * limit || 10; }

        delete query.page;
        delete query.limit;

        await collection
          .find(query)
          .skip(Number(skipPage))
          .limit(limit)
          .then(async (values: any) => {
            await collection.countDocuments().then((total: number) => {
              res.status(200).json({result:values, total: total});
            });
          });
      } else {
        await collection
          .find()
          .then((values: any) => {
            res.status(200).json(values);
          });
      }
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
}

export default client.OnConnect(handler);