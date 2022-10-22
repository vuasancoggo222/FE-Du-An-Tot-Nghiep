import { message } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { isAuthenticate } from "../utils/LocalStorage";

export const PrivateRouter = (props) => {
  const navigate = useNavigate();
  if (localStorage.getItem("user")) {
    const user = isAuthenticate();
    console.log(user);
    if (user.role !== 0) {
      React.useEffect(() => {
        message.error("Bạn không có quyền truy cập !", 2);
        return navigate("/");
      }, []);
    } else {
      return props.children;
    }
  } else {
    React.useEffect(() => {
      message.error("Bạn không có quyền truy cập !", 2);
      return navigate("/");
    }, []);
  }
};
