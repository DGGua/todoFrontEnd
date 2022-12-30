import { Button, Form, Input } from "antd-mobile";
import { Link } from "react-router-dom";

export default function Register() {
  function handleRegister(
    id: string,
    password: string,
    tel: string,
    password2: string
  ) {
    alert("还没实现");
  }
  return (
    <div className="page page-login">
      <Form
        layout="horizontal"
        mode="card"
        onFinish={(val: {
          id: string;
          tel: string;
          password: string;
          password2: string;
        }) => handleRegister(val.id, val.password, val.tel, val.password2)}
      >
        <Form.Header>注册</Form.Header>
        <Form.Item label="用户名" name="id">
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item label="手机号" name="tel">
          <Input placeholder="请输入" type="number" />
        </Form.Item>
        <Form.Item label="密码" name="password">
          <Input placeholder="请输入" type="password" />
        </Form.Item>
        <Form.Item label="重复密码" name="password2">
          <Input placeholder="请输入" type="password" />
        </Form.Item>
        <Link to={"/login"}>已有账号？点击登录</Link>
        <Button block type="submit" color="primary" size="large">
          注册
        </Button>
      </Form>
    </div>
  );
}
