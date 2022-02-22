import type { NextApiRequest, NextApiResponse } from "next";
import apiImage from "@/lib/cloudinary";
import cloudinary from "cloudinary";
const clould = cloudinary.v2;
clould.config({
  cloud_name: apiImage.cloudName,
  api_key: apiImage.apiKey,
  api_secret: apiImage.apiSecret,
});

const handler = (req: NextApiRequest, res: NextApiResponse<any>) => {
  const { body, query, method } = req;

  switch (method) {
    case "GET":
      let options = { resource_type: "image", type: "upload", max_results: 25 };
      clould.api.resources(options, function (error, result) {
        if (error) res.status(500).json({ err: error });
        const { resources, next_cursor: nextCursor } = result;
        res.status(200).json({ result: resources, nextPage: nextCursor });
      });
      break;
    case "DELETE":
      if (body.files) res.status(400).json("Not data");
      clould.api.delete_resources(
        body.files,
        { resource_type: "image" },
        function (error, result) {
          if (error) res.status(500).json({ err: error });
          res.status(200).json(result);
        }
      );
      break;
    default:
      res.setHeader("Allow", ["GET", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default handler;
