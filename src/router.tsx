import { useEffect, useState } from "react";
import { NavBar, TabBar } from "antd-mobile";
import {
  Route,
  useLocation,
  Routes,
  useNavigate,
  Navigate,
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
import Login from "./pages/tsx/login";
import Register from "./pages/tsx/register";
import Edit from "./pages/tsx/edit";

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
const tabkeys = tabs.map((item) => item.key);

const Bottom = () => {
  const location = useLocation();
  const { pathname } = location;
  const navigate = useNavigate();
  const setRouteActive = (value: string) => {
    navigate(value);
  };

  return (
    <TabBar activeKey={pathname} onChange={(value) => setRouteActive(value)}>
      {tabs.map((item) => (
        <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
      ))}
    </TabBar>
  );
};

export default function TabbarRouter() {
  const [showTab, setShowTab] = useState(false);
  const location = useLocation();
  useEffect(() => {
    setShowTab(
      tabkeys
        .map((s) => location.pathname.startsWith(s))
        .reduce((prev, now) => prev || now)
    );
  }, [location]);
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
    <div className="tabbar-app">
      <div
        className="tabbar-top"
        style={{ display: showTab ? "block" : "none" }}
      >
        <NavBar>你好</NavBar>
      </div>
      <div className={"tabbar-body"}>
        <Routes>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/data" element={<Data />}></Route>
          <Route path="/edit" element={<Edit />}></Route>
          <Route path="/me" element={<User />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="*" element={<Navigate to={"/login"} />} />
        </Routes>
      </div>
      <div
        className={"tabbar-bottom"}
        style={{ display: showTab ? "block" : "none" }}
      >
        <Bottom />
      </div>
    </div>
  );
}
