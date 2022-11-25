import { Button, Form, Input, message } from "antd";
import { updatePassword } from "firebase/auth";
import React, { useEffect } from "react";
import { updatePass } from "../../api/user";
import { isAuthenticate } from "../../utils/LocalStorage";
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
  required: "${label} không được bỏ trống!",
  types: {
    number: "${label} is not a valid number!",
    phone: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};
/* eslint-enable no-template-curly-in-string */

const ChangePass = () => {
  const isUser = isAuthenticate();
  const [form] = Form.useForm();
  useEffect(() => {}, []);
  const onSubmit = async (data) => {
    var res = await updatePass(isUser.token, data);
    if (res._id !== undefined) {
      message.success("Add employee success", 4);
    }
  };
  const onFinish = async (data) => {
    console.log(data);
    const dataPost = { ...data };
    try {
      await onSubmit(dataPost).then(() => {
        message.success("cap nhat thành công", 4);
      });
      // eslint-disable-next-line react/prop-types
    } catch (error) {
      message.error(`${error.response.data.message}`, 4);
    }
  };

  return (
    <>
      <div className="border border-[#00502b] rounded-md ">
        <h1 className="text-2xl py-2 px-10 bg-[#00502b] text-white rounded-t-md">
          Đổi mật khẩu
        </h1>
        <div className="py-[20px] pb-5">
          <Form
            {...layout}
            name="nest-messages"
            onFinish={onFinish}
            validateMessages={validateMessages}
            form={form}
          >
            <Form.Item
              {...layout}
              name="currentPassword"
              label="Mật khẩu cũ"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              {...layout}
              name="newPassword"
              label="Mật khẩu mới"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="confirmPassword"
              label="Xác nhận mật khẩu "
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
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

export default ChangePass;
