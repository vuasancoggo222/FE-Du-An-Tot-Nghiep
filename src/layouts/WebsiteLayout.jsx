import React from "react";
import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import Header from "../components/clients/Header";
import Footer from "../components/clients/Footer";



const {  Content} = Layout;

const WebsiteLayout = () => {
  return (
    <>
      <Header />
      <Content>
        <Outlet />
      </Content>
      <Footer />
    </>
  );
};

export default WebsiteLayout;