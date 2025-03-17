import axios from 'axios';

const AUTHORIZATION = 'Authorization';
const axiosInstance = axios.create({
  baseURL: 'http://ec2-18-191-10-78.us-east-2.compute.amazonaws.com:7000',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});

axiosInstance.interceptors.request.use(async config => {
  try {
    const authToken = null;
  } catch (error) {}
  return config;
});

export default class HTTPService {
  static get(url: string, params: any = null): Promise<any> {
    return new Promise((resolve, reject) => {
      axiosInstance
        .get(url, {params: params})
        .then(response => resolve(response.data))
        .catch(error => reject(error.response.data || error));
    });
  }

  static put(url: string, body: any): Promise<any> {
    return new Promise((resolve, reject) => {
      axiosInstance
        .put(url, body)
        .then(response => resolve(response.data))
        .catch(error => reject(error.response.data || error));
    });
  }

  static post(url: string, body: any): Promise<any> {
    return new Promise((resolve, reject) => {
      axiosInstance
        .post(url, body)
        .then(response => resolve(response.data))
        .catch(error => reject(error.response.data || error));
    });
  }

  static delete(url: string, body: any): Promise<any> {
    return new Promise((resolve, reject) => {
      axiosInstance
        .delete(url, {data: body})
        .then(response => resolve(response.data))
        .catch(error => reject(error.response.data || error));
    });
  }
}
