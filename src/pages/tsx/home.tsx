import { DatePicker, Button, Modal } from "antd-mobile";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { Form, List, Input } from "antd-mobile";
import { useState } from "react";
import * as dayjs from "dayjs";
import "../scss/home.scss";
import { EditItem } from "../../components/tsx/editItem";

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
  const [modalVisible, setModalVisible] = useState(true);
  const [chosenItem, setChosenItem] = useState<Item>();
  function showAdd() {
    setModalVisible(true);
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
            <PlusOutlined onClick={showAdd} />
            <EditOutlined />
            <DeleteOutlined />
          </div>
        </div>
        <List className="content">
          {data.map((item) => (
            <List.Item>{item}</List.Item>
          ))}
        </List>
      </div>
      <Modal
        visible={modalVisible}
        content={
          <EditItem
            onConfirm={() => {
              alert("还没实现");
              setModalVisible(false);
            }}
            onCancel={() => {
              alert("还没实现");
              setModalVisible(false);
            }}
          />
        }
      />
    </div>
  );
}
