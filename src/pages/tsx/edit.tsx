import {
  Button,
  DatePicker,
  DatePickerRef,
  Form,
  Input,
  JumboTabs,
  Radio,
  TextArea,
} from "antd-mobile";
import {
  AddCircleOutline,
  ClockCircleOutline,
  CloseCircleOutline,
  MinusCircleOutline,
  PlayOutline,
} from "antd-mobile-icons";
import dayjs from "dayjs";
import { RefObject, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

interface Item {}

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

export default function Edit() {
  const { state } = useLocation();
  const [clockType, setClockType] = useState("backclock");
  const [values, setValues] = useState<any>({});
  const item: Item = state.item;

  useEffect(() => {
    console.log(values);
  }, [values]);

  return (
    <div className="page editpage">
      {item ? "编辑待办" : "添加待办"}
      <Form
        initialValues={values}
        layout="horizontal"
        onValuesChange={(_, values) => setValues(values)}
        footer={
          <div className="form-footer">
            <Button color="primary" size="large">
              确认
            </Button>
            <Button color="default" size="large" onClick={() => {}}>
              取消
            </Button>
          </div>
        }
      >
        <Form.Item
          label="待办名称"
          name="content"
          rules={[{ required: true, message: "名称不能为空" }]}
        >
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item label="待办类型" name="category" required>
          <Radio.Group defaultValue="single">
            {itemTypes.map((item) => (
              <Radio value={item.value}>{item.label}</Radio>
            ))}
          </Radio.Group>
        </Form.Item>
        {values.category === "group" ? (
          <Form.Array
            name="subs"
            onAdd={(operation) => operation.add({ listitem: "" })}
            renderAdd={() => (
              <span>
                <AddCircleOutline /> 添加
              </span>
            )}
          >
            {(fields, operation) =>
              fields.map(({ index }) => (
                <Form.Item
                  name={[index, "listitem"]}
                  label={`项目${index + 1}`}
                  rules={[{ required: true, message: "内容不能为空" }]}
                  extra={
                    <MinusCircleOutline
                      onClick={() => operation.remove(index)}
                    />
                  }
                >
                  <Input placeholder="请输入内容" />
                </Form.Item>
              ))
            }
          </Form.Array>
        ) : null}
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
        <Form.Item
          label="起始时间"
          name="starttime"
          hidden={values.timecategory !== "normalclock"}
          trigger="onConfirm"
          onClick={(e, datePickerRef: RefObject<DatePickerRef>) => {
            datePickerRef.current?.open();
          }}
        >
          <DatePicker precision="minute">
            {(value) =>
              value ? dayjs(value).format("YYYY-MM-DD hh:mm") : "请选择时间"
            }
          </DatePicker>
        </Form.Item>
        <Form.Item
          label={values.timecategory === "backclock" ? "截止时间" : "结束时间"}
          name="endtime"
          hidden={values.timecategory === "noclock"}
          trigger="onConfirm"
          onClick={(e, datePickerRef: RefObject<DatePickerRef>) => {
            datePickerRef.current?.open();
          }}
        >
          <DatePicker precision="minute">
            {(value) =>
              value ? dayjs(value).format("YYYY-MM-DD hh:mm") : "请选择时间"
            }
          </DatePicker>
        </Form.Item>
        <Form.Item label="详细描述" name="detail">
          <TextArea maxLength={100} rows={2} showCount />
        </Form.Item>
      </Form>
    </div>
  );
}
