import { Table, Image, Space, Tooltip, Button, Select } from "antd";
import React from "react";
import { httpGetAllUser } from "../../../api/user";
import Description from "../../../components/admin/detaiservice";
import { BiEdit } from "react-icons/bi";
import { Link } from "react-router-dom";
import useUsers from "../../../hooks/use-user";
const { Option } = Select;
const ListUser = () => {
  const { data, error } = useUsers();
  console.log(data);
  const handleChange = (value) => {
    console.log(`selected ${value}`);
    // const handleEdit = async ()=>{
    //     await UpdateUser()
    // }
    // handleEdit()
  };
  const statusHandle = (e) => {
    if (e == 0) return "Chưa kích hoạt";
    if (e == 1) return "Đã kích hoạt";
    if (e == 2) return "Vô hiệu hóa";
  };
  const roleHandle = (e) => {
    if (e == 0) return "Khách hàng";
    if (e == 1) return "Nhân viên";
    if (e == 2) return "Admin";
  };
  const handleChangerole = (e) => {
    console.log(`selected ${e}`);
  };
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
    },
    {
      title: "role",
      dataIndex: "role",
      render: (role) => {
        return (
          <>
            <Select
            //   defaultValue={roleHandle(role)}
              defaultValue={"Khách hàng"}
              style={{
                width: 130,
              }}
              onChange={handleChangerole}
            >
              <Option value="0">Khách hàng</Option>
              <Option value="1">Nhân viên</Option>
              <Option value="2">Admin</Option>
            </Select>
          </>
        );
      },
    },
    {
      title: "status",
      dataIndex: "status",
      render: (status) => {
        return (
          <>
            <Select
              defaultValue={statusHandle(status)}
              style={{
                width: 130,
              }}
              onChange={handleChange}
            >
              <Option value="0">Chưa kích hoạt</Option>
              <Option value="1">Đã kích hoạt</Option>
              <Option value="2">Vô hiệu hóa</Option>
            </Select>
          </>
        );
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
        let BtSusscesCursor;
        let BtSusscessColor = "#3b82f6";
        // hủy
        let BtFailureCursor;
        let BtFailureColor = "red";
        return (
          <div className="text-center">
            <Space size="middle">
              <Tooltip title="Sửa">
                <Link to={`/admin/user/${item}/edit`}>
                  {" "}
                  <Button
                    style={{
                      border: "none",
                      cursor: BtSusscesCursor,
                      color: BtSusscessColor,
                    }}
                    shape="circle"
                  >
                    <BiEdit style={{ fontSize: "25px" }} data="1" />
                  </Button>
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
        <Link to={"/admin/user/add"}>
          <Button type="primary">Primary Button</Button>
        </Link>
      </div>
      <div className="w-full px-6 py-6 mx-auto">
        <Table columns={columns} dataSource={data} onChange={onChange} />
      </div>
      ;
    </>
  );
};

export default ListUser;
