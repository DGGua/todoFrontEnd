import { useEffect } from "react";
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

interface RouteInfo {
  element: JSX.Element;
  title?: string;
  bar?: boolean;
  backward?: boolean;
}

const routeInfo: Record<string, RouteInfo> = {
  "/home": { element: <Home />, title: "待办", bar: true },
  "/data": { element: <Data />, title: "用户信息", bar: true },
  "/edit": { element: <Edit />, title: "编辑", backward: true },
  "/me": { element: <User />, title: "我的", bar: true },
  "/login": { element: <Login />, title: "登录" },
  "/register": { element: <Register />, title: "注册" },
};

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
  const { pathname } = useLocation();
  const navigate = useNavigate();
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
        style={{ display: routeInfo[pathname].title ? "block" : "none" }}
      >
        <NavBar
          back={routeInfo[pathname].backward ? "" : null}
          onBack={() => navigate(-1)}
        >
          {routeInfo[pathname].title}
        </NavBar>
      </div>
      <div className={"tabbar-body"}>
        <Routes>
          {Object.keys(routeInfo).map((key) => (
            <Route key={key} path={key} element={routeInfo[key].element} />
          ))}
          <Route path="*" element={<Navigate to={"/home"} />} />
        </Routes>
      </div>
      <div
        className={"tabbar-bottom"}
        style={{ display: routeInfo[pathname].bar ? "block" : "none" }}
      >
        <Bottom />
      </div>
    </div>
  );
}
