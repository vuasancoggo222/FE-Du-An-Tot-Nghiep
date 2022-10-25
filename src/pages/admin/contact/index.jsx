import { Table, Image, Space, Tooltip, Button } from "antd";
import React from "react";import { Link } from "react-router-dom";
import useContact from "../../../hooks/use-contact";
import { httpDeleteContact } from "../../../api/contact";
import "antd/dist/antd.css";

const columns = [
  {
    title: "Mã Khách Hàng",
    dataIndex: "_id",
  },
  {
    title: "Name",
    dataIndex: "name",
    className: "ant-descriptions-title",
  },
  {
    title: "Phone",
    dataIndex: "phoneNumber",
  },
  {
    title: "Content",
    dataIndex: "content",
  },
  {
    title: "Address",
    dataIndex: "address",
  },
  {
    title: "Create Time",
    dataIndex: "createdAt",
  },
  {
    title: "Update Time",
    dataIndex: "updatedAt",
  },
  {
    title: "Action",
    dataIndex: "_id",
    key: "action",
    colapse: 1,
    render: (item) => {
      let BtFailureCursor;
      let BtFailureColor = "red";
      return (
        <div className="text-center">
          <Space size="middle">
            <Tooltip title="Xóa">
                <Button
                  style={{
                    border: "none",
                    cursor: BtFailureCursor,
                    color: BtFailureColor,
                  }}
                  shape="circle"
                  onClick={() => onRemove(item)}
                >
                  <i
                    style={{ fontSize: "25px" }}
                    data="1"
                    className="far fa-times-circle"
                  ></i>
                </Button>
            </Tooltip>
          </Space>
        </div>
      );
    },
  },
];
const onRemove = async (id) => {
  console.log(id);
  const confirm = window.confirm("Bạn muốn xóa liên hệ ?");
  if (confirm) {
    await httpDeleteContact(id);
  }
};
const onChange = (pagination, filters, sorter, extra) => {
  console.log("params", pagination, filters, sorter, extra);
};
const ContactList = () => {
  const { data, error } = useContact();
  if (!data) return <div>loading</div>;
  if (error) return <div>Failed loading</div>;
  return (
    <>
      <div className="w-full px-6 py-6 mx-auto">
        <div>
          <h1 className="w-[1200px] m-auto text-center mb-0 font-bold text-white capitalize pb-[20px]  text-[50px]">
            <div>List Contact</div>
          </h1>
        </div>
      </div>
      <div className="w-full px-6 py-6 mx-auto">
        <Table
          bordered
          className="bold"
          rowClassName={(record, index) =>
            index % 2 === 0 ? "ant-tag-blue" : "ant-tag-green"
          }
          columns={columns}
          dataSource={data}
          onChange={onChange}
        />
      </div>
    </>
  );
};

export default ContactList;
