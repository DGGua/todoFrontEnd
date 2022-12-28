import { Card, Avatar, List } from "antd-mobile";
import {
  UserOutline,
  SetOutline,
  EyeInvisibleOutline,
  EyeOutline,
} from "antd-mobile-icons";
import { useState } from "react";
import "../scss/user.scss";

export default function User() {
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("darkmode") != null
  );
  return (
    <div className="page page-user">
      <Card>
        <div className="user-info">
          <Avatar
            className="user-avatar"
            src="https://via.placeholder.com/150"
          ></Avatar>
          <div className="user-name">李二狗</div>
        </div>
      </Card>
      <List>
        <List.Item prefix={<UserOutline />} onClick={() => {}}>
          账号信息
        </List.Item>
        <List.Item prefix={<SetOutline />} onClick={() => {}}>
          高级设置
        </List.Item>
        <List.Item
          prefix={isDarkMode ? <EyeOutline /> : <EyeInvisibleOutline />}
          onClick={() => {
            if (!isDarkMode) {
              localStorage.setItem("darkmode", "true");
              document.documentElement.setAttribute(
                "data-prefers-color-scheme",
                "dark"
              );
            } else {
              localStorage.removeItem("darkmode");
              document.documentElement.removeAttribute(
                "data-prefers-color-scheme"
              );
            }
            setIsDarkMode((prev) => !prev);
          }}
        >
          {isDarkMode ? "明亮模式" : "夜间模式"}
        </List.Item>
      </List>
    </div>
  );
}
