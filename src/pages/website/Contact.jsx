import React from "react";
import { ArrowRightOutlined } from "@ant-design/icons";
import { Button, Form, Input, Row, Col, Space, message } from "antd";
import { httpAddContact } from "../../api/contact";
import { useNavigate } from "react-router-dom";

function Contact() {
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    var res = await httpAddContact(data);
    if (res._id !== undefined) {
      message.success("Add contact success");
    }
    navigate("/contact");
  };
  const onFinish = async (data) => {
    const dataPost = { ...data };
    await onSubmit(dataPost);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <div className="bg-gray-100 min-w-fit">
        <div className="w-full h-96 bg-green-800 z-30"></div>
        <div className="block my-8 m-auto w-3/4">
          <div className="register-wrapper">
            <div className="register-right -mt-32 w-full">
              <div className="flex">
                <div style={{width:"30%"}} className="inline-block flex-1 bg-white z-20 shadow-2xl p-4">
                  <div>
                    <svg
                      class="bg-black w-1/6 h-1/6 mx-auto text-white rounded-full"
                      viewBox="-3 -3 30 30"
                      stroke-width="2"
                      stroke="currentColor"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      {" "}
                      <path stroke="none" d="M0 0h24v24H0z" />{" "}
                      <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" />
                    </svg>
                  </div>
                  <h6 className="text-center text-xl">Tư vấn</h6>
                  <p className="text-center">
                    Tư vấn về các dịch vụ làm đẹp tại Beauty
                  </p>
                  <p className="text-center bg-green-900 text-white w-1/2 mx-auto">
                    <span>
                      {" "}
                      <svg
                        class="bg-black w-6 h-6 mx-auto text-white rounded-full inline-block"
                        viewBox="6 0 10 25"
                        stroke-width="2"
                        stroke="currentColor"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        {" "}
                        <path stroke="none" d="M0 0h24v24H0z" />{" "}
                        <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" />
                      </svg>
                    </span>{" "}
                    0123456789
                  </p>
                </div>
                <div className="mx-32"></div>
                <div style={{width:"30%" , height:"30%"}} className="inline-block flex-1 bg-white z-20 shadow-2xl p-4">
                  <div>
                    <svg
                      class="bg-black w-1/6 h-1/6 mx-auto text-white rounded-full"
                      viewBox="-3 -3 30 30"
                      stroke-width="2"
                      stroke="currentColor"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      {" "}
                      <path stroke="none" d="M0 0h24v24H0z" />{" "}
                      <path d="M3 20l1.3 -3.9a9 8 0 1 1 3.4 2.9l-4.7 1" />{" "}
                      <line x1="12" y1="12" x2="12" y2="12.01" />{" "}
                      <line x1="8" y1="12" x2="8" y2="12.01" />{" "}
                      <line x1="16" y1="12" x2="16" y2="12.01" />
                    </svg>
                  </div>
                  <h6 className="text-center text-xl">Tư vấn</h6>
                  <p className="text-center">
                    Tư vấn về các dịch vụ làm đẹp tại Beauty
                  </p>
                  <p className="text-center bg-green-900 text-white w-1/2 mx-auto">
                    <span>
                      {" "}
                      <svg
                        class="bg-black w-6 h-6 mx-auto text-white rounded-full inline-block"
                        viewBox="6 0 10 25"
                        stroke-width="2"
                        stroke="currentColor"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        {" "}
                        <path stroke="none" d="M0 0h24v24H0z" />{" "}
                        <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" />
                      </svg>
                    </span>{" "}
                    0123456789
                  </p>
                </div>
              </div>
            </div>
            <div className="register-right mt-32">
              <div className="form-wrapper block bg-white mt-12">
                <Form
                  name="basic"
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  autoComplete="off"
                  layout="vertical"
                  className="shadow-2xl"
                >
                  <Row className="w-2/3 block mx-auto">
                    <Col className="w-full">
                      <Row>
                        <Col className="w-full">
                          <Form.Item
                          className="shadow-2xl shadow-gray-300"
                            label="Your Name"
                            name="name"
                            rules={[
                              {
                                required: true,
                                message: "Please input your name !",
                              },
                            ]}
                            style={{ marginRight: "10px" }}
                          >
                            <Input
                              placeholder="Your Name"
                              className="form-input shadow-inner shadow-gray-300"
                            />
                          </Form.Item>
                        </Col>
                      </Row>
                      <Row>
                        <Col className="w-full">
                          <Form.Item
                          className="shadow-2xl shadow-gray-300"
                            label="Your Address"
                            name="address"
                            rules={[
                              {
                                required: true,
                                message: "Please input your address !",
                              },
                            ]}
                            style={{ marginRight: "10px" }}
                          >
                            <Input
                              placeholder="Your Address"
                              className="form-input shadow-inner shadow-gray-300"
                            />
                          </Form.Item>
                        </Col>
                      </Row>
                      <Row>
                        <Col className="w-full">
                          <Form.Item
                          className="shadow-2xl shadow-gray-300"
                            label="Your Context"
                            name="content"
                            rules={[
                              {
                                required: true,
                                message: "Please input your content !",
                              },
                            ]}
                            style={{ marginRight: "10px" }}
                          >
                            <Input
                              placeholder="Your Context"
                              className="form-input shadow-inner shadow-gray-300"
                            />
                          </Form.Item>
                        </Col>
                      </Row>
                      <Row>
                        <Col className="w-full">
                          <Form.Item
                          className="shadow-2xl shadow-gray-300"
                            label="Your PhoneNumber"
                            name="phoneNumber"
                            rules={[
                              {
                                required: true,
                                message: "Please input your phone number !",
                              },
                            ]}
                            style={{ marginRight: "10px" }}
                          >
                            <Input
                              placeholder="Your PhoneNumber"
                              className="form-input shadow-inner shadow-gray-300"
                            />
                          </Form.Item>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Form.Item
                  className="shadow-2xl shadow-gray-300">
                    <Space className="space">
                      <Button htmlType="submit" className="btn-submit">
                        Thêm
                        <ArrowRightOutlined />
                      </Button>
                    </Space>
                  </Form.Item>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Contact;
