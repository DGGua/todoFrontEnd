import { DatePicker, Button } from "antd-mobile";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { List } from "antd-mobile";
import { useState } from "react";
import * as dayjs from "dayjs";
import "../scss/home.scss";
import { useNavigate } from "react-router-dom";

const data = [
  "Racing car sprays burning fuel into crowd.",
  "Japanese princess to wed commoner.",
  "Australian walks 100km after outback crash.",
  "Man charged over missing wedding girl.",
  "Los Angeles battles huge wildfires.",
];

interface Item {}

export default function Home() {
  const [pickerVisible, setPickerVisible] = useState(false);
  const [date, setdate] = useState(dayjs.default());
  const [chosenItem, setChosenItem] = useState<Item>();
  const navigate = useNavigate();
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
          {data.map((item) => (
            <List.Item onClick={() => setChosenItem(item)}>{item}</List.Item>
          ))}
        </List>
      </div>
    </div>
  );
}
