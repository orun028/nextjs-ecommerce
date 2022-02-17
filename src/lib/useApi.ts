const api = "http://localhost:3000/api/";

async function get(url: RequestInfo, headers?: HeadersInit) {
  const response = await fetch(api + url, {
    method: "GET",
    headers: headers,
  });
  return await response.json();
}
async function post(url: RequestInfo, data: BodyInit) {
  const response = await fetch(api + url, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const resData = await response.json();

  return resData;
}
const useApi = { get, post };

export default useApi;
