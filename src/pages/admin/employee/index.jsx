import { Table, Image, Space, Tooltip, Button } from "antd";
import React from "react";
import { BiEdit } from "react-icons/bi";
import { Link } from "react-router-dom";
import useEmployee from "../../../hooks/use-employee";

const columns = [
  {
    title: "Mã nhân viên",
    dataIndex: "idCard",
    // specify the condition of filtering result
    // here is that finding the name started with `value`
    onFilter: (value, record) => record.name.indexOf(value) === 0,
    sorter: (a, b) => a.name.length - b.name.length,
    sortDirections: ["descend"],
  },

  {
    title: "Name",
    dataIndex: "name",
  },
  {
    tittle: "avatar",
    dataIndex: "avatar",
    render: (image) => <Image width={200} src={image} key={image} />,
  },
  {
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Phone",
    dataIndex: "phoneNumber",
  },
  {
    title: "status",
    dataIndex: "status",
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
              <Link to={`/admin/employee/${item}/edit`}>
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
            <Tooltip title="Hủy">
              <Link to={`/admin/employee/${item}/remove`}></Link>
              <Button
                style={{
                  border: "none",
                  cursor: BtFailureCursor,
                  color: BtFailureColor,
                }}
                shape="circle"
         
              >
                <i
                  style={{ fontSize: "25px" }}
                  data="2"
                  className="far fa-times-circle"
                ></i>
              </Button>
              <Link />
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

const ListService = () => {
  const { data, error } = useEmployee();
  if (!data) return <div>loading</div>;
  if (error) return <div>Failed loading</div>;
  return (
    <>
      <div className="w-full px-6 py-6 mx-auto">
        <div>
          <h1 className="w-[1200px] m-auto text-center mb-0 font-bold text-white capitalize pb-[20px]  text-[50px]">
            <div>Employee</div>
          </h1>
        </div>
        <Link to={"/admin/employee/add"}>
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

export default ListService;
