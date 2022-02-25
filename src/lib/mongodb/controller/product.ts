import client from "@/lib/mongodb";
const collection = client.ProductModel;

export async function getAllProduct( page: number, limit: number, query?: { [key: string]: string | string[] } ) {
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

export async function setProduct(body: any) {
    return await collection.create(body)
}
