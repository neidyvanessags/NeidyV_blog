import { request } from 'graphql-request';
import pThrottle from 'p-throttle';
const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

const throttle = pThrottle({limit: 5, interval: 1000})

export const throttled = throttle(async (...args) => {
  const [client, query,vars] = args
  if (vars) {
    return await request(client, query, vars);
  }
  else {
    return await request(client, query);
  }
})

export const clientThrottle = throttle(async (...args)=>{
  const [client, query, vars] = args
  return await client.request(query,vars)
})