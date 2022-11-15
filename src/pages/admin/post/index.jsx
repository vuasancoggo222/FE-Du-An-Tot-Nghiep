import { EditFilled, EditOutlined } from "@ant-design/icons";
import { async } from "@firebase/util";
import { Button, message, Modal, Popconfirm, Space, Table, Tag } from "antd";
import Tooltip from "antd/es/tooltip";
import React, { useState } from "react";
import { useEffect } from "react";
import { BiEdit } from "react-icons/bi";
import { Link } from "react-router-dom";
import { getPosts, removePost } from "../../../api/post";
const ListPost = () => {
  const [posts, setPosts] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [id, setId] = useState();
  const confirm = async (e) => {
    try {
      await removePost(id);
      setLoading(!loading);
    } catch (error) {
      return message.success("Xóa thất bại");
    }

    message.success("Xóa thành công");
  };
  const cancel = (e) => {
    message.error("Xóa thất bại");
  };
  const onRemove = async (id) => {
    // await removePost(id);
  };
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Thumbnail",
      dataIndex: "thumbnail",
      key: "thumbnail",
      render: (thumbnail) => {
        return (
          <img
            src={thumbnail}
            alt="thumbnail"
            style={{ width: "100px", height: "100px" }}
          />
        );
      },
    },
    {
      title: "ShortDescription",
      dataIndex: "shortDescription",
      key: "shortDescription",
      render: (shortDescription) => {
        return <p>{shortDescription}</p>;
      },
    },

    {
      title: "Action",
      dataIndex: "_id",
      key: "action",
      colapse: 2,
      render: (_, item) => {
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
                <Link to={`/admin/post/${item.slug}/edit`}>
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

              <Popconfirm
                title="Bạn có chắc muốn xóa ?"
                onConfirm={confirm}
                onCancel={cancel}
                okText="Yes"
                cancelText="No"
              >
                <Button
                  style={{
                    border: "none",
                    cursor: BtFailureCursor,
                    color: BtFailureColor,
                  }}
                  shape="circle"
                  onClick={() => setId(item._id)}
                >
                  <i
                    style={{ fontSize: "25px" }}
                    data="2"
                    className="far fa-times-circle"
                  ></i>
                </Button>
              </Popconfirm>

              <Link />
            </Space>
          </div>
        );
      },
    },
  ];
  const data = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      tags: ["nice", "developer"],
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: ["loser"],
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
      tags: ["cool", "teacher"],
    },
  ];
  useEffect(() => {
    const getPost = async () => {
      const res = await getPosts();
      setPosts(res);
    };
    getPost();
  }, [loading]);
  return (
    <>
      <div className="w-full px-6 py-6 mx-auto ">
        <div>
          <h1 className="w-[1200px] m-auto text-center mb-0 font-bold text-white capitalize pb-[20px]  text-[50px] ">
            <div>List Post</div>
          </h1>
        </div>
        <div className="">
          <Link to={"/admin/post/add"}>
            <Button type="primary">+ Thêm bài viết</Button>
          </Link>
        </div>
      </div>

      <div className="w-full px-6 py-6 mx-auto  ">
        <Table columns={columns} dataSource={posts} />
      </div>
    </>
  );
};

export default ListPost;
