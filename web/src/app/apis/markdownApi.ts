import axios, { AxiosResponse } from 'axios';

export const fetchMarkdown = (url: string): Promise<AxiosResponse<string>> =>
  axios.get(url);
