import {
    DesktopOutlined,
    FileOutlined,
    PieChartOutlined,
    UserOutlined,
  } from '@ant-design/icons';
  import {Layout, Menu } from 'antd';
  import {NavLink} from 'react-router-dom'
  import React, { useState } from 'react';
  const Sidebar = () => {
    const { Sider } = Layout;  
   
    const logo = {
      height: "32px",
      margin: "16px",
      background: "rgba(255, 255, 255, 0.3)",
    }
    const [collapsed, setCollapsed] = useState(false);
  
    function getItem(label, key, icon, children) {
      return {
        key,
        icon,
        children,
        label,
      };
    }
    const items = [
      getItem(<NavLink to={"/admin/booking"}>Booking</NavLink>, '1',<PieChartOutlined />),
      getItem(<NavLink to={"/admin/service"}>Service</NavLink>, '1',<PieChartOutlined />),
      getItem( <NavLink to={"/admin/shift"}>Shift</NavLink>, '2', <DesktopOutlined />),
      getItem(<NavLink to={"/admin/employee"}>Employee</NavLink>, '3', <UserOutlined />),
      getItem(<NavLink to={"/admin/user"}>User</NavLink>, '4', <UserOutlined />),
      // getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
      getItem(<NavLink to={"/admin/contact"}>Contact</NavLink>, '5', <FileOutlined />),
    ];
  
    return <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
      <div style={logo} className="logo" />
      <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
    </Sider>;
  };
  
  export default Sidebar;