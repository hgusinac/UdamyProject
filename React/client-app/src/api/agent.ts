import axios, { AxiosResponse } from "axios";
import { resolve } from "path/posix";
import { Activity } from "../app/models/activity";

const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

axios.defaults.baseURL = "http://localhost:5000/api";

axios.interceptors.response.use(async (response) => {
  try {
    await sleep(500);
    return response;
  } catch (error) {
    console.log(error);
    return await Promise.reject(error);
  }
});

const responesBody = <T>(response: AxiosResponse<T>) => response.data;

const request = {
  get: <T>(url: string) => axios.get<T>(url).then(responesBody),
  post: <T>(url: string, body: {}) =>
    axios.post<T>(url, body).then(responesBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responesBody),
  del: <T>(url: string) => axios.delete<T>(url).then(responesBody),
};

const Activities = {
  list: () => request.get<Activity[]>("/activities"),
  details: (id:string) => request.get<Activity>(`/activities/${id}`),
  create: (activity:Activity) => axios.post<void>("/activities",activity),
  update: (activity:Activity) => axios.put<void>(`/activities/${activity.id}`,activity),
  delete: (id: string) => axios.delete<void>(`/activities/${id}`)

};

const agent = {
  Activities,
};

export default agent;
