import { Table, Image, Space, Tooltip, Button } from "antd";
import React from "react";
import { httpGetAllUser } from '../../../api/user';
import Description from "../../../components/admin/detaiservice";
import { BiEdit } from "react-icons/bi";
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
        },
        {
            title: "role",
            dataIndex: "role",
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
