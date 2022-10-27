import React from "react";
import { ArrowRightOutlined, BgColorsOutlined } from "@ant-design/icons";
import { Button, Form, Input, Row, Col, Space, message } from "antd";
import { httpAddContact } from "../../api/contact";
import { useNavigate } from "react-router-dom";
import styles from "../../../assets/css/style.module.css";

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
      <div>
        <div className="bg-[#f4f4f4] m-auto">
          <div className={styles.sectiondart}>
            <section className="py-[120px] ">
              <div className="text-center text-[#FFF]">
                <h2 className="text-[#FFF] text-[30px] ">Liên Hệ</h2>
                <p className="text-base">
                  Beauty luôn lắng nghe, luôn luôn thấu hiểu
                </p>
              </div>
            </section>
          </div>
          <div className="container m-auto " style={{ maxWidth: "1313px" }}>
            <div className="container m-auto lg:px-24">
              <section className="grid sm:grid-cols-1 md:grid-cols-2 m-auto gap-[20px]">
                <div className="bg-white text-center py-[40px] px-[100px] mt-[-60px] h-[350px] mb-[20px] col-span-1">
                  <button className="rounded-full bg-black px-[12px] py-[12px] ">
                    <i className="fa-solid fa-phone fa-2x text-white"></i>
                  </button>
                  <h2 className="text-lg font-bold leading-7 text-center text-[#01321f] mt-4">
                    Tư vấn{" "}
                  </h2>
                  <p className="mt-4 text-base">
                    Tư vấn về các dịch vụ làm đẹp tại Beauty
                  </p>
                  <div className="">
                    <div>
                      <button className="bg-[#00502b] px-[8px] py-[8px] text-white hover:bg-[#01321f] mt-4 text-lg font-semibold">
                        {" "}
                        <i className="fa-solid fa-comments fa-1x text-white px-[10px]"></i>{" "}
                        (028) 4455 7788
                      </button>
                    </div>
                  </div>
                </div>
                <div className="bg-white text-center py-[40px] px-[100px] mt-[-60px] h-[350px] mb-[20px] col-span-1 ">
                  <button className="rounded-full bg-black px-[10px] py-[13px]">
                    <i className="fa-solid fa-comments fa-2x text-white"></i>
                  </button>
                  <h2 className="text-lg font-bold leading-7 text-center text-[#01321f] mt-4">
                    Chăm sóc{" "}
                  </h2>
                  <p className="mt-4 text-base">
                    Lắng nghe, thay đổi để phát triển
                  </p>
                  <div className="">
                    <div>
                      <button className="bg-[#00502b] px-[8px] py-[8px] text-white hover:bg-[#01321f] mt-4 text-lg font-semibold">
                        {" "}
                        <i className="fa-solid fa-comments fa-1x text-white px-[10px]"></i>{" "}
                        (028) 4455 7788
                      </button>
                    </div>
                  </div>
                </div>
              </section>
            </div>
            <div className="container mx-auto lg:px-24 mb-4">
              <div className="bg-white w-full shadow rounded p-8 sm:p-12 ">
                <p className="text-2xl text-[#00502b] font-bold leading-7 text-center ">
                  Để lại lời nhắn cho Beauty
                </p>
                <div className="lg:mx-36">
                  <form action="" method="post">
                    <div className="md:flex items-center mt-8">
                      <div className="w-full flex flex-col">
                        <label className="font-semibold leading-none text-black-300">
                          Họ tên:
                        </label>
                        <input
                          type="text"
                          className="border border-gray-300 leading-none  p-2 focus:outline-none focus:border-green-700 mt-4  bg-white rounded"
                        />
                      </div>
                    </div>
                    <div className="md:flex items-center mt-8">
                      <div className="w-full flex flex-col">
                        <label className="font-semibold leading-none text-black-300">
                          Email:
                        </label>
                        <input
                          type="text"
                          className="border border-gray-300 leading-none p-2 focus:outline-none focus:border-green-700 mt-4  bg-white rounded"
                        />
                      </div>
                    </div>
                    <div className="md:flex items-center mt-8">
                      <div className="w-full flex flex-col">
                        <label className="font-semibold leading-none text-black-300">
                          Tiêu đề:
                        </label>
                        <input
                          type="text"
                          className="border border-gray-300 leading-none p-2 focus:outline-none focus:border-green-700 mt-4  bg-white rounded"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="w-full flex flex-col mt-8">
                        <label className="font-semibold leading-none text-black-300">
                          Nội dung:
                        </label>
                        <textarea
                          type="text"
                          className=" border border-gray-300 h-40 text-base leading-none  p-2 focus:outline-none focus:border-green-700 mt-4 bg-white  rounded"
                        ></textarea>
                      </div>
                    </div>
                    <div className="flex items-center justify-start w-full">
                      <button className="mt-9 font-semibold leading-none text-white py-4 px-10 bg-green-700 rounded hover:bg-green-600 focus:ring-2 focus:ring-offset-2 focus:ring-green-700 focus:outline-none">
                        Gửi 
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="map container mx-auto lg:px-24 mb-4">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14896.602629703322!2d105.7703402!3d21.026657000000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313455c2ee01a76b%3A0xb118ceaa0cb97f16!2zU8OibiBiw7NuZyBN4bu5IMSQw6xuaCAy!5e0!3m2!1sen!2s!4v1663950191361!5m2!1sen!2s"
                width="100%"
                height="450"
                allowfullscreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="bg-gray-100 min-w-fit">
        <img src="https://beautyspa4.shostweb.com/wp-content/uploads/2021/11/bg-footer01.jpg" alt="" />
        <div className="block my-8 m-auto w-3/4 max-w-fit">
          <div style={{width: "1000px"}} className="register-wrapper" >
            <div className="register-right -mt-32 w-full">
              <div className="flex">
                <div
                  style={{ width: "30%" }}
                  className="inline-block flex-1 bg-white z-20 shadow-2xl p-4"
                >
                  <div>
                    <svg
                      className="bg-black w-1/6 h-1/6 mx-auto text-white rounded-full"
                      viewBox="-3 -3 30 30"
                      strokeWidth="2"
                      stroke="currentColor"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      {" "}
                      <path stroke="none" d="M0 0h24v24H0z" />{" "}
                      <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" />
                    </svg>
                  </div>
                  <h6 className="text-center text-xl text-[#00502b]">Tư vấn</h6>
                  <p className="text-center text-base font-normal">
                    Tư vấn về các dịch vụ làm đẹp tại Beauty
                  </p>
                  <p className="text-center bg-green-900 text-white w-1/2 mx-auto">
                    <span>
                      {" "}
                      <svg
                        className="bg-black w-6 h-6 mx-auto text-white rounded-full inline-block"
                        viewBox="6 0 10 25"
                        strokeWidth="2"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        {" "}
                        <path stroke="none" d="M0 0h24v24H0z" />{" "}
                        <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" />
                      </svg>
                    </span>{" "}
                    0123456789
                  </p>
                </div>
                <div className="mx-2"></div>
                <div
                  style={{ width: "30%", height: "30%" }}
                  className="inline-block flex-1 bg-white z-20 shadow-2xl p-4"
                >
                  <div>
                    <svg
                      className="bg-black w-1/6 h-1/6 mx-auto text-white rounded-full"
                      viewBox="-3 -3 30 30"
                      strokeWidth="2"
                      stroke="currentColor"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      {" "}
                      <path stroke="none" d="M0 0h24v24H0z" />{" "}
                      <path d="M3 20l1.3 -3.9a9 8 0 1 1 3.4 2.9l-4.7 1" />{" "}
                      <line x1="12" y1="12" x2="12" y2="12.01" />{" "}
                      <line x1="8" y1="12" x2="8" y2="12.01" />{" "}
                      <line x1="16" y1="12" x2="16" y2="12.01" />
                    </svg>
                  </div>
                  <h6 className="text-center text-xl text-[#00502b]">Tư vấn</h6>
                  <p className="text-center text-base font-normal">
                    Tư vấn về các dịch vụ làm đẹp tại Beauty
                  </p>
                  <p className="text-center bg-green-900 text-white w-1/2 mx-auto">
                    <span>
                      {" "}
                      <svg
                        className="bg-black w-6 h-6 mx-auto text-white rounded-full inline-block"
                        viewBox="6 0 10 25"
                        strokeWidth="2"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
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
            <div className="register-right mt-20">
              <h2 className="text-center text-[#00502b] text-xl font-bold">Để lại lời nhắn cho Beauty</h2>
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
                            label="Họ tên"
                            name="name"
                            rules={[
                              {
                                required: true,
                                message: "Vui lòng nhập tên của bạn !",
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
                            label="Địa chỉ"
                            name="address"
                            rules={[
                              {
                                required: true,
                                message: "Vui lòng nhập địa chỉ của bạn !",
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
                            label="Nội dung"
                            name="content"
                            rules={[
                              {
                                required: true,
                                message: "Vui lòng nhập nội dung của bạn !",
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
                            label="Điện thoại"
                            name="phoneNumber"
                            rules={[
                              {
                                required: true,
                                message: "Vui lòng nhập số điện thoại của bạn !",
                              },
                            ]}
                            style={{ marginRight: "10px" }}
                          >
                            <Input
                              placeholder="Your PhoneNumber"
                              className="form-input shadow-inner shadow-blue-300"
                            />
                          </Form.Item>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Form.Item>
                    <Button
                      htmlType="submit"
                      className="w-5/12 block m-12 ml-[16.5%]"
                      style={{
                        backgroundColor:
                          "rgb(59 130 246 / var(--tw-bg-opacity))",
                      }}
                    >
                      Gửi
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
}

export default Contact;
