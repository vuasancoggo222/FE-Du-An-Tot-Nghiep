import { Table, Image, Space, Tooltip, Button } from "antd";
import React, { useEffect, useState } from "react";
import useService from "../../../hooks/use-service";
import Description from "../../../components/admin/detaiservice";
import { BiEdit } from "react-icons/bi";
import { Link } from "react-router-dom";
import { removeService } from "../../../api/service";

const ListService = () => {
  const { data, error } = useService();

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      filters: [
        {
          text: "Joe",
          value: "Joe",
        },
        {
          text: "Jim",
          value: "Jim",
        },
        {
          text: "Submenu",
          value: "Submenu",
          children: [
            {
              text: "Green",
              value: "Green",
            },
            {
              text: "Black",
              value: "Black",
            },
          ],
        },
      ],
      // specify the condition of filtering result
      // here is that finding the name started with `value`
      onFilter: (value, record) => record.name.indexOf(value) === 0,
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ["descend"],
    },

    {
      title: "price",
      dataIndex: "price",
    },
    {
      title: "image",
      dataIndex: "image",
      render: (image) => <Image width={200} src={image} key={image} />,
    },
    {
      title: "status",
      dataIndex: "status",
    },
    {
      title: "description",

      render: (item) => {
        return (
          <>
            <Description ondetail={item.description} />
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
                <Link to={`/admin/service/${item}/edit`}>
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
                <Link to={`/admin/service/${item}/remove`}></Link>
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
  const onRemove = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete");
    if (confirm) {
      await removeService(id);
      data.filter((item) => item._id !== id);
    }
  };
  if (!data) return <div>loading</div>;
  if (error) return <div>Failed loading</div>;
  return (
    <>
      <div className="w-full px-6 py-6 mx-auto">
        <div>
          <h1 className="w-[1200px] m-auto text-center mb-0 font-bold text-white capitalize pb-[20px]  text-[50px]">
            <div>Service</div>
          </h1>
        </div>
        <Link to={"/admin/service/add"}>
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
