const next_host = process.env.NEXT_PUBLIC_HOST;
const next_post = process.env.NEXT_PUBLIC_POST;
const hostAPi = next_host && next_post ? next_host+':'+next_post+'/api/' : 'http://127.0.0.1:3000';

function useApi(endUrl: string){
  return hostAPi+endUrl
}

export default useApi;
