import React, { FC, useEffect } from "react";
import { NavBar, TabBar } from "antd-mobile";
import {
  Route,
  useLocation,
  MemoryRouter as Router,
  Routes,
  useNavigate,
} from "react-router-dom";
import {
  MessageOutline,
  UnorderedListOutline,
  UserOutline,
} from "antd-mobile-icons";
import Home from "./pages/tsx/home";
import "./router.scss";
import Data from "./pages/tsx/data";
import User from "./pages/tsx/user";
const Bottom: FC = () => {
  const location = useLocation();
  const { pathname } = location;
  const navigate = useNavigate();
  const setRouteActive = (value: string) => {
    navigate(value);
  };

  const tabs = [
    {
      key: "/home",
      title: "待办",
      icon: <UnorderedListOutline />,
    },
    {
      key: "/data",
      title: "统计数据",
      icon: <MessageOutline />,
    },
    {
      key: "/me",
      title: "我的",
      icon: <UserOutline />,
    },
  ];

  return (
    <TabBar activeKey={pathname} onChange={(value) => setRouteActive(value)}>
      {tabs.map((item) => (
        <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
      ))}
    </TabBar>
  );
};

export default function TabbarRouter() {
  // 夜间模式
  useEffect(() => {
    if (localStorage.getItem("darkmode") != null) {
      document.documentElement.setAttribute(
        "data-prefers-color-scheme",
        "dark"
      );
    }
  }, []);

  return (
    <Router initialEntries={["/home"]}>
      <div className="tabbar-app">
        <div className="tabbar-top">
          <NavBar>你好</NavBar>
        </div>
        <div className={"tabbar-body"}>
          <Routes>
            <Route path="/home" element={<Home />}></Route>
            <Route path="/data" element={<Data />}></Route>
            <Route path="/me" element={<User />}></Route>
          </Routes>
        </div>
        <div className={"tabbar-bottom"}>
          <Bottom />
        </div>
      </div>
    </Router>
  );
}
