import axios from "axios";

export const localAxios = axios.create({
  baseURL: "https://mock.apifox.cn/m1/2145942-0-default",
//   baseURL: "http://192.168.1.101:8081",
  withCredentials: true,
});
