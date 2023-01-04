import { ResTemp } from "../model/item";
import { localAxios } from "./globalService";

export const userService = {
  login: (userID: string, password: string) =>
    localAxios.post<ResTemp>("/user/login", { userID, password }),
  register: (userID: string, password: string, phone: number) =>
    localAxios.post<ResTemp>("/user/register", { userID, password, phone }),
};
