import { Button, Form, Input, Upload, Select, message } from "antd";
import React, { useState } from "react";

import { httpPost } from "../../../api/services";
import { Await, Link, useNavigate } from "react-router-dom";

const EditEmployee = () => {
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
    return (
        <>
            <div className="w-[1200px] px-6 py-6 m-auto">
                <div>
                    <h1 className="w-full text-center mb-0 font-bold text-white capitalize pb-[20px]  text-[50px]">
                        <div>Update Employee</div>
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

export default EditEmployee;
