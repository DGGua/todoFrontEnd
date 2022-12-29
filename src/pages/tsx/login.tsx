import { Button, Card, Form, Input } from "antd-mobile";
import { Link } from "react-router-dom";

export default function Login() {
  function handleLogin(id: string, password: string) {
    alert("还没实现");
  }
  return (
    <div className="page page-login">
      <Form
        layout="horizontal"
        mode="card"
        onFinish={(val: { id: string; password: string }) =>
          handleLogin(val.id, val.password)
        }
      >
        <Form.Header>登录</Form.Header>
        <Form.Item label="账号" name="id">
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item label="密码" name="password">
          <Input placeholder="请输入" type="password" />
        </Form.Item>
        <Link to={"/register"}>没有账号？点击注册</Link>
        <Link to={"/home"}>临时入口，直接进去</Link>
        <Button block type="submit" color="primary" size="large">
          登录
        </Button>
      </Form>
    </div>
  );
}
