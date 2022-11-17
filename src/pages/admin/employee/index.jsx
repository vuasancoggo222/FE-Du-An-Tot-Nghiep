import { Table, Image, Button, Select, Tag } from "antd";
import { Option } from "antd/lib/mentions";
import React from "react";

import { Link, useNavigate } from "react-router-dom";
import { removeEmployees } from "../../../api/employee";
import useEmployee from "../../../hooks/use-employee";
import Swal from "sweetalert2";

// CommonJS

const ListEmployee = () => {
  const navigate = useNavigate();
  const { data, error } = useEmployee();
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
      render: (item) => {
        if (item === 1) {
          return <Tag color="green">ĐÃ KÍCH HOẠT</Tag>;
        }
        if (item === 0) {
          return <Tag color="red">CHƯA KÍCH HOẠT</Tag>;
        }
      },
    },
    {
      title: "Action",
      dataIndex: "_id",
      key: "action",
      colapse: 2,
      render: (_, item) => {
        console.log("asdasd", item);
        // Thêm
        // let BtSusscesCursor;
        // let BtSusscessColor = "#3b82f6";
        // // hủy
        // let BtFailureCursor;
        // let BtFailureColor = "red";
        return (
          <Select
            style={{ width: "170px", color: "blue", textAlign: "center" }}
            value="Hành động"
          >
            <Option>
              <Button
                onClick={() => navigate(`/admin/employee/${item._id}/edit`)}
                dataId={item._id}
                type="primary"
                style={{ border: "none", color: "white", width: "100%" }}
              >
                Sửa
              </Button>
            </Option>
            <Option>
              <Button
                onClick={() => {
                  onRemove(item._id);
                }}
                type="danger"
                style={{ border: "none", color: "white", width: "100%" }}
              >
                Xóa
              </Button>
            </Option>
          </Select>
        );
      },
    },
  ];
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  const onRemove = async (id) => {
    Swal.fire({
      title: "Bạn có chắc muốn xóa ?",
      // text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Xóa ",
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire("Đã xóa!", "Xóa tài khoản thành công", "success");
        await removeEmployees(id);
        data?.filter((item) => item._id !== id);
      }
    });
  };
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
          <Button
            type="success"
            style={{
              border: "1px solid white",

              font: "bold",
            }}
          >
            + Thêm nhân viên
          </Button>
        </Link>
      </div>
      <div className="w-full px-6 py-6 mx-auto">
        <Table columns={columns} dataSource={data} onChange={onChange} />
      </div>
      ;
    </>
  );
};

export default ListEmployee;
