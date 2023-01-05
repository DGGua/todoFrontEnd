import { Button, Card, Form, Input, Modal } from "antd-mobile";
import { Link, useNavigate } from "react-router-dom";
import "../scss/login.scss";
import { userService } from "../../service/userService";
import { useState } from "react";
export default function Login() {
  const navigate = useNavigate();
  const [loginInfo, setLoginInfo] = useState<{
    id: string;
    password: string;
  }>();
  function handleLogin() {
    const { id = "", password = "" } = loginInfo || {};
    userService.login(id, password).then((response) => {
      if (response.data.msg === "成功") {
        navigate("/home");
      } else {
        const modal = Modal.show({ content: response.data.msg });
        setTimeout(modal.close, 1000);
      }
    });
  }
  return (
    <div className="page page-login">
      <div className="panel-login">
        <h1>登录</h1>
        <Card>
          <Form
            layout="horizontal"
            mode="card"
            onValuesChange={(_, values) => setLoginInfo(values)}
          >
            <Form.Item
              label="账号"
              name="id"
              rules={[{ required: true, message: "账号不能为空" }]}
            >
              <Input placeholder="请输入" />
            </Form.Item>
            <Form.Item
              label="密码"
              name="password"
              rules={[{ required: true, message: "请输入密码" }]}
            >
              <Input placeholder="请输入" type="password" />
            </Form.Item>
          </Form>
        </Card>
        <Link to={"/register"} className="link-to-register">
          没有账号？点击注册
        </Link>
        <Link to={"/home"} className="link-to-register">
          临时入口，直接进去
        </Link>
        <Button block color="primary" size="large" onClick={handleLogin}>
          登录
        </Button>
      </div>
      <u
        className="about"
        onClick={() => {
          Modal.show({
            content: "我们是我们",
            closeOnMaskClick: true,
          });
        }}
      >
        ? 关于我们
      </u>
    </div>
  );
}
