// import axios from 'axios';
// import type { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

// type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

// interface RequestConfig extends AxiosRequestConfig {
//   method: HttpMethod;
//   url: string;
//   data?: unknown;
// }

// type ApiResponse<T = unknown> = Promise<AxiosResponse<T> | AxiosError>;

// const makeRequest = async <T = unknown>(
//   method: HttpMethod,
//   path: string,
//   payload?: unknown
// ): ApiResponse<T> => {
//   try {
//     const config: RequestConfig = {
//       method: method,
//       url: `https://dummyjson.com/${path.replace(/^\//, '')}`,
//       headers: {},
//       data: payload,
//     };

//     const response = await axios(config);
//     return response;
//   } catch (error) {
//     return error as AxiosError;
//   }
// };

// export const get = async <T = unknown>(path: string): ApiResponse<T> => {
//   return makeRequest<T>('GET', path);
// };

import axios, { AxiosError } from 'axios';

const api = axios.create({
  baseURL: 'https://dummyjson.com',
});

export type ApiResponse<T> = Promise<T>;

export const getRequest = async <T>(path: string): ApiResponse<T> => {
  try {
    const res = await api.get<T>(path);
    return res.data;
  } catch (error) {
    throw error as AxiosError;
  }
};
