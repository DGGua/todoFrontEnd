import { Button, Card, Form, Input, Modal } from "antd-mobile";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userService } from "../../service/userService";

import "../scss/register.scss";

export default function Register() {
  const navigate = useNavigate();
  const [registerInfo, setRegisterInfo] = useState<{
    id: string;
    tel: string;
    password: string;
    password2: string;
  }>({
    id: "",
    password: "",
    password2: "",
    tel: "",
  });
  function handleRegister() {
    const { id, tel, password } = registerInfo;
    userService.register(id, password, Number.parseInt(tel)).then((res) => {
      const modal = Modal.show({ content: res.data.msg });
      setTimeout(() => {
        modal.close();
        if (res.data.msg === "注册成功") navigate("/login");
      }, 1000);
    });
  }
  return (
    <div className="page page-register">
      <div className="panel-register">
        <h1>注册</h1>
        <Card>
          <Form
            layout="horizontal"
            mode="card"
            initialValues={registerInfo}
            onValuesChange={(_, values) => setRegisterInfo(values)}
          >
            <Form.Item
              label="用户名"
              name="id"
              rules={[{ required: true, message: "用户名不能为空" }]}
            >
              <Input placeholder="请输入" />
            </Form.Item>
            <Form.Item
              label="手机号"
              name="tel"
              rules={[{ required: true, message: "手机号不能为空" }]}
            >
              <Input placeholder="请输入" type="number" />
            </Form.Item>
            <Form.Item
              label="密码"
              name="password"
              rules={[{ required: true, message: "密码不能为空" }]}
            >
              <Input placeholder="请输入" type="password" />
            </Form.Item>
            <Form.Item
              label="重复密码"
              name="password2"
              rules={[
                {
                  validator: (_, value: string) =>
                    value === registerInfo.password
                      ? Promise.resolve()
                      : Promise.reject("两次输入的密码不一致！"),
                },
              ]}
            >
              <Input placeholder="请输入" type="password" />
            </Form.Item>
          </Form>
        </Card>
        <Link to={"/login"} className="link-to-login">
          已有账号？点击登录
        </Link>
        <Button block color="primary" size="large" onClick={handleRegister}>
          注册
        </Button>
      </div>
    </div>
  );
}
