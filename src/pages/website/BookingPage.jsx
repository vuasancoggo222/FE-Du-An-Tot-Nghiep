import React, { useEffect, useState } from "react";
import EmployeeModal from "../../components/clients/EmployeeModal";
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
} from "antd";
import moment from "moment";
import useEmployee from "../../hooks/use-employee";
import ServiceModal from "../../components/clients/ServiceModal";
import useBooking from "../../hooks/use-booking";
import { useNavigate } from "react-router-dom";
import { httpGetOneService } from "../../api/services";
import { getPrefixPhoneNumber } from "../../api/prefix";
import { isAuthenticate } from "../../utils/LocalStorage";
// ------------------------------------------------------------------------------------------------
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const { Option } = Select;
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
const format = "DD-MM-YYYY HH";

const disabledDate = (current) => {
  // Can not select days before today and today
  return current && current < moment().endOf("day");
};
const range = (start, end) => {
  const result = [];
  for (let i = start; i < end; i++) {
    result.push(i);
  }
  return result;
};
const disabledDateTime = () => ({
  disabledHours: () => range(0, 24).splice(0, 7),
});
// ------------------------------------------------------------------------------------------------

const BookingPage = () => {
  const { data: employees, error } = useEmployee();
  const navigate = useNavigate();
  const { create } = useBooking();
  // const [prefixs, setPrefixs] = useState();
  // useEffect(() => {
  //   const getPrefix = async () => {
  //     const { data } = await getPrefixPhoneNumber();
  //     setPrefixs(data);
  //   };
  //   console.log(prefixs);
  //   getPrefix();
  // }, []);

  const prefixSelector = (
    <Select
      style={{
        width: 70,
      }}
    >
      {/* {prefixs?.map((prefix) => (
        <Option value={prefix.dial_code} key={prefix.code}>
          {prefix.dial_code}
        </Option>
      ))} */}
      <Option value="84">+84</Option>
      <Option value="87">+87</Option>
    </Select>
  );
  // console.log(shift);
  // ------------------------------------------------------------------------------------------------
  const [id, setId] = useState("");
  const [date, setDate] = useState("");
  const [open, setOpen] = useState(false);
  const [serviceDetail, setServiceDetail] = useState(null);
  const [time, setTime] = useState();
  const onChangeSelected = (value) => {
    setId(value);
  };

  const onChange1 = (value, dateString) => {
    console.log("Selected Time: ", value);
    // setDate(Number(dateString.replace("-", "").replace("-", "")));
    setDate(value);
  };

  const [serviceId, setServiceId] = useState("");
  const ParentServiceID = (id) => {
    setServiceId(id);
    getServiceName(id);
  };
  const getServiceName = async (id) => {
    try {
      const data = await httpGetOneService(id);
      console.log(data);
      setServiceDetail(data);
    } catch (error) {
      console.log(error);
    }
  };
  const onSubmit = async (data) => {
    try {
      await create({
        ...data.user,
        serviceId,
      }).then(() => {
        message.success("Đặt lịch thành công", 4);
        navigate("/");
      });
    } catch (error) {
      message.error(`${error.response.data.message}`, 4);
    }

    console.log(data);
  };
  const onRemoveService = () => {
    setServiceDetail(null);
    setServiceId("");
  };

  const onChange = (time, timeString) => {
    console.log("giờ", time, timeString);
    setTime(timeString);
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
                    prefix: "+84",
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
                    <Input
                      addonBefore={prefixSelector}
                      style={{
                        width: "100%",
                      }}
                    />
                  </Form.Item>
                  {/* Các dịch vụ */}
                  <Form.Item label="Lựa chọn dịch vụ">
                    <ServiceModal ParentServiceId={ParentServiceID} />
                  </Form.Item>
                  {/* Chọn ngày đặt lich */}
                  {serviceDetail ? (
                    <Form.Item label="Dịch vụ đã chọn">
                      <Tag closable onClose={onRemoveService}>
                        {serviceDetail.name}
                      </Tag>
                    </Form.Item>
                  ) : (
                    ""
                  )}
                  1
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
                      format={format}
                      disabledDate={disabledDate}
                      disabledTime={disabledDateTime}
                      onChange={onChange1}
                      size="large"
                      showTime={{
                        defaultValue: moment("00", "HH"),
                      }}
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
                    <Select onChange={onChangeSelected} defaultValue="default">
                      <Select.Option disabled value="default">
                        Vui lòng chọn nhân viên
                      </Select.Option>
                      {employees?.map((item, index) => (
                        <Select.Option value={item._id} key={index}>
                          <div
                            className=""
                            onClick={() => {
                              setOpen(true);
                            }}
                          >
                            {item.name}
                          </div>
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                  {/* chọn ca  */}
                  {/* <Form.Item label="Chọn giờ đến" name={["user", "time"]}>
                    <EmployeeModal
                      date={date}
                      id={id}
                      open={open}
                      ParentShiftId={ParentShiftID}
                    />
                    <TimePicker onChange={onChange} format={format} />
                  </Form.Item> */}
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
