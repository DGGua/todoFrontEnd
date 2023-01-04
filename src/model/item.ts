import dayjs from "dayjs";

export type RawItem = {
  name: string;
  detail?: string;
} & (GroupItem | SingleItem) &
  (BackClock | NormalClock | NoClock);

export type Item = RawItem & { id: number };

export type RawItemUnconverted = {
  name: string;
  detail?: string;
} & (GroupItem | SingleItem) &
  (BackClockUnconverted | NormalClockUnconverted | NoClock);

export type ItemUnconverted = RawItemUnconverted & { id: number };

interface GroupItem {
  category: "group";
  subs: string[];
}

interface SingleItem {
  category: "single";
}

type BackClock = { timecategory: "backclock"; endtime: Date };
type NormalClock = {
  timecategory: "normalclock";
  endtime: Date;
  starttime: Date;
};
type BackClockUnconverted = Omit<BackClock, "endtime"> & { endtime: string };
type NormalClockUnconverted = Omit<NormalClock, "endtime" | "starttime"> & {
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
  endtime: dayjs().add(1, "hour").toDate(),
  name: "",
};

const convertFormat = "YYYY-MM-DD HH:mm:ss";

export function convertItem(unconvertedItem: RawItemUnconverted): RawItem;
export function convertItem(unconvertedItem: ItemUnconverted): Item;
export function convertItem(
  unconvertedItem: ItemUnconverted | RawItemUnconverted
): Item | RawItem {
  const mid: any = { ...unconvertedItem };
  if (unconvertedItem.timecategory === "normalclock") {
    mid.endtime = dayjs(unconvertedItem.endtime, convertFormat).toDate();
    mid.starttime = dayjs(unconvertedItem.starttime, convertFormat).toDate();
  } else if (unconvertedItem.timecategory === "backclock") {
    mid.starttime = undefined;
    mid.endtime = dayjs(unconvertedItem.endtime, convertFormat).toDate();
  } else {
    mid.starttime = mid.endtime = undefined;
  }
  return mid;
}

export function unconvertItem(convertedItem: RawItem): RawItemUnconverted;
export function unconvertItem(convertedItem: Item): ItemUnconverted;
export function unconvertItem(
  convertedItem: Item | RawItem
): ItemUnconverted | RawItemUnconverted {
  const mid: any = { ...convertedItem };
  if (convertedItem.timecategory === "normalclock") {
    mid.endtime = dayjs(convertedItem.endtime).format(convertFormat);
    mid.starttime = dayjs(convertedItem.starttime).format(convertFormat);
  } else if (convertedItem.timecategory === "backclock") {
    mid.starttime = undefined;
    mid.endtime = dayjs(convertedItem.endtime).format(convertFormat);
  } else {
    mid.starttime = mid.endtime = undefined;
  }
  return mid;
}
