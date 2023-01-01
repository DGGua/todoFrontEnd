import { localAxios } from "./globalService";

export const userService = {
  login: (userID: string, password: string) =>
    localAxios.post("/user/login", { userID, password }),
  register: (userID: string, password: string, phone: number) =>
    localAxios.post("/user/register", { userID, password, phone }),
};
