import React, { useState } from "react";
import { Modal, Space, Table, Tag } from 'antd';
import { Typography } from 'antd';
import {
  PlusCircleFilled,
  FormOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { Link } from "react-router-dom";
const ListBooking = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'description',
      dataIndex: 'desc',
      key: 'desc',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
  
            if (tag === 'loser') {
              color = 'volcano';
            }
  
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: () => (
        <Space size="middle">
          <Link to={"/admin/service/edit"} ><button style={{fontSize:"18px",color:"#0000FF"}}><FormOutlined /></button></Link>
          <button onClick={showModal} style={{fontSize:"18px",color:"red"}}><DeleteOutlined /></button>
        </Space>
      ),
    },
  ];
  const data = [
    { 
      key: '1',
      name: 'John Brown',
      price: 32,
      desc: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      key: '2',
      name: 'Jim Green',
      price: 42,
      desc: 'London No. 1 Lake Park',
      tags: ['loser'],
    },
    {
      key: '3',
      name: 'Joe Black',
      price: 32,
      desc: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
  ];
  
  const { Title } = Typography;
  return <div>
    <div style={{fontSize:"30px", cursor:"pointer"}} className="flex justify-between ... "><Title level={3}>List Booking</Title><Link to={"/admin/service/add"}><PlusCircleFilled /></Link></div>
    <Table columns={columns} dataSource={data} />;
   
      <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
  </div>;
};
export default ListBooking;