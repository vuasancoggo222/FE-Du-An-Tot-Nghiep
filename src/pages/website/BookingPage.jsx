import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Select,
  DatePicker,
  message,
  Tag,
  TimePicker,
  Modal,
} from "antd";
import moment from "moment";
import useEmployee from "../../hooks/use-employee";
import ServiceModal from "../../components/clients/ServiceModal";
import useBooking from "../../hooks/use-booking";
import { useNavigate } from "react-router-dom";
import { httpGetAllService, httpGetOneService } from "../../api/services";
import { isAuthenticate } from "../../utils/LocalStorage";
import { generateCaptcha } from "../../utils/GenerateCaptcha";
import { signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../../firebase/config";
import { httpAddBooking } from "../../api/booking";
import { socket } from "../../App";
import { SocketEvent } from "../../utils/SocketConstant";

// ------------------------------------------------------------------------------------------------
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const validateMessages = {
  required: "${label} không được để trống!",
  types: {
    email: "${label} không đúng định dạng!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};
const format = "HH";

const disabledDate = (current) => {
  // Can not select days before today and today
  return current && current < moment().endOf("day");
};

// ------------------------------------------------------------------------------------------------
let timeLeft = 30;
const BookingPage = () => {
  const onGetOtp = () => {
    generateCaptcha();
    let appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        message.success("Gửi OTP thành công");
      })
      .catch((error) => {
        message.error(`${error.message}`, 2);
      });
    // time disabled
    setLoadings(() => {
      countdown();
      return true;
    });
    setTimeout(() => {
      setLoadings(() => {
        return false;
      });
    }, 3000);

    // ---- time count down

    function countdown() {
      timeLeft--;
      document.getElementById("seconds").innerHTML = String(timeLeft + "s");
      if (timeLeft > 0) {
        setTimeout(countdown, 1000);
      }
      if (timeLeft == 0) {
        timeLeft = 30;
        document.getElementById("seconds").innerHTML = String("");
      }
    }
  };

  const user = isAuthenticate();
  console.log(user);
  const getValueOtp = async (data) => {
    try {
      const otp = data.otp;
      const confirmationResult = window.confirmationResult;
      const result = await confirmationResult.confirm(otp);
      const token = result._tokenResponse.idToken;
      console.log(token);
      const response = await httpAddBooking(token, {
        ...formValues,
        serviceId,
        bookingPrice,
      });
      const newNotification = {
        id: response._id,
        type: "booking",
        text: `Khách hàng ${response.name} đã đặt lịch,vui lòng xác nhận.`,
      };
      socket.emit(SocketEvent.NEWNOTIFICATION, newNotification);
      message.success("Đặt lịch thành công", 2);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  const [form2] = Form.useForm();
  const { data: employees, error } = useEmployee();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const [loadings, setLoadings] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [formValues, setFormValues] = useState({});
  const [serviceDetail, setServiceDetail] = useState();
  const [serviceId, setServiceId] = useState([]);
  const [bookingPrice, setBookingPrice] = useState(0);

  const ParentServiceID = (id) => {
    setServiceId(id);
    getServiceName(id);
  };

  let total = 0;
  const getServiceName = async (id) => {
    try {
      if (id) {
        const data = await httpGetAllService();
        const fildata = data.filter((item) => {
          return (
            item._id === id[0] ||
            item._id === id[1] ||
            item._id === id[2] ||
            item._id === id[3] ||
            item._id === id[4] ||
            item._id === id[5] ||
            item._id === id[6] ||
            item._id === id[7] ||
            item._id === id[8] ||
            item._id === id[9] ||
            item._id === id[10] ||
            item._id === id[11] ||
            item._id === id[12] ||
            item._id === id[13] ||
            item._id === id[14] ||
            item._id === id[15] ||
            item._id === id[16] ||
            item._id === id[17] ||
            item._id === id[18] ||
            item._id === id[19] ||
            item._id === id[20]
          );
        });
        setServiceDetail([...fildata]);

        for (let i = 0; i < fildata.length; i++) {
          total += fildata[i].price;
        }
        setBookingPrice(total);
        console.log("total", total);
        console.log("data list service", fildata);
      }

      // serviceDetail.push(fildata);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async (data) => {
    const phone = data.user.phoneNumber.replace("0", "+84");
    const dataValues = data.user;
    setFormValues(dataValues);
    setPhoneNumber(phone);
    setIsModalOpen(true);
  };

  const onRemoveService = (id) => {
    const newTags = serviceDetail.filter((item) => item._id !== id);
    setServiceDetail(newTags);

    for (let i = 0; i < newTags.length; i++) {
      total += newTags[i].price;
    }

    setBookingPrice(total);
    // setServiceId([]);
  };

  // ------------------------------------------------------------------------------------------------

  if (!employees) return <div>Loading...</div>;
  if (error) return <div>Failed to loading</div>;
  return (
    <>
      <div className="bg-[#01321f] py-[100px] ">
        <section>
          <div className="text-center text-[#FFF]">
            <h2 className="text-[#FFF] text-[50px]"> Đặt lịch</h2>
          </div>
        </section>
      </div>
      <div className="grid grid-cols-[900px_300px] my-10 w-[1200px] gap-[10px]  m-auto ">
        <div className="">
          <div className="border border-[#00502B] rounded-lg  ">
            <h3 className="text-2xl font-bold bg-[#00502B] text-white p-3 rounded-t-lg">
              Đặt lịch
            </h3>
            <div className="m-5">
              <div className="mx-5">
                <Form
                  {...layout}
                  name="nest-messages"
                  validateMessages={validateMessages}
                  initialValues={{
                    prefix: "84",
                  }}
                  onFinish={onSubmit}
                >
                  {/* Tên */}
                  <Form.Item
                    name={["user", "name"]}
                    label="Tên "
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  {/* Tuổi */}
                  <Form.Item
                    name={["user", "age"]}
                    label="Tuổi"
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
                  {/* SĐT */}
                  <Form.Item
                    name={["user", "phoneNumber"]}
                    label="Số điện thoại"
                    rules={[
                      {
                        required: true,
                        pattern: new RegExp(/((9|3|7|8|5)+([0-9]{8})\b)/g),
                        message: "Số điện thoại không đúng định dạng!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  {/* Các dịch vụ */}
                  <Form.Item label="Lựa chọn dịch vụ">
                    <ServiceModal ParentServiceId={ParentServiceID} />
                  </Form.Item>
                  {/* Chọn ngày đặt lich */}
                  {serviceDetail ? (
                    <Form.Item label="Dịch vụ đã chọn">
                      <div className="border p-1">
                        <div className="">
                          {serviceDetail?.map((item) => (
                            <>
                              <Tag
                                closable
                                onClose={() => onRemoveService(item._id)}
                                key={item._id}
                              >
                                {item.name}
                              </Tag>
                            </>
                          ))}
                        </div>

                        <div className="mt-3 pt-3 border-t">
                          <span>Tạm tính: </span>{" "}
                          <span className="font-semibold">
                            {bookingPrice?.toLocaleString("vi", {
                              style: "currency",
                              currency: "VND",
                            })}
                          </span>
                        </div>
                      </div>
                    </Form.Item>
                  ) : (
                    ""
                  )}
                  <Form.Item
                    name={["user", "date"]}
                    label="Chọn ngày"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <DatePicker
                      showTime
                      format="YYYY-MM-DD "
                      disabledDate={disabledDate}
                      size="large"
                    />
                  </Form.Item>
                  {/* chọn nhân viên */}
                  <Form.Item
                    label="Chọn nhân viên"
                    name={["user", "employeeId"]}
                    rules={[
                      {
                        // required: true,
                      },
                    ]}
                  >
                    <Select defaultValue="default">
                      <Select.Option disabled value="default">
                        Vui lòng chọn nhân viên
                      </Select.Option>
                      {employees?.map((item, index) => (
                        <Select.Option value={item._id} key={index}>
                          <div className="">{item.name}</div>
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                  {/* chọn ca  */}
                  <Form.Item label="Chọn giờ đến" name={["user", "time"]}>
                    <TimePicker format={format} />
                  </Form.Item>
                  {/* Ghi chú */}
                  <Form.Item name={["user", "note"]} label="Ghi chú">
                    <Input.TextArea />
                  </Form.Item>
                  {/* button */}
                  <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                    <Button
                      type="primary"
                      style={{ backgroundColor: "#00502b", border: "none" }}
                      htmlType="submit"
                    >
                      Đặt lịch
                    </Button>
                  </Form.Item>

                  <Modal
                    title="Xác nhận số điện thoại"
                    onCancel={handleCancel}
                    open={isModalOpen}
                    footer={null}
                  >
                    <>
                      {" "}
                      <Form form={form2} onFinish={getValueOtp} name="otpvalue">
                        <Form.Item name="otp" label="Mã xác nhận">
                          <Input style={{ width: "calc(100% - 200px)" }} />
                        </Form.Item>
                        <Form.Item>
                          <Button
                            loading={loadings}
                            onClick={onGetOtp}
                            type="primary"
                          >
                            Nhận mã
                          </Button>
                          <span
                            id="seconds"
                            className="text-red-600 ml-3"
                          ></span>
                        </Form.Item>
                        <Form.Item>
                          <Button success htmlType="submit">
                            Xác thực
                          </Button>
                        </Form.Item>
                      </Form>
                      <div id="recaptcha"></div>
                    </>
                  </Modal>
                </Form>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="">
            <div className="border-2 border-[#00502B] border-t-transparent rounded-3xl text-center pb-4">
              <h2 className="bg-[#00502B] text-white text-[28px] font-bold text-center mb-0 rounded-tr-2xl rounded-tl-2xl">
                Thời gian làm việc
              </h2>
              <h2 className="text-[#00502B] text-[28px] font-bold">
                7H00 - 19H00
              </h2>
              <p className="text-[22px]">
                Từ <strong>thứ 2</strong> đến <strong>Chủ nhật</strong>
              </p>
            </div>
            <div className="text-[#00502B] border-2 border-[#00502B] border-t-transparent rounded-3xl mt-5">
              <h2 className="bg-[#00502B] text-white text-[28px] font-bold text-center mb-4 rounded-tr-2xl rounded-tl-2xl">
                Dịch vụ nổi bật
              </h2>
              <div className="px-4">
                <a
                  className="block text-[#036636] hover:text-[#008000] font-bold pb-2"
                  href
                >
                  Điêu khắc lông mày được bao lâu?
                </a>
                <a
                  className="block text-[#036636] hover:text-[#008000] font-bold pb-2"
                  href
                >
                  Điêu khắc lông mày hỏng có sửa được không?
                </a>
                <a
                  className="block text-[#036636] hover:text-[#008000] font-bold pb-2"
                  href
                >
                  Có nên điêu khắc lông mày không?
                </a>
                <a
                  className="block text-[#036636] hover:text-[#008000] font-bold pb-2"
                  href
                >
                  Chăm sóc sau khi nâng chân mày thế nào để nhanh lành?
                </a>
                <a
                  className="block text-[#036636] hover:text-[#008000] font-bold pb-2"
                  href
                >
                  Phun môi collagen giá bao nhiêu tiền 1 lần?
                </a>
                <a
                  className="block text-[#036636] hover:text-[#008000] font-bold pb-2"
                  href
                >
                  Phun môi có đánh son được không?
                </a>
              </div>
            </div>
            <div>
              <img
                className="w-[100%] mt-4 mb-6"
                src="https://thanhthuybeauty.com/wp-content/uploads/2020/10/banner-quang-cao-300x300.jpg"
                alt
              />
            </div>
            <div className="border-2 border-[#00502B] border-t-transparent rounded-3xl mt-5">
              <h2 className="bg-[#00502B] text-white text-[28px] font-bold text-center mb-4 rounded-tr-2xl rounded-tl-2xl">
                Có thể bạn quan tâm
              </h2>
              <div className="px-4">
                <a
                  className="flex text-[#036636] hover:text-[#008000] font-bold pb-3 pt-3"
                  href
                >
                  <img
                    className="mr-2 w-[44px] h-[44px]"
                    src="https://thanhthuybeauty.com/wp-content/uploads/2020/10/tu-van-3-300x167.jpg"
                    alt
                  />
                  Rút chất liệu mũi là gì
                </a>
                <a
                  className="flex text-[#036636] hover:text-[#008000] font-bold pb-3 pt-3"
                  href
                >
                  <img
                    className="mr-2 w-[44px] h-[44px]"
                    src="https://thanhthuybeauty.com/wp-content/uploads/2020/10/tu-van-4-300x200.jpg"
                    alt
                  />
                  Thu gọn cánh mũi
                </a>
                <a
                  className="flex text-[#036636] hover:text-[#008000] font-bold pb-3 pt-3"
                  href
                >
                  <img
                    className="mr-2 w-[44px] h-[44px]"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGM9Gva3DiF5VIcb_OQV8-baXcstYB8Pay7g&usqp=CAU"
                    alt
                  />
                  Nâng mũi High-line
                </a>
                <a
                  className="flex text-[#036636] hover:text-[#008000] font-bold pb-3 pt-3"
                  href
                >
                  <img
                    className="mr-2 w-[44px] h-[44px]"
                    src="https://thanhthuybeauty.com/wp-content/uploads/2020/10/96243980_3241418309244404_2262902871081091072_o-300x256.jpg"
                    alt
                  />
                  Nâng mũi NanoCell 4.0
                </a>
                <a
                  className="flex text-[#036636] hover:text-[#008000] font-bold pb-3 pt-3"
                  href
                >
                  <img
                    className="mr-2 w-[44px] h-[44px]"
                    src="https://thanhthuybeauty.com/wp-content/uploads/2020/10/96372996_3233515503368018_4629360027893760000_o.jpg"
                    alt
                  />
                  Nâng mũi BisCell
                </a>
              </div>
            </div>
            <div className="border-2 border-[#00502B] border-t-transparent rounded-3xl mt-5">
              <h2 className="bg-[#00502B] text-white text-[28px] font-bold text-center mb-0 rounded-tr-2xl rounded-tl-2xl">
                Xem video
              </h2>
              <video
                className="rounded-b-[22px] w-[100%]"
                src="./image/Rectangle.png"
                controls
              />
            </div>
            <div className="border-2 border-[#00502B] border-t-transparent rounded-3xl mt-5 ">
              <h2 className="bg-[#00502B] text-white text-[28px] font-bold text-center mb-0 rounded-tr-2xl rounded-tl-2xl">
                Câu chuyện khác hàng
              </h2>
              <div className="px-4">
                <a
                  className="flex text-[#036636] hover:text-[#008000] pb-3 pt-3 font-bold"
                  href
                >
                  <img
                    className="mr-2 w-[44px] h-[44px]"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUfp-LxsSFZkebtyf143IKldTeRbGZq1zemQ&usqp=CAU"
                    alt
                  />
                  Điêu khắc lông mày được bao lâu?
                </a>
                <a
                  className="flex text-[#036636] hover:text-[#008000] pb-3 pt-3 font-bold"
                  href
                >
                  <img
                    className="mr-2 w-[44px] h-[44px]"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9g6bCNhOormxufV3rGvu9CHnLM8ju8Wn_aw&usqp=CAU"
                    alt
                  />
                  Điêu khắc lông mày hỏng có sửa được không?
                </a>
                <a
                  className="flex text-[#036636] hover:text-[#008000] pb-3 pt-3 font-bold"
                  href
                >
                  <img
                    className="mr-2 w-[44px] h-[44px]"
                    src="https://thanhthuybeauty.com/wp-content/uploads/2020/10/tu-van-1-300x300.jpg"
                    alt
                  />
                  Có nên điêu khắc lông mày không?
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingPage;
