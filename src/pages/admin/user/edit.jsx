import { Button, Form, Input, Upload, Select, message } from "antd";
import React, { useEffect, useState } from "react";

import { InboxOutlined } from "@ant-design/icons";


import { Link, useNavigate, useParams } from "react-router-dom";
import { updateService } from "../../../api/service";

import { uploadCloudinary } from "../../../api/upload";
import { httpGetOneUser } from "../../../api/user";

const normFile = (e) => {
  console.log("Upload event:", e);

  if (Array.isArray(e)) {
    return e;
  }

  return e?.fileList;
};
const { Option } = Select;
const EditUsers = () => {
  const navigate = useNavigate();
  const [url, setUrl] = useState("");
  const { id } = useParams();
  const [form] = Form.useForm();

  useEffect(() => {
     async () => {
      const dataService = await httpGetOneUser(id);
      console.log("log service :", dataService);
      setUrl(dataService?.image);
      form.setFieldsValue({
        name: dataService?.name,
        description: dataService?.description,
        price: dataService?.price,
        status: dataService?.status,
        // image: dataService?.image,
        role:dataService?.role,
        age: dataService?.age,
        address:dataService?.address,
        phone:dataService?.phoneNumber
      });
    };

  }, []);

  const uploadImage = async (options) => {
    const { onSuccess, onError, file } = options;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "my_upload");
    try {
      const res = await uploadCloudinary(formData);
      onSuccess("Ok");
      message.success("Upload successfully !");
      console.log("server res: ", res);
      setUrl(res.data.secure_url);
    } catch (err) {
      onError({ err });
    }
  };
  const onFinish = async (data) => {
    console.log(data);
    const a = { ...data, image: url };
    try {
      await updateService(id, a).then(() => {
        message.success("cap nhat thành công", 4);
        navigate("/admin/service");
      });
    } catch (error) {
      message.error(`${error.response.data.message}`, 4);
    }
  };

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
    // onChange: (info) => {
    //   // console.log(info);
    //   // setImageFile(info);
    // },
    listType: "picture",
    maxCount: 1,
    onDrop: true,
    defaultFileList: [{ url, name: "default image" }],
  };

  return (
    <>
      <div className="w-[1200px] px-6 py-6 m-auto">
        <div>
          <h1 className="w-full text-center mb-0 font-bold text-white capitalize pb-[20px]  text-[50px]">
            <div>Edit User</div>
          </h1>
        </div>
      </div>

      <div className=" px-6 py-6 ml-[30px]  ">
        <div className="mt-[150px] my-[20px]">
          <Link to={"/admin/user/add"}>
            <Button type="primary">Primary Button</Button>
          </Link>
        </div>
        <Form
          className="m-auto text-center"
          name="basic"
          labelCol={{ span: 4, offset: 5 }}
          wrapperCol={{ span: 15, offset: 5 }}
          initialValues={{ status: true }}
          onFinish={onFinish}
          autoComplete="off"
          layout="vertical"
          form={form}
        >
          <Form.Item
            name="name"
            label="Username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phone"
            label="phoneNumber"
            rules={[{ required: true, message: "Please input your number" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Image">
            <Form.Item
              name="image"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              noStyle
            >
              <Upload.Dragger {...setting} customRequest={uploadImage}>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">
                  Nhấn hoặc kéo thả để tải ảnh lên
                </p>
              </Upload.Dragger>
            </Form.Item>
          </Form.Item>
          <Form.Item
            name="address"
            label="address"
            rules={[{ required: true, message: "Please input your address" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="age"
            label="age"
            rules={[{ required: true, message: "Please input your age" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="gender"
            label="gender"
            rules={[{ required: true, message: "Please input your gender" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="role"
            label="role"
            rules={[{ required: true, message: "Please input your role" }]}
          >
               <Select placeholder="Please select a role">
              <Option value={0}>Khách hàng</Option>
              <Option value={1}>Admin</Option>
              <Option value={2}>Nhân viên</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="status"
            label="Status"
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please select your status",
              },
            ]}
          >
            <Select placeholder="Please select a country">
              <Option value={0}>Không kích hoạt</Option>
              <Option value={1}>Kích hoạt</Option>
            </Select>
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

export default EditUsers;
