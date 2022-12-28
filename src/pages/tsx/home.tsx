import { DatePicker, Button } from "antd-mobile";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { List } from "antd";
import { useState } from "react";
import * as dayjs from "dayjs";
import "../scss/home.scss";

const data = [
  "Racing car sprays burning fuel into crowd.",
  "Japanese princess to wed commoner.",
  "Australian walks 100km after outback crash.",
  "Man charged over missing wedding girl.",
  "Los Angeles battles huge wildfires.",
];

export default function Home() {
  const [pickerVisible, setPickerVisible] = useState(false);
  const [date, setdate] = useState(dayjs.default());
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
            <PlusOutlined />
            <EditOutlined />
            <DeleteOutlined />
          </div>
        </div>
        <List
          className="content"
          size="small"
          header={<div>Header</div>}
          footer={<div>Footer</div>}
          bordered
          dataSource={data}
          renderItem={(item) => <List.Item>{item}</List.Item>}
        />
      </div>
    </div>
  );
}
