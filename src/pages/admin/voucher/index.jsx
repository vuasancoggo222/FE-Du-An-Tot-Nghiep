import React, { useState, useEffect } from "react";
import { Button, message, Select, Space, Table } from "antd";

import { Option } from "antd/lib/mentions";
import { Link } from "react-router-dom";
import { ListVouchers } from "../../../api/voucher";

const ListVoucher = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [vouchers, setVouchers] = useState([]);
  const [loading, setLoading] = React.useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const columns = [
    {
      title: "Tên voucher",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Mã vouche",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Tiền giảm",
      dataIndex: "discount",
      key: "discount",
    },

    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
    },

    {
      title: "Hành động",
      dataIndex: "_id",
      key: "action",
      render: (_, item) => {
        // Thêm
        return (
          <div className="text-center">
            <Space size="middle">
              <Select
                style={{ width: "170px", color: "blue", textAlign: "center" }}
                value="Hành động"
              >
                <Option>
                  {" "}
                  <Button
                    onClick={showModal}
                    dataId={item._id}
                    type="primary"
                    style={{ border: "none", color: "white", width: "100%" }}
                  >
                    <Link to={`/admin/post/${item.slug}/edit`}>Sửa</Link>
                  </Button>
                </Option>
                <Option>
                  {" "}
                  <Button
                    type="danger"
                    style={{ border: "none", color: "white", width: "100%" }}
                  >
                    Xóa
                  </Button>{" "}
                </Option>
                <Option>
                  {" "}
                  <Button
                    onClick={showModal}
                    dataId={item.content}
                    type=""
                    style={{
                      border: "none",
                      color: "white",
                      width: "100%",

                      backgroundColor: "#f1c232",
                    }}
                  >
                    <Link to={`/admin/post/${item.slug}`}>Chi Tiết</Link>
                  </Button>
                </Option>
              </Select>
            </Space>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    const getVoucher = async () => {
      const res = await ListVouchers();
      setVouchers(res);
    };
    getVoucher();
  }, [loading]);
  return (
    <>
      <div className="w-full px-6 py-6 mx-auto ">
        <div>
          <h1 className="w-[1200px] m-auto text-center mb-0 font-bold text-white capitalize pb-[20px] text-[40px] ">
            <div>Danh sách Voucher</div>
          </h1>
        </div>
        <div className="">
          <Link to={"/admin/post/add"}>
            <Button>+ Thêm Voucher</Button>
          </Link>
        </div>
      </div>

      <div className="w-full px-6 py-6 mx-auto  ">
        <Table columns={columns} dataSource={vouchers} />
      </div>
    </>
  );
};

export default ListVoucher;
