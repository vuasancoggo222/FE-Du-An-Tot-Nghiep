import { Table, Image, Button, Select, Tag } from "antd";
import React from "react";
import useService from "../../../hooks/use-service";
import Description from "../../../components/admin/detaiservice";
import { Link, useNavigate } from "react-router-dom";
import { removeService } from "../../../api/service";
import { Option } from "antd/lib/mentions";
import Swal from "sweetalert2";
import { formatPrice } from "../../../utils/formatCash";

const ListService = () => {
  const { data, error } = useService();
  const navigate = useNavigate();
  const columns = [
    {
      title: "image",
      dataIndex: "image",
      render: (image) => <Image width={100} src={image} key={image} />,
    },
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
      render: (price) => <div className="">{formatPrice(price)}</div>,
    },

    {
      title: "status",
      dataIndex: "status",
      render: (item) => {
        if (item === 1) {
          return <Tag color="green">ĐANG KINH DOANH</Tag>;
        } else {
          return <Tag color="red">DỪNG KINH DOANH</Tag>;
        }
      },
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
      render: (_, item) => {
        console.log(item);

        return (
          <Select
            style={{ width: "170px", color: "blue", textAlign: "center" }}
            value="Hành động"
          >
            <Option>
              <Button
                onClick={() => navigate(`/admin/service/${item._id}/edit`)}
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
    // const confirm = window.confirm("Are you sure you want to delete");
    // if (confirm) {
    //   await removeService(id);
    //   data.filter((item) => item._id !== id);
    // }
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
        Swal.fire("Đã xóa!", "Xóa dịch vụ thành công", "success");
        await removeService(id);
        data.filter((item) => item._id !== id);
      }
    });
  };
  if (!data) return <div>loading</div>;
  if (error) return <div>Failed loading</div>;
  return (
    <>
      <div className="w-full px-6 py-6 mx-auto">
        <div>
          <h1 className="w-[1200px] m-auto text-center mb-0 font-bold text-white capitalize pb-[20px] text-[40px]">
            <div>Danh sách dịch vụ</div>
          </h1>
        </div>
        <Link to={"/admin/service/add"}>
          <Button>+ Thêm dịch vụ</Button>
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
