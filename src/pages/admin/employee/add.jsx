import { Button, Form, Input, Upload, Select, message } from "antd";
import React, { useState } from "react";

import { InboxOutlined } from "@ant-design/icons";
import { httpPost } from "../../../api/services";
import { Await, Link, useNavigate } from "react-router-dom";
import axios from "axios";
const normFile = (e) => {
    console.log("Upload event:", e);

    if (Array.isArray(e)) {
        return e;
    }

    return e?.fileList;
};
const { Option } = Select;
const AddEmployee = () => {
    const [url, setUrl] = useState("");

    const navigate = useNavigate();
    // const { create } = useService();
    const create = async (data) => {
        try {
            await httpPost("/service", data).then(() => {
                message.success("Thêm dịch vụ thành công", 4);
                navigate("/admin/service");
            });
        } catch (error) {
            message.error(`${error.response.data.message}`, 4);
        }
    };
    const uploadImage = async (options) => {
        const { onSuccess, onError, file } = options;
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "my_upload");
        try {
            const res = await axios({
                url: "https://api.cloudinary.com/v1_1/trung9901/image/upload",
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-formendcoded",
                },
                data: formData,
            });
            onSuccess("Ok");
            message.success("Upload successfully !");
            console.log("server res: ", res);
            setUrl(res.data.secure_url);
        } catch (err) {
            console.log("Error: ", err);
            const error = new Error("Some error");
            onError({ err });
        }
    };
    const onFinish = async (data) => {
        const servicePost = { ...data, image: url };
        await create(servicePost);
        // console.log(imageFile);
        console.log(servicePost);
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };
    // ------------------------------

    const setting = {
        name: "file",
        beforeUpload: (file) => {
            const isPNG = file.type === "image/png";
            const isJPG = file.type === "image/jpg";
            const isJPEG = file.type === "image/jpeg";
            if (!isPNG && !isJPG && !isJPEG) {
                message.error(`không đúng định dạng ảnh`);
            }

            return isPNG, isJPG, isJPEG || Upload.LIST_IGNORE;
        },
        onChange: (info) => {
            // setImageFile(info);
        },
        listType: "picture-card",
        maxCount: 1,
        onDrop: true,
    };
    return (
        <>
            <div className="w-[1200px] px-6 py-6 m-auto">
                <div>
                    <h1 className="w-full text-center mb-0 font-bold text-white capitalize pb-[20px]  text-[50px]">
                        <div>Add New Employee</div>
                    </h1>
                </div>
            </div>

            <div className=" px-6 py-6 ml-[30px]  ">
                <div className="mt-[150px] my-[20px]">
                </div>
                <Form
                    className="m-auto text-center"
                    name="basic"
                    labelCol={{ span: 4, offset: 5 }}
                    wrapperCol={{ span: 15, offset: 5 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    layout="vertical"
                >
                    <Form.Item
                        label="User Name"
                        name="name"
                        rules={[{ required: true, message: "Please input your username!" }]}
                    >
                        <Input type="text" />
                    </Form.Item>
                    <Form.Item
                        label="User PhoneNumber"
                        name="phoneNumber"
                        rules={[{ required: true, message: "Please input your username!" }]}
                    >
                        <Input type="text" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        label="Your Password"
                        rules={[{ required: true, message: "Please input your number" }]}
                    >
                        <Input type="text" />
                    </Form.Item>
                    <Form.Item
                        name="age"
                        label="Your Age"
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: "Please select your status",
                            },
                        ]}
                    >
                        <Input type="text" />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 10, span: 5 }}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </>
    );
};

export default AddEmployee;
