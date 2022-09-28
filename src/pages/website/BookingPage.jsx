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
// import  useGetOne from "../../hooks/use-employee";
import { useEffect } from "react";
import { httpGetAll } from "../../api/shift";
import { httpGetOne, httpAddShift } from "../../api/employee";
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

const options = [
  {
    label: "dich vu 1",
    value: "1",
  },
  {
    label: "dich vu 2",
    value: "2",
  },
  {
    label: "dich vu 3",
    value: "3",
  },
];
const onChange = (checkedValues) => {
  console.log("checked = ", checkedValues);
};

const disabledDate = (current) => {
  // Can not select days before today and today
  return current && current < moment().endOf("day");
};

// const { RangePicker } = DatePicker;

// const range = (start, end) => {
//   const result = [];

//   for (let i = start; i < end; i++) {
//     result.push(i);
//   }

//   return result;
// };

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
  const [shift, setShift] = useState();
  const [dateBooking, seDateBooking] = useState();
  const [employeeBooking, setEmployeeBooking] = useState();
  console.log(employees);
  const onSubmit = ({data}) => {
    console.log("submit", data);
    console.log(employeeBooking);
    httpAddShift(data.employees, {shiftId: data?.shift, date: dateBooking })
  };
  const onOk = (value) => { 
    // console.log("...."+ employeeBooking);

    console.log("onOk: ", value); 
    
  };
  const onChange1 = (value, dateString) => {
    console.log("Selected Time: ", value);
    seDateBooking(Number(dateString.replace("-","").replace("-","")))
    // console.log(moment(dateString).format("X")); 
    // const query = moment(dateString).format("X");
    // console.log(a);
    // const a = getEmployeeByBookingDays(1063040400);
    // setShift(a);
  };
  // console.log(shift);
  // ------------------------------------------------------------------------------------------------
  const [open, setOpen] = useState(false);
  const onChangeSelected = async (e) => {
    console.log(e);
    // await setEmployeeBooking(employees[e]);
    const employeesOne = await httpGetOne(e)
    console.log(employeesOne);
    setEmployeeBooking(employeesOne);
  };
  const onHandleAdd = (value) => {
    console.log("cha:", value);
  };
  const texHello = {
    backgroundColor: "white",
    color: "#002200",
    opacity: 0.8
  }
  const bgStaff = {
    width: "100%",
    height: "100%",
    backgroundImage:
      "url('https://res.cloudinary.com/df7kkrfoe/image/upload/v1663325104/tac-phong-lam-viec-nhan-vien-spa-1_mfbeu0.jpg')",
    backgroundRepeat: 'repeat-y'
  };
  // ------------------------------------------------------------------------------------------------
  // useEffect(() => {
  //   create({
  //     name: "test api",
  //     idCard: "071092429",
  //     email: "test@gmail.com",
  //     phoneNumber: "0384765294",
  //     status: 1,
  //     gender: 1,
  //     timeWork: [
  //       {
  //         date: 1664064000,
  //         shiftId: "6329f25081117054d459f8d4",
  //         status: 1,
  //         _id: "632e8eac33bb1bbd4bb1cf61",
  //       },
  //       {
  //         date: 1664064000,
  //         shiftId: "632a8c6a38f01fd54692a984",
  //         status: 1,
  //         _id: "632e8eca33bb1bbd4bb1cf6a",
  //       },
  //       {
  //         date: 166199040,
  //         shiftId: "6329f29881117054d459f8d6",
  //         status: 1,
  //         _id: "632e903922d4ffb59e132fd7",
  //       },
  //     ],
  //   });
  // }, []);
  if (!employees) return <div>Loading...</div>;
  if (error) return <div>Failed to loading</div>;
  useEffect(() => {
    const getShift = async () => {
      const data = await httpGetAll();
      console.log(data.shift);
      setShift(data.shift)
    }
    getShift()
  }, [])
  return (
    <div className="flex">
      <div style={{ width: "35%" }} className="">
        <div className="pt-48 rounded-xl  flex justify-center text-white font-bold text-xl font-mono  ..." width="100px" style={bgStaff}>
          <div className="mt-32"  >
            <div style={texHello} className="p-2 text-center">Chào bạn đến với Tuyến Spa</div>
            <div style={texHello} className="text-center">Dịch vụ spa uy tín</div>
            <p style={{ backgroundColor: "black" }} className="text-white text-sm text-center mt-5 ..."> Hỗ trợ đăng ký: 012344567</p>
          </div>
        </div>

      </div>
      <div className="w-[55%] m-auto">
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
                  name={["data", "name"]}
                  label="Tên "
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                x {/* Tên */}
                <Form.Item
                  name={["data", "age"]}
                  label="Tuổi "
                  rules={[
                    {
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                {/* Email */}
                <Form.Item
                  name={["data", "email"]}
                  label="Email"
                  rules={[
                    {
                      type: "email",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                {/* SĐT */}
                <Form.Item
                  name={["data", "phone"]}
                  label="Số điện thoại"
                  rules={[
                    {
                      required: true,
                      pattern: new RegExp(/((09|03|07|08|05)+([0-9]{8})\b)/g),
                      message:"Số điện thoại không đúng định dạng!"
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
                {/* chọn nhân viên */}
                {/* <Form.Item
                  label="Chọn dịch vụ"
                  name={["user", "employees"]}
                  rules={[
                    {
                      // required: true,
                    },
                  ]}
                >
                  <Select onChange={onChangeSelected}>
                    <Checkbox onChange={onChange}>Checkbox</Checkbox>
                  </Select>
                </Form.Item> */}
                {/* Các dịch vụ */}


                {/* Chọn ngày đặt lich */}
                <Form.Item
                  name={["data", "dateBooking"]}
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
                  />
                </Form.Item>

                {/* chọn nhân viên */}
                <Form.Item
                  label="Chọn nhân viên"
                  name={["data", "employees"]}
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Select onChange={onChangeSelected}>
                    {employees?.map((item, index) => (
                      <Select.Option value={item._id} key={index}>
                        {item.name}
                        <div
                          className=""
                        // onClick={() => {
                        //   setOpen(true);
                        // }}
                        >
                        </div>
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  label="Chọn ca"
                  name={["data", "shift"]}
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Select onChange={onChangeSelected}>
                    {shift?.map((item, index) => {
                      let checkIs = true;

                      employeeBooking?.timeWork.map((itemStaff) => {
                        if(itemStaff.date === dateBooking) {
                          if (item._id === itemStaff.shiftId)
                          checkIs = false
                          return
                        }
                      }
                      )
                      if(checkIs) 
                      return (
                        <Select.Option value={item._id} key={index}>
                          {item.shiftName + "(" + item.timeStart + "-" + item.timeEnd + ")"}
                          <div
                            className=""
                          // onClick={() => {
                          //   setOpen(true);
                          // }}
                          >
                          </div>
                        </Select.Option>
                      )
                    })}
                  </Select>
                </Form.Item>
                {/* chọn ca  */}
                {/* <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                  <EmployeeModal id={id} open={open} />
                </Form.Item> */}
                {/* <Form.Item name={["user", "note"]} label="Ghi chú">
                  <Input.TextArea />
                </Form.Item> */}

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
    </div>
  );
};

export default BookingPage;
