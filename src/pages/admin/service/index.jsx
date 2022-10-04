import { Table, Image, Space, Tooltip, Button } from "antd";
import React from "react";
import useService from "../../../hooks/use-service";
import Description from "../../../components/admin/detaiservice";

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
    dataIndex: "action",
    key: "action",
    render: (item) => {
      // Thêm
      let BtSusscesCursor;
      let BtSusscessColor = "blue";
      // hủy
      let BtFailureCursor;
      let BtFailureColor = "red";
      return (
        <Space size="middle">
          <Tooltip title="Thêm">
            <Button
              style={{
                border: "none",
                cursor: BtSusscesCursor,
                color: BtSusscessColor,
              }}
              shape="circle"
            >
              <i
                style={{ fontSize: "25px" }}
                data="1"
                className="far fa-check-circle"
              ></i>
            </Button>
          </Tooltip>
          <Tooltip title="Hủy">
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
          </Tooltip>
        </Space>
      );
    },
  },
];
const onChange = (pagination, filters, sorter, extra) => {
  console.log("params", pagination, filters, sorter, extra);
};

const ListService = () => {
  const { data: service } = useService();
  const data = service?.map((item) => {
    return item;
  });
  console.log(data);
  return (
    <>
      <div className="w-full px-6 py-6 mx-auto">
        <div>
          <h1 className="mb-0 font-bold text-white capitalize pb-[20px] text-center text-[50px]">
            List Booking
          </h1>
        </div>
        <Table columns={columns} dataSource={data} onChange={onChange} />
      </div>
      ;
    </>
  );
};

export default ListService;
