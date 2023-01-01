import { DatePicker, Button } from "antd-mobile";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { List } from "antd-mobile";
import { useEffect, useState } from "react";
import * as dayjs from "dayjs";
import "../scss/home.scss";
import { useNavigate } from "react-router-dom";
import { Item } from "../../model/item";
import { itemService } from "../../service/itemService";

export default function Home() {
  const [pickerVisible, setPickerVisible] = useState(false);
  const [date, setdate] = useState(dayjs.default());
  const [chosenItem, setChosenItem] = useState<Item>();
  const [itemList, setItemList] = useState<Item[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    itemService
      .list(date.format("YYYYMMDD"))
      .then((res) => setItemList(res.data.data));
  }, [date]);
  useEffect(() => {
    console.log(itemList);
  }, [itemList]);

  function goEdit() {
    if (!!!chosenItem) return;
    navigate("/edit", { state: { item: chosenItem } });
  }
  function goAdd() {
    navigate("/edit", { state: { item: chosenItem } });
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
          setdate(dayjs.default(val));
          setPickerVisible(false);
        }}
      />
      <div className="todolist">
        <div className="title">
          <div>待办事件表</div>
          <div className="icons">
            <PlusOutlined onClick={goAdd} />
            <EditOutlined onClick={goEdit} />
            <DeleteOutlined />
          </div>
        </div>
        <List className="content">
          {itemList.map((item) => (
            <>
              <List.Item key={item.id} onClick={() => setChosenItem(item)}>
                {item.name}
              </List.Item>
              {item.category === "group"
                ? item.subs.map((sub, index) => (
                    <List.Item key={index} className="item-sub">
                      {sub}
                    </List.Item>
                  ))
                : null}
            </>
          ))}
        </List>
      </div>
    </div>
  );
}
