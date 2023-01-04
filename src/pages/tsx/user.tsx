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
            style={{ "--size": "64px" }}
            src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Ffile.digitaling.com%2FeImg%2Fuimages%2F20160628%2F1467084764363927.jpg&refer=http%3A%2F%2Ffile.digitaling.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1675429629&t=20e79ccb171c0c0d417687a4600d9edf"
          ></Avatar>
          <div className="user-name">李二狗</div>
        </div>
      </Card>
      <Card>
        <List className="config-list">
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
      </Card>
    </div>
  );
}
