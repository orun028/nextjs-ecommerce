import { ParsedUrlQuery } from "querystring";
import { Model, UpdateQuery } from "mongoose";

const values = {

  getAll: async function (collection: Model<any>, page: number, limit: number, query?: ParsedUrlQuery ) {
    const total = await collection.countDocuments();
    if (page || limit) {
      let skipPage = 0;
      if (page >= 1) {
        skipPage = (page - 1) * (limit || 10);
      }
      if (query) {
        delete query.page;
        delete query.limit;
      }
      const result = await collection
        .find(query as {})
        .skip(Number(skipPage))
        .limit(limit || 10);
      return { result, total };
    } else {
      const result = await collection.find(query as {});
      return { result, total };
    }
  },
  
  create: async function (collection: Model<any>, body: any) {
    return await collection.create(body);
  },
  
  getByQuery: async function (collection: Model<any>, query: ParsedUrlQuery) {
    return await collection.findOne(query);
  },
  
  updateByQuery: async function (collection: Model<any>, query: ParsedUrlQuery, update?: UpdateQuery<any> | undefined ) {
    return await collection.findOneAndUpdate(query, update)
  },
  
  deleteByQuery: async function (collection: Model<any>, query: ParsedUrlQuery) {
    return await collection.findOneAndDelete(query);
  }

}
export default values;


