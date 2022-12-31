import { ResTemp } from "../model/item";
import { localAxios } from "./globalService";

export type InfoPair = { count: number; time: number };
export type AnalType = { total: InfoPair; complete: InfoPair; last: InfoPair };
export const dataService = {
  analysis: () => localAxios.get<ResTemp<AnalType>>("/data/analysis"),
};
