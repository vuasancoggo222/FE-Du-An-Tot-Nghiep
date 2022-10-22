import {
  Button,
  Checkbox,
  Form,
  Input,
  InputNumber,
  message,
  Select,
  Upload,
} from "antd";
import React, { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { getProfile } from "../../api/user";
import { isAuthenticate } from "../../utils/LocalStorage";

import { useNavigate } from "react-router-dom";

const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 16,
  },
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: "${label} is required!",
  types: {
    number: "${label} is not a valid number!",
    phone: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};
/* eslint-enable no-template-curly-in-string */

const Userinformation = () => {
  const user = isAuthenticate();
  const [form] = Form.useForm();
  // const { id } = useParams();
  useEffect(() => {
    const getSerVice = async () => {
      const datauser = await getProfile(user.token);
      console.log("log service :", datauser);
      form.setFieldsValue({
        name: datauser?.name,
        address: datauser?.address,
        age: datauser?.age,
        gender: datauser?.gender,
        // avatar: datauser?.avatar,
      });
    };

    getSerVice();
  }, []);

  const onFinish = async (data) => {
    console.log(data);
  };
  const [componentDisabled, setComponentDisabled] = useState(true);
  const onFormLayoutChange = ({ disabled }) => {
    setComponentDisabled(disabled);
  };
  return (
    <>
      <div className="border border-[#00502b] rounded-md ">
        <h1 className="text-2xl py-2 px-10 bg-[#00502b] text-white rounded-t-md">
          Thông tin tài khoản
        </h1>
        <div className="py-[20px] pb-5">
          <div className="px-[20px]">
            <Checkbox
              checked={componentDisabled}
              onChange={(e) => setComponentDisabled(e.target.checked)}
            >
              Sửa Thông tin
            </Checkbox>
          </div>
          <Form
            {...layout}
            name="nest-messages"
            onFinish={onFinish}
            disabled={componentDisabled}
            onValuesChange={onFormLayoutChange}
            validateMessages={validateMessages}
            form={form}
          >
            <Form.Item
              name="name"
              label="Name"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="age"
              label="Age"
              rules={[
                {
                  type: "number",
                  min: 0,
                  max: 99,
                },
              ]}
            >
              <InputNumber />
            </Form.Item>
            <Form.Item label="Gender" name="gender">
              <Select>
                <Select.Option value={1}>1</Select.Option>
                <Select.Option value={1}>2</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item name="" label="Address">
              <Input />
            </Form.Item>
            <Form.Item label="Upload" valuePropName="fileList" name="avatar">
              <Upload listType="picture-card">
                <div>
                  <PlusOutlined />
                  <div
                    style={{
                      marginTop: 8,
                    }}
                  >
                    Upload
                  </div>
                </div>
              </Upload>
            </Form.Item>
            <Form.Item
              wrapperCol={{
                ...layout.wrapperCol,
                offset: 8,
              }}
            >
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Userinformation;
