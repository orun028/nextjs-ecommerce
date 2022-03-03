import { ParsedUrlQuery } from 'querystring';
import client from "@/lib/mongodb";
import { UpdateQuery } from 'mongoose';
const collection = client.OrderModel;

export async function getAllOrder( page: number, limit: number, query?: { [key: string]: string | string[] } ) {
  const total = await collection.countDocuments();
  if (page || limit) {
    let skipPage = 0;
    if (page >= 1) { skipPage = (page - 1) * (limit || 10); }
    if (query) { delete query.page; delete query.limit; }
    const result = await collection .find(query as {}) .skip(Number(skipPage)) .limit(limit || 10);
    return { result, total };
  } else {
    const result = await collection.find(query as {});
    return { result, total };
  }
}

export async function setOrder(body: any) {
    return await collection.create(body)
}

export async function getOrder(query: ParsedUrlQuery) {
  return await collection.findOne(query)
}

export async function upOrder( query: ParsedUrlQuery, update?: UpdateQuery<any> | undefined) {
  return await collection.findOneAndUpdate(query, update)
}

export async function delOrder(query: ParsedUrlQuery) {
  return await collection.findOneAndDelete(query)
}