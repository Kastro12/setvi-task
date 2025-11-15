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
