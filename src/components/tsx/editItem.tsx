import {
  Button,
  CapsuleTabs,
  DatePicker,
  DatePickerRef,
  Form,
  Input,
  JumboTabs,
  Radio,
  Selector,
} from "antd-mobile";
import {
  ClockCircleOutline,
  CloseCircleOutline,
  LeftOutline,
  PlayOutline,
} from "antd-mobile-icons";
import dayjs from "dayjs";
import { RefObject, useState } from "react";

interface Item {}

function genItem(): Item {
  return {};
}

interface EditItemProps {
  item?: Item;
  onConfirm: (item: Item) => void;
  onCancel: () => void;
}

const itemTypes = [
  {
    label: "待办",
    value: "single",
  },
  {
    label: "待办集",
    value: "group",
  },
];

export function EditItem(props: EditItemProps) {
  const { item = genItem(), onCancel, onConfirm } = props;
  const [clockType, setClockType] = useState("backclock");
  const noitem = props.item === undefined;
  return (
    <div className="edititem">
      <Form layout="vertical">
        <Form.Header>{noitem ? "添加待办" : "编辑待办"}</Form.Header>
        <Form.Item label="待办名称" name="id">
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item label="待办类型" name="category">
          <Radio.Group>
            {itemTypes.map((item) => (
              <Radio value={item.value}>{item.label}</Radio>
            ))}
          </Radio.Group>
        </Form.Item>
        <Form.Item label="计时类型" name="timecategory">
          <JumboTabs activeKey={clockType} onChange={setClockType}>
            <JumboTabs.Tab
              title={<ClockCircleOutline />}
              description="倒计时"
              key="backclock"
            ></JumboTabs.Tab>
            <JumboTabs.Tab
              title={<PlayOutline />}
              description="正向计时"
              key="normalclock"
            ></JumboTabs.Tab>
            <JumboTabs.Tab
              title={<CloseCircleOutline />}
              description="不计时"
              key="noclock"
            ></JumboTabs.Tab>
          </JumboTabs>
        </Form.Item>
        {clockType === "backclock" ? (
          <Form.Item label="待办类型" name="category">
            <Radio.Group>
              {itemTypes.map((item) => (
                <Radio value={item.value}>{item.label}</Radio>
              ))}
            </Radio.Group>
          </Form.Item>
        ) : null}
        <Form.Item
          label="起始时间"
          trigger="onConfirm"
          onClick={(_, datePickerRef: RefObject<DatePickerRef>) => {
            console.log(datePickerRef.current);
            datePickerRef.current?.open();
          }}
        >
          <DatePicker>
            {(value) =>
              value ? dayjs(value).format("YYYY-MM-DD") : "请选择日期"
            }
          </DatePicker>
        </Form.Item>
        <Button type="submit" color="primary" size="large" onClick={onConfirm}>
          确认
        </Button>
        <Button type="submit" color="primary" size="large" onClick={onCancel}>
          取消
        </Button>
      </Form>
    </div>
  );
}
