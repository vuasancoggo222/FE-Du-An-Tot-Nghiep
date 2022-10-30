import { Button, Form, Input, Upload, Select, message } from "antd";
import React, { useState } from "react";
import { uploadCloudinary } from "../../../api/upload";
import { InboxOutlined } from "@ant-design/icons";
import { httpAddBanner } from "../../../api/banner";
import { Link, useNavigate } from "react-router-dom";
const normFile = (e) => {
  console.log("Upload event:", e);

  if (Array.isArray(e)) {
    return e;
  }

  return e?.fileList;
};
const AddBanner = () => {
  const [url, setUrl] = useState("");

  const navigate = useNavigate();
  const create = async (data) => {
    try {
      await httpAddBanner("/banner", data).then(() => {
        message.success("Thêm banner thành công", 4);
        navigate("/admin/banner");
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
      console.log("server res: ", res);
      setUrl(res.data.secure_url);
    } catch (err) {
      console.log("Error: ", err);
      const error = new Error("Some error");
      onError({ err });
    }
  };
  const onFinish = async (data) => {
    const bannerPost = { ...data, image: url };
    await create(bannerPost);
    // console.log(imageFile);
    console.log(bannerPost);
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
            <div>Thêm Banner</div>
          </h1>
        </div>
      </div>

      <div className=" px-6 py-6 ml-[30px]  ">
        <div className="mt-[150px] my-[20px]">
          <Link to={"/admin/banner/add"}>
            <Button type="primary">Add</Button>
          </Link>
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
         
          <Form.Item label="Ảnh">
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
         
        </Form>
      </div>
    </>
  );
};

export default AddBanner;
