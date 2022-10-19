import { Table } from "antd";
import React from "react";
import useContact from "../../../hooks/use-contact";
import "antd/dist/antd.css";

const columns = [
  {
    title: "Mã Khách Hàng",
    dataIndex: "_id",
  },
  {
    title: "Name",
    dataIndex: "name",
    className:"ant-descriptions-title"
  },
  {
    title: "Phone",
    dataIndex: "phoneNumber"
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
    dataIndex: "createdAt"
  },
  {
    title: "Update Time",
    dataIndex: "updatedAt",
  },
];

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
        <Table bordered className="bold" rowClassName={(record, index) => index % 2 === 0 ? 'ant-tag-blue' : 'ant-tag-green'}  columns={columns} dataSource={data} />
      </div>
    </>
  );
};

export default ContactList;
