import { DatePicker, Button, Dialog, Card } from "antd-mobile";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import "../scss/home.scss";
import { useNavigate } from "react-router-dom";
import { convertItem, Item } from "../../model/item";
import { itemService } from "../../service/itemService";
import { CheckOutline } from "antd-mobile-icons";

function getTimeStr(item: Item) {
  switch (item.timecategory) {
    case "backclock":
      return `截止时间：${dayjs(item.endtime).format("MM-DD HH:mm")}`;
    case "normalclock":
      return `开始时间：${dayjs(item.starttime).format(
        "MM-DD HH:mm"
      )} 结束时间：${dayjs(item.endtime).format("MM-DD HH:mm")}`;
    default:
      return "";
  }
}

export default function Home() {
  const [pickerVisible, setPickerVisible] = useState(false);
  const [date, setdate] = useState(dayjs());
  const [itemList, setItemList] = useState<Item[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    itemService
      .list(date.format("YYYYMMDD"))
      .then((res) => setItemList(res.data.data.map(convertItem)));
  }, [date]);
  
  function goEdit(item: Item) {
    navigate("/edit", { state: { item } });
  }
  function goAdd() {
    navigate("/edit");
  }
  function goDelete(item: Item) {
    Dialog.confirm({
      content: "确认要删除吗？",
      onConfirm: async () => {
        await itemService.delete(item.id);
        itemService
          .list(date.format("YYYYMMDD"))
          .then((res) => setItemList(res.data.data.map(convertItem)));
      },
    });
  }
  function goComplete(item: Item) {
    Dialog.confirm({
      content: "确认当前待办已完成？",
      onConfirm: async () => {
        await itemService.complete(item.id);
        itemService
          .list(date.format("YYYYMMDD"))
          .then((res) => setItemList(res.data.data.map(convertItem)));
      },
    });
  }
  return (
    <div className="page page-main">
      <Button onClick={() => setPickerVisible(true)}>
        <CalendarOutlined style={{ marginRight: "0.5em" }} />
        {date.format("YYYY-MM-DD")}
      </Button>
      <DatePicker
        visible={pickerVisible}
        onConfirm={(val) => {
          setdate(dayjs(val));
          setPickerVisible(false);
        }}
      />
      <div className="todolist">
        <div className="title">
          <div>待办事件表</div>
          <PlusOutlined onClick={goAdd} />
        </div>
        <div className="content">
          {itemList.map((item) => (
            <Card>
              <div className="title">{item.name}</div>
              <div className="timeinfo">{getTimeStr(item)}</div>

              {item.category === "group" ? (
                <div className="subs">
                  {item.subs.map((sub) => (
                    <div className="sub">
                      <b>●</b>
                      {sub}
                    </div>
                  ))}
                </div>
              ) : null}
              <div className="footer">
                <CheckOutline onClick={() => goComplete(item)} />
                <EditOutlined onClick={() => goEdit(item)} />
                <DeleteOutlined onClick={() => goDelete(item)} />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
