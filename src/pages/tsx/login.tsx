import { Button, Form, Input, Modal } from "antd-mobile";
import { Link } from "react-router-dom";
import "../scss/login.scss";
import {userService} from "../../service/userService";
export default function Login() {
  function handleLogin(id: string, password: string) {
    userService.login(id,password)
        .then(response =>{
          //成功
          if(response.data.msg === "200"){

          }
          else {

          }
        })
  }
  return (
    <div className="page page-login">
      <div className="panel-login">
        <h1>登录</h1>
        <Form
          layout="horizontal"
          mode="card"
          onFinish={(val: { id: string; password: string }) =>
            handleLogin(val.id, val.password)
          }
        >
          <Form.Item label="账号" name="id">
            <Input placeholder="请输入" />
          </Form.Item>
          <Form.Item label="密码" name="password">
            <Input placeholder="请输入" type="password" />
          </Form.Item>
          <Link to={"/register"} className="link-to-register">
            没有账号？点击注册
          </Link>
          <Link to={"/home"} className="link-to-register">
            临时入口，直接进去
          </Link>
          <Button block type="submit" color="primary" size="large">
            登录
          </Button>
        </Form>
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
