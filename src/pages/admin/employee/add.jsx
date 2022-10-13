import { Button, Form, Input, Upload, Select, message, Row, Col } from "antd";
import React, { useState } from "react";
import { httpAddEmployees } from "../../../api/employee";
import { InboxOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
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

  const onSubmit = async (data) => {
    console.log(data);
    var res = await httpAddEmployees(data);
    if (res._id !== undefined) {
      message.success("Update employee success", 4);
      navigate("/admin/employee");
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
      setUrl(res.data.secure_url);
    } catch (err) {
      onError({ err });
    }
  };
  const onFinish = async (data) => {
    const dataPost = { ...data, avatar: url };
    await onSubmit(dataPost);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  // ------------------------------

  const setting = {
    name: "file",
    beforeUpload: (file) => {
      const accept = ["image/png", "image/jpeg", "image/jpg"];

      if (file.size > 1024 * 1024 * 2) {
        message.error(`file quá lớn`);
        return Upload.LIST_IGNORE;
      } else if (!accept.includes(file.type)) {
        message.error(`không đúng định dạng ảnh (png,jpeg,jpg)`);
        return Upload.LIST_IGNORE;
      }
    },
    onChange: (info) => {
      console.log(info);
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
        <div className="mt-[150px] my-[20px]"></div>
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
          {/* name */}
          <Row gutter={[4, 4]}>
            <Col xxl={24} xl={24} sm={24} xs={24}>
              <Form.Item
                label="Username"
                name="name"
                rules={[
                  { required: true, message: "Please input your username !" },
                ]}
              >
                <Input type="text" />
              </Form.Item>
            </Col>
          </Row>
          {/* Number Phone */}
          <Form.Item
            name="phoneNumber"
            label="phoneNumber"
            rules={[
              { required: true, message: "Please input your phone number !" },
            ]}
          >
            <Input type="text" />
          </Form.Item>
          {/* Id Card */}
          <Form.Item
            label="Id Card"
            name="idCard"
            rules={[{ required: true, message: "Please input your id card !" }]}
          >
            <Input type="text" />
          </Form.Item>
          {/* Email */}
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email !" }]}
          >
            <Input type="text" />
          </Form.Item>
          {/* Gender */}
          <Form.Item
            name="gender"
            label="Gender"
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please select your gender",
              },
            ]}
          >
            <Select placeholder="Please select a gender">
              <Option value={0}>Nam</Option>
              <Option value={1}>Nữ</Option>
            </Select>
          </Form.Item>
          {/* Avater */}
          <Form.Item>
            <Form.Item
              name="avatar"
              label="avatar"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              noStyle
            >
              <Upload.Dragger {...setting} customRequest={uploadImage}>
                <p className="ant-upload-drag-icon h-[15px]">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">
                  Nhấn hoặc kéo thả để tải ảnh lên
                </p>
              </Upload.Dragger>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 10, span: 5 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};
export default AddEmployee;
