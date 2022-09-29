import React, { useState } from "react";
import EmployeeModal from "../../components/clients/EmployeeModal";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Select,
  Checkbox,
  DatePicker,
} from "antd";
import moment from "moment";
import useEmployee from "../../hooks/use-employee";
import { useEffect } from "react";
import { getEmployeeByDate } from "../../api/employee";
import ServiceModal from "../../components/clients/ServiceModal";
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

const onOk = (value) => {
  console.log("onOk: ", value);
};
const disabledDate = (current) => {
  // Can not select days before today and today
  return current && current < moment().endOf("day");
};

const prefixSelector = (
  <Form.Item name="prefix" noStyle>
    <Select
      style={{
        width: 70,
      }}
    >
      <Option value="84">+84</Option>
      <Option value="87">+87</Option>
    </Select>
  </Form.Item>
);
// ------------------------------------------------------------------------------------------------

const BookingPage = () => {
  const { data: employees, error } = useEmployee();

  // console.log(shift);
  // ------------------------------------------------------------------------------------------------
  const [id, setId] = useState("");
  const [date, setDate] = useState("");

  const [open, setOpen] = useState(false);
  const onChangeSelected = (value) => {
    setId(value);
  };
  const onChange1 = (value, dateString) => {
    console.log("Formatted Selected Time: ", dateString);
    console.log("timestamp", moment(dateString).format("X"));
    const timeStamp = moment(dateString).format("X");
    setDate(timeStamp);
  };
  const onHandleAdd = (value) => {
    console.log("cha:", value);
  };
  const [shiftId, setShiftId] = useState("");
  const ParentShiftID = (e) => {
    setShiftId(e);
  };
  const [serviceId, setServiceId] = useState("");
  const ParentServiceID = (e) => {
    setServiceId(e);
  };

  const convertServiceId = Object.assign({}, serviceId);
  const onSubmit = (data) => {
    console.log("submit", {
      ...data.user,
      shiftId: shiftId.id,
      serviceId: convertServiceId,
      date: date,
    });
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
                  onAdd={onHandleAdd}
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

                  {/* Email */}
                  <Form.Item
                    name={["user", "email"]}
                    label="Email"
                    rules={[
                      {
                        required: true,
                        type: "email",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  {/* SĐT */}
                  <Form.Item
                    name={["user", "phone"]}
                    label="Số điện thoại"
                    rules={[
                      {
                        required: true,
                        // type: "phone",
                        // message: "Please input your phone number!",
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
                  <Form.Item
                    label="Lựa chọn dịch vụ"
                    rules={[
                      {
                        // required: true,
                      },
                    ]}
                  >
                    <Input />
                    <ServiceModal ParentServiceId={ParentServiceID} />
                  </Form.Item>

                  {/* Chọn ngày đặt lich */}
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
                      disabledDate={disabledDate}
                      onChange={onChange1}
                      onOk={onOk}
                      size="large"
                    />
                  </Form.Item>

                  {/* chọn nhân viên */}
                  <Form.Item
                    label="Chọn nhân viên"
                    name={["user", "employees"]}
                    rules={[
                      {
                        // required: true,
                      },
                    ]}
                  >
                    <Select onChange={onChangeSelected}>
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
                  <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                    <Input value={shiftId.shiftName} readOnly />
                    <EmployeeModal
                      date={date}
                      id={id}
                      open={open}
                      ParentShiftId={ParentShiftID}
                    />
                  </Form.Item>
                  {/* Ghi chú */}
                  <Form.Item name={["user", "note"]} label="Ghi chú">
                    <Input.TextArea />
                  </Form.Item>

                  {/* button */}
                  <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                    <Button type="primary" htmlType="submit">
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
