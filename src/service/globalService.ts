import axios from "axios";

export const localAxios = axios.create({
  // baseURL: "https://mock.apifox.cn/m1/2145942-0-default",
  //   baseURL: "http://todo.dggua.top/api",
  //   baseURL: "http://192.168.1.101:8080",
  baseURL: "http://todob.dggua.top",
  withCredentials: true,
});

localAxios.interceptors.response.use((res) => {
  if (res.data.msg === "未登录") window.location.href = "/login";
  return Promise.resolve(res);
});
