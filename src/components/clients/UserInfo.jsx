import React, { useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import {
  ClockCircleFilled,
  SettingFilled,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Image, Menu } from "antd";

import { isAuthenticate } from "../../utils/LocalStorage";
import { getProfile } from "../../api/user";
const UserInfo = () => {
  const user = isAuthenticate();
  useEffect(() => {
    const getProfiles = async () => {
      const datauser = await getProfile(user.token);
      console.log("log profile :", datauser);
    };

    getProfiles();
  }, []);
  function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }
  const items = [
    getItem(
      <Link to={`/booking-history/me`}>Lịch sử đặt lịch</Link>,
      "1",
      <ClockCircleFilled />
    ),
    getItem(
      <Link to={`/user-information/me`}>Thông tin tài khoản</Link>,
      "2",
      <UserOutlined />
    ),
    getItem(
      <Link to={`/user-setting/me`}>Cài đặt</Link>,
      "3",
      <SettingFilled />
    ),
  ];
  return (
    <>
      <div>
        <div className="min-h-screen max-w-7xl mx-auto grid grid-cols-5 gap-5 my-10">
          <div className="border border-[#00502b] rounded max-h-[400px] ">
            <div className="text-center border-b">
              <div className="my-5">
                {" "}
                <Avatar
                  size={{
                    xs: 24,
                    sm: 32,
                    md: 40,
                    lg: 64,
                    xl: 80,
                    xxl: 100,
                  }}
                  src={<Image src={user.avatar} preview={false} />}
                  icon={<UserOutlined />}
                />
              </div>
              <h3 className="font-bold text-2xl  mb-5">{user.name}</h3>
            </div>
            <div className="">
              <Menu
                defaultSelectedKeys={["1"]}
                defaultOpenKeys={["sub1"]}
                mode="vertical"
                theme="light"
                items={items}
              />
            </div>
          </div>
          <div className="col-span-4 ">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default UserInfo;
