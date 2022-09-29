import axios, { Method, AxiosResponse } from 'axios';

const api = axios.create({
  // Base URL: process.env.REACT_APP_HOST_BACK_END,
  baseURL: 'https://rickandmortyapi.com/api',
});

const request = <T>(method: Method, url: string, params: any): Promise<AxiosResponse<T>> => {
  return api.request<T>({
    method,
    url,
    params,
  });
};

// Define a default query function that will receive the query key
export const defaultQueryFn = async ({ queryKey }: any): Promise<unknown> => {
  const data = await request(queryKey[0], queryKey[1], queryKey[2]);
  return data;
};
