import type { NextApiRequest, NextApiResponse } from "next";
import client from "@/lib/mongodb";

export default async function userHandler( req: NextApiRequest, res: NextApiResponse<any> ) {
  const { query: { id, name }, method } = req;
  /* const collection = (await client).collection("products"); */

  switch (method) {
    /* case "GET":
      const data = id && name ? { id, name} : name ? {name} : id ? {id} : {} 
      collection.findOne(data).then(value=>{
        res.status(200).json(value);
      })
      break;
    case "PUT":
      collection.findOneAndUpdate({_id:''},{}).then(value=>{
        res.status(200).json(value);
      })
      break;
    case "DELETE":
      collection.deleteOne({_id:''}).then(()=> res.status(204).json({}))
      break; */
    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
