import { ItemUnconverted, ResTemp } from "../model/item";
import { localAxios } from "./globalService";

export const itemService = {
  create: (item: ItemUnconverted) =>
    localAxios.put<ResTemp>("/todo/create", item),
  list: (date: string) =>
    localAxios.get<ResTemp<ItemUnconverted[]>>("/todo/list", {
      params: { date },
    }),
  get: (id: number) =>
    localAxios.get<ResTemp<ItemUnconverted>>("/todo/get", { params: { id } }),
  update: (item: ItemUnconverted) =>
    localAxios.post<ResTemp>("/todo/update", { item }),
  delete: (id: number) =>
    localAxios.delete<ResTemp>("/todo/delete", { params: { id } }),
  complete: (id: number) =>
    localAxios.post<ResTemp>("/todo/complete", null, { params: { id } }),
};
