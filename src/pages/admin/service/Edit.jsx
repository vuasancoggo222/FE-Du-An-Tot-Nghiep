import { Button, Form, Input, Upload, Select, message } from "antd";
import React, { useEffect } from "react";

import { InboxOutlined } from "@ant-design/icons";
import { httpGetOneService, httpPost, httpPut } from "../../../api/services";
import { Link, useNavigate, useParams } from "react-router-dom";
import { updateService } from "../../../api/service";

const normFile = (e) => {
  console.log("Upload event:", e);

  if (Array.isArray(e)) {
    return e;
  }

  return e?.fileList;
};
const { Option } = Select;
const EditService = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [form] = Form.useForm();
  useEffect(() => {
    const getSerVice = async () => {
      const dataService = await httpGetOneService(id);
      console.log(dataService);
      form.setFieldsValue({
        id: dataService?._id,
        name: dataService?.name,
        description: dataService?.description,
        price: dataService?.price,
        status: dataService?.status,
      });
    };
    getSerVice();
  }, []);

  const onFinish = async (data) => {
    console.log(data);
    try {
      await updateService(id, data).then(() => {
        message.success("cap nhat thành công", 4);
        navigate("/admin/service");
      });
    } catch (error) {
      message.error(`${error.response.data.message}`, 4);
    }
  };

  return (
    <>
      <div className="w-[1200px] px-6 py-6 m-auto">
        <div>
          <h1 className="w-full text-center mb-0 font-bold text-white capitalize pb-[20px]  text-[50px]">
            <div>Edit dich vu</div>
          </h1>
        </div>
      </div>

      <div className=" px-6 py-6 ml-[30px]  ">
        <div className="mt-[150px] my-[20px]">
          <Link to={"/admin/service/add"}>
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
            name="price"
            label="Price"
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
              <Upload.Dragger name="files" action="/upload.do">
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">
                  Click or drag file to this area to upload
                </p>
                <p className="ant-upload-hint">
                  Support for a single or bulk upload.
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
              <Option value={1}></Option>
              <Option value={2}></Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="description"
            label="Introduction"
            rules={[
              { required: true, message: "Please input your description" },
            ]}
          >
            <Input.TextArea />
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

export default EditService;
