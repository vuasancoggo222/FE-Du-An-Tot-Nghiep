import {
  Button,
  Form,
  Input,
  Upload,
  Select,
  message,
  Tag,
  InputNumber,
} from "antd";
import React, { useState } from "react";
import { uploadCloudinary } from "../../../api/upload";
import { InboxOutlined } from "@ant-design/icons";
import { httpPost } from "../../../api/services";
import { Link, useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
const normFile = (e) => {
  console.log("Upload event:", e);

  if (Array.isArray(e)) {
    return e;
  }

  return e?.fileList;
};

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    ["clean"],
    [{ align: [] }],
  ],
};

const { Option } = Select;
const AddService = () => {
  const [url, setUrl] = useState("");

  const navigate = useNavigate();
  // const { create } = useService();
  const [content, setContent] = useState("");
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
      const res = await uploadCloudinary(formData);
      onSuccess("Ok");
      message.success("Upload successfully !");
      setUrl(res.data.secure_url);
    } catch (err) {
      onError({ err });
    }
  };
  const onFinish = async (data) => {
    const servicePost = { ...data, image: url, description: content };
    await create(servicePost);
    // console.log(imageFile);
    console.log(servicePost);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
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
    onChange: (info) => {
      // setImageFile(info);
    },
    listType: "picture",
    maxCount: 1,
    onDrop: true,
  };
  return (
    <>
      <div className="w-[1200px] px-6 py-6 m-auto">
        <div>
          <h1 className="w-full text-center mb-0 font-bold text-white capitalize pb-[20px]  text-[50px]">
            <div>Them dich vu</div>
          </h1>
        </div>
      </div>

      <div className=" px-6 py-6 ml-[30px]  ">
        <div className="mt-[150px] my-[20px]">
          <Link to={"/admin/service"}>
            <Button type="primary">Quay lại</Button>
          </Link>
        </div>
        <Form
          className="m-auto "
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
            label="Username"
            name="name"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input value="lethetam" />
          </Form.Item>
          <Form.Item
            name="price"
            label="Price"
            rules={[{ required: true, message: "Please input your number" }]}
          >
            <InputNumber
              min={10000}
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              style={{ width: "100%" }}
            />
            {/* <Input type="number" /> */}
          </Form.Item>
          <Form.Item label="Image">
            <Form.Item
              name="image"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              noStyle
              rules={[
                {
                  required: true,
                  message: "Please input your image!",
                },
              ]}
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
              <Option value={1}>
                <Tag color="green">ĐANG KINH DOANH</Tag>
              </Option>
              <Option value={2}>
                {" "}
                <Tag color="red">DỪNG KINH DOANH</Tag>
              </Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="description"
            label="Introduction"
            rules={[
              { required: true, message: "Please input your Introduction" },
            ]}
          >
            <ReactQuill
              theme="snow"
              value={content}
              onChange={setContent}
              modules={modules}
              // formats={formats}
              className="h-[300px] mb-20"
            ></ReactQuill>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 10, span: 5 }}>
            <Button type="primary" htmlType="submit">
              Thêm dịch vụ
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default AddService;
