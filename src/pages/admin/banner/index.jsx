/* eslint-disable no-unused-vars */
import { Button, Image, Table, Select, message, Popconfirm } from "antd";
import React, { useEffect, useState } from "react";

import { BiEdit } from "react-icons/bi";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { httpDeleteBanner, httpListBanner } from "../../../api/banner";

const ListBanner = () => {
  const { Option } = Select;
  const [data, setData] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  useEffect(() => {
    const data = async () => {
      const res = await httpListBanner();
      console.log(res);
      setData(res);
    };
    data();
  }, []);
  const columns = [
    {
      title: "STT",
      render: (text, object, index) => {
        return index + 1;
      },
      width: 50,
    },
    {
      title: "Ảnh",
      dataIndex: "image",
      render: (image) => <Image width={200} src={image} key={image} />,
    },
    {
      title: "Hành động",
      dataIndex: "_id",
      key: "action",
      colapse: 2,
      render: (item) => {
        return (
          <Select
            style={{ width: "170px", color: "blue", textAlign: "center" }}
            value="Đổi trạng thái"
          >
            <Option>
              {" "}
              <Button
                onClick={showModal}
                dataId={item._id}
                type="primary"
                style={{ border: "none", color: "white", width: "100%" }}
              >
                Sửa
              </Button>
            </Option>
            <Option>
              <Button
                type="danger"
                style={{ border: "none", color: "white", width: "100%" }}
                onClick={() => onRemove(item)}
              >
                Xóa
              </Button>
            </Option>
          </Select>
        );
      },
    },
  ];
  const onRemove = async (id) => {
    Swal.fire({
      title: "Bạn muốn xóa banner không?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await httpDeleteBanner(id);
        setData(data.filter((item) => item._id !== id));
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  return (
    <>
      <div className="w-full px-6 py-6 mx-auto">
        <div>
          <h1 className="w-[1200px] m-auto text-center mb-0 font-bold text-white capitalize pb-[20px]  text-[50px]">
            <div>Banner</div>
          </h1>
        </div>
        <Link to={"/admin/banner/add"}>
          <Button type="primary">Primary Button</Button>
        </Link>
      </div>
      <div className="w-full px-6 py-6 mx-auto">
        <Table columns={columns} dataSource={data} rowKey={(data) => data.id} />
      </div>
      ;
    </>
  );
};

export default ListBanner;
