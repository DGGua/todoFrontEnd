import { Item, RawItem, ResTemp } from "../model/item";
import { localAxios } from "./globalService";

export const itemService = {
  create: (item: RawItem) => localAxios.put<ResTemp>("/todo/create", item),
  list: (date: string) =>
    localAxios.get<ResTemp<Item[]>>("/todo/list", { params: { date } }),
  get: (id: number) =>
    localAxios.get<ResTemp<Item>>("/todo/get", { params: { id } }),
  update: (item: Item) =>
    localAxios.post<ResTemp<Item>>("/todo/update",  { item } ),
  delete: (id: number) =>
    localAxios.delete<ResTemp>("/todo/delete", { params: { id } }),
  complete: (id: number) =>
    localAxios.post<ResTemp>("/todo/complete", { params: { id } }),
};
