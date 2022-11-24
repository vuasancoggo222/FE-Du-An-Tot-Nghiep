import { Table, Image, Space, Tooltip, Button, Tag } from "antd";
import React from "react";

import { Link } from "react-router-dom";
import useUsers from "../../../hooks/use-user";

const ListUser = () => {
  const { data, error } = useUsers();
  console.log(data);
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },

    {
      title: "phoneNumber",
      dataIndex: "phoneNumber",
    },
    {
      title: "image",
      dataIndex: "avatar",
      render: (avatar) => <Image width={200} src={avatar} key={avatar} />,
    },
    {
      title: "Address",
      dataIndex: "address",
    },
    {
      title: "age",
      dataIndex: "age",
    },
    {
      title: "gender",
      dataIndex: "gender",
      render: (gender) => {
        if (gender === 1) {
          return <span>Nam</span>;
        }
        if (gender === 0) {
          return <span>Nữ</span>;
        }
      },
    },
    {
      title: "role",
      dataIndex: "role",
      render: (role) => {
        if (role === 2) {
          return <span>Admin</span>;
        } else if (role === 1) {
          return <span>Nhân viên</span>;
        } else {
          return <span>Khách hàng</span>;
        }
      },
    },
    {
      title: "status",
      dataIndex: "status",
      render: (status) => {
        if (status === 1) {
          return (
            <Tag color="green" className="p-1">
              ĐẪ KÍCH HOẠT
            </Tag>
          );
        } else if (status === 2) {
          return (
            <Tag color="red" className="p-1">
              ĐÃ KHÓA
            </Tag>
          );
        } else {
          return (
            <Tag color="gold" className="p-1">
              CHƯA KÍCH HOẠT
            </Tag>
          );
        }
      },
    },
    {
      title: "Action",
      dataIndex: "_id",
      key: "action",
      colapse: 2,
      render: (item) => {
        console.log(item);
        // Thêm
        // let BtSusscesCursor;
        // let BtSusscessColor = "#3b82f6";
        // // hủy
        // let BtFailureCursor;
        // let BtFailureColor = "red";
        return (
          <div className="text-center">
            <Space size="middle">
              <Tooltip title="Sửa">
                <Link to={`/admin/user/${item}/edit`}>
                  {" "}
                  <Button type="primary">Sửa</Button>
                </Link>
              </Tooltip>
            </Space>
          </div>
        );
      },
    },
  ];
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  if (!data) return <div>loading</div>;
  if (error) return <div>Failed loading</div>;
  return (
    <>
      <div className="w-full px-6 py-6 mx-auto">
        <div>
          <h1 className="w-[1200px] m-auto text-center mb-0 font-bold text-white capitalize pb-[20px]  text-[50px]">
            <div>User</div>
          </h1>
        </div>
      </div>
      <div className="w-full px-6 py-6 mx-auto">
        <Table columns={columns} dataSource={data} onChange={onChange} />
      </div>
      ;
    </>
  );
};

export default ListUser;
