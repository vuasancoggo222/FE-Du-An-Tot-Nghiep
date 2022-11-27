import React from "react";
import { Button, Form, Input, message } from "antd";
import { useNavigate } from 'react-router-dom';
import { login } from '../../api/user';
import { socket } from "../../App";

const SignIn = (props) => {
  const navigate = useNavigate()
import React, { useState } from "react";
import { Button, Form, Input, message, Modal } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import { login } from "../../api/user";

const SignIn = (props) => {
  const [open, setOpen] = useState(false);
  const [code, setCode] = useState(false);

  const navigate = useNavigate();
  // modal forgot password
  const showModal = () => {
    setOpen(true);
  };
  const handleCancel = () => {
    setOpen(false);
  };
  // modal forgot password

  const layout = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const bgStaff = {
    width: "100%",
    height: "100%",
    backgroundImage:
      "url('https://res.cloudinary.com/df7kkrfoe/image/upload/v1663325104/tac-phong-lam-viec-nhan-vien-spa-1_mfbeu0.jpg')",
    backgroundRepeat: "no-repeat",
  };
  const onFinish = async (values) => {
    const userValues = {
      phoneNumber: values.phoneNumber.phoneNumber,
      password: values.password.password,
    };
    console.log(values.phoneNumber.phoneNumber, values.password.password);
    try {
      const data = await login(userValues);
      console.log(data);
      localStorage.setItem('user', JSON.stringify(data))
      socket.emit("newUser",data.id);
      message.success('Đăng nhập thành công')
      navigate('/')
      // eslint-disable-next-line react/prop-types
      props.parentCallback(data);
    } catch (error) {
      message.error(`${error.response.data.message}`, 2);
      // if(error.response.data.code == 'NEEDVERIFY'){
      //    return navigate(`/verify?phone=${values.phoneNumber.phoneNumber}`)
      // }
    }
  };
  const validateMessages = {
    required: "${label} Không được bỏ trống!",
    types: {
      text: "${label} không đúng định dạng!",
    },
  };
  const texHello = {
    backgroundColor: "white",
    color: "#002200",
    opacity: 0.8,
  };
  return (
    <div>
      <div
        style={{ height: "320px", width: "100%" }}
        className=" border-green-600 ... 0 bg-white flex rounded-r-3xl rounded-l-2xl"
      >
        <div style={{ width: "40%" }} className="">
          <div
            className="pt-48 rounded-xl  flex justify-center text-white font-bold text-xl font-mono  ..."
            width="100px"
            style={bgStaff}
          >
            <div>
              <div style={texHello} className="p-2 text-center">
                Chào bạn đến với Tuyến Spa
              </div>
              <div style={texHello} className="text-center">
                Dịch vụ spa uy tín
              </div>
              <p
                style={{ backgroundColor: "black" }}
                className="text-white text-sm text-center mt-5 ..."
              >
                {" "}
                Hỗ trợ đăng ký: 012344567
              </p>
            </div>
          </div>
        </div>
        <div style={{ width: "60%" }} className="flex justify-center  ...">
          <div style={{ width: "100%" }} className="pl-5">
            <h3 className="font-bold text-2xl text-center mt-5 ...">
              Đăng nhập
            </h3>
            <div className="pt-8 p-10">
              <Form
                {...layout}
                name="nest-messages"
                onFinish={onFinish}
                validateMessages={validateMessages}
              >
                <Form.Item
                  name={["phoneNumber", "phoneNumber"]}
                  label="Phone"
                  rules={[
                    {
                      type: "text",
                      required: true,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name={["password", "password"]}
                  label="Password"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input.Password />
                </Form.Item>

                <NavLink
                  onClick={showModal}
                  className="flex justify-end mr-[50px]"
                >
                  Forgot password?
                </NavLink>

                {/* Form quên mật khẩu */}
                <Modal
                  open={open}
                  title="Quên mật khẩu?"
                  onCancel={handleCancel}
                  footer={[]}
                >
                  <Form
                    name="basic"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    autoComplete="off"
                  >
                    {code ? (
                      <Form.Item
                        label="Mã xác nhận"
                        name="username"
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng nhập mã xác nhận!",
                          },
                        ]}
                      >
                        <Input />
                        <NavLink>Nhập lại số điện thoại</NavLink>
                      </Form.Item>
                    ) : (
                      <Form.Item
                        label="Số điện thoại"
                        name="username"
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng nhập số điện thoại của bạn!",
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                    )}
                    <Form.Item wrapperCol={{ offset: 1, span: 16 }}>
                      {code ? (
                        <Button
                          type="primary"
                          htmlType="submit"
                          onClick={() => setCode(true)}
                        >
                          Gửi
                        </Button>
                      ) : (
                        <Button
                          type="primary"
                          htmlType="submit"
                          onClick={() => setCode(true)}
                        >
                          Nhận mã
                        </Button>
                      )}
                    </Form.Item>
                  </Form>
                </Modal>

                <Form.Item
                  wrapperCol={{
                    offset: 6,
                    span: 16,
                  }}
                >
                  <Button
                    id="sub"
                    onClick={() => {
                      // eslint-disable-next-line react/prop-types
                    }}
                    type="primary"
                    htmlType="submit"
                  >
                    Đăng nhập
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
