import dayjs from "dayjs";

export type RawItem = {
  name: string;
  detail?: string;
} & (GroupItem | SingleItem) &
  (BackClock | NormalClock | NoClock);

export type Item = RawItem & { id: number };

interface GroupItem {
  category: "group";
  subs: string[];
}

interface SingleItem {
  category: "single";
}

export type BackClock = { timecategory: "backclock"; endtime: string };
export type NormalClock = {
  timecategory: "normalclock";
  endtime: string;
  starttime: string;
};
type NoClock = { timecategory: "noclock" };

export interface ResTemp<T = never> {
  code: number;
  data: T;
  msg: string;
}

export const defaultRawItem: RawItem = {
  category: "single",
  timecategory: "backclock",
  endtime: dayjs().add(1, "hour").toString(),
  name: "",
};
