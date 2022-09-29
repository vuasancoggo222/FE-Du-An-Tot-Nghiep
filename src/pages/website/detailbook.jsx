import React, { useEffect, useState } from "react";
import { Button, Form, Input, Select, DatePicker, message } from "antd";
import useEmployee from "../../hooks/use-employee";
import { httpGetAll } from "../../api/shift";
import { httpGetOne, httpAddShift } from "../../api/employee";
import { httpAddBooking } from "../../api/booking";
import { useNavigate, useParams } from "react-router-dom";
import { httpGetOneService } from "../../api/services";

const Detaibooking = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const { data: employees, error } = useEmployee();
  const [shift, setShift] = useState();
  const [dateBooking, seDateBooking] = useState();
  const [employeeBooking, setEmployeeBooking] = useState();
  const [service, setService] = useState();
  console.log(employees);
  const onSubmit = async ({ data }) => {
    console.log("submit", data);
    console.log(employeeBooking);
    try {
      console.log(service._id);
      await httpAddBooking({ ...data, date: dateBooking, serviceId: service._id })
      await httpAddShift(data.employeeId, { shiftId: data?.shiftId, date: dateBooking })  
      message.success("Đã đặt lịch, chờ Spa xác nhận cái đã")
      navigate('/');  
    } catch (error) {
      message.error(`${error.response.data.message}`)
    }
 
  };
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
  // const disabledDate = (current) => {
  //   // Can not select days before today and today
  //   return current && current < moment().endOf("day");
  // };

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

  const onOk = (value) => {
    // console.log("...."+ employeeBooking);

    console.log("onOk: ", value);

  };
  const onChange1 = (value, dateString) => {
    console.log("Selected Time: ", value);
    seDateBooking(Number(dateString.replace("-", "").replace("-", "")))
    // console.log(moment(dateString).format("X")); 
    // const query = moment(dateString).format("X");
    // console.log(a);
    // const a = getEmployeeByBookingDays(1063040400);
    // setShift(a);
  };
  // console.log(shift);
  // ------------------------------------------------------------------------------------------------
  // eslint-disable-next-line no-unused-vars
  const [open, setOpen] = useState(false);
  const onChangeSelected = async (e) => {
    console.log(e);
    // await setEmployeeBooking(employees[e]);
    const employeesOne = await httpGetOne(e)
    console.log(employeesOne);
    setEmployeeBooking(employeesOne);
    
  if (!employees) return <div>Loading...</div>;
  if (error) return <div>Failed to loading</div>;
  };
  const onHandleAdd = (value) => {
    console.log("cha:", value);
  };

  useEffect(() => {
    const getShift = async () => {
      const data = await httpGetAll();
      console.log(data.shift);
      setShift(data.shift)
    }
    getShift()

    const getSerVice = async () => {
      const data = await httpGetOneService(id);
      console.log(data);
      setService(data)
    }
    getSerVice()
  }, [])
  return (
    <>
      <div className="bg-[url('https://beautyspa4.shostweb.com/wp-content/uploads/2021/11/cole-keister-8V1gfeaPP1Y-unsplash.jpg')] b-centerg bg-no-repeat bg-cover py-[100px] ">
        <section>
          <div className="text-center text-[#FFF]">
            <h2 className="text-[#FFF] text-[50px]">
              {" "}
              MASSAGE TOÀN THÂN THEO PHONG CÁCH ROZEN
            </h2>
          </div>
        </section>
      </div>
      <div className="grid grid-cols-[700px_500px] my-10 w-[1200px] gap-[10px] relative m-auto ">
        <div>
          <div>
            <figure>
              <img
                src="https://rozenspa.vn/wp-content/uploads/2022/04/rozen.jpg"
                alt=""
              />
            </figure>
            <p>
              Sau một ngày dài làm việc mệt mỏi cùng với khói bụi trên những con
              đường đông đúc của thành phố. Bạn đã tự hỏi ngoài việc ăn uống và
              giải trí cùng bạn bè chúng ta còn có thể làm gì để cho cơ thể
              chúng ta thư giãn một cách thoải mát và sảng khoái nhất chưa. Đó
              là lí do mà RoZen Spa tạo nên dịch vụ massage toàn thân theo phong
              cách của Rozen Spa.
            </p>
            <h3>MASSAGE THEO PHONG CÁCH ROZEN LÀ THẾ NÀO ?</h3>
            <p>
              Massage toàn thân áp dụng những phương pháp xoa bóp đặc biệt kết
              hợp với đá nóng được RoZen Spa thiết kế riêng để mang lại cảm giác
              thoải mái nhất. Đồng thời, việc sử dụng các loại tinh dầu hương
              thơm trị liệu kết hợp bấm huyệt tại những vị trí nhất định còn có
              thể giúp sức khỏe được nâng cao
            </p>
            <p>
              Các nhà nghiên cứu đã chứng minh được rằng các lượng khoáng chất
              trong đá nham thách có tác dụng giảm các cơn đau cũng như giúp
              chúng ta giảm độc tố và thư giãn có thể. Chính vì thế ngày nay mọi
              người thường dung đá nham thạch để sử dụng trong các dịch vụ
              massage được xem như là thần dược để có thể giảm stress hiệu quả.
            </p>
            <p>
              Dựa vào cách kích thích các huyệt đạo nằm dọc theo cột sống, nơi
              lưu thông năng lượng sống. Việc ấn vào các mạch này trong một
              khoảng thời gian nhất định sẽ làm ngưng lại sự lưu chuyển khí, khi
              thả ra sẽ tạo thành dòng khí huyết mạnh mẽ, cuốn trôi đi mọi tắc
              nghẽn trong mạch. Động tác massage từ đầu đến chân tuân theo chiều
              lưu thông tuần hoàn giúp lưu thông khí huyết, các mạch năng lượng
              và bạch huyết. Nó cũng giúp cho cơ thể bạn được thư giãn và khỏe
              hơn để có thể chống lại các bệnh tật, đồng thời cũng là cách giúp
              bạn lấy lại sự thăng bằng rất tốt.
            </p>
            <figure>
              <img
                src="https://rozenspa.vn/wp-content/uploads/2022/04/Shutterstock-626223530-min-scaled.jpg"
                alt=""
              />
            </figure>
            <p>
              Những viên đá mà RoZen sử dụng có xuất sứ hoàn toàn từ thiên
              nhiên, được nhập từ những nơi uy tín nhất, giúp giảm sức ỳ, cân
              bằng trạng thái tâm lý, chống trầm cảm và hỗ trợ điều trị các vấn
              đề về cơ, xương, khớp.
            </p>
            <p>
              Sau khi sử dụng dịch vụ massage toàn than của chúng tôi chắc chắn
              bạn sẽ có một tinh thần thư thái, năng lượng trong cơ thể phục
              hồi, giúp bạn có một trạng thái tốt nhất cho mình !
            </p>
            <p>Để được tư vấn thêm thông tin dịch vụ xin vui lòng liên hệ:</p>
            <p>
              {" "}
              Tư Vấn và Đặt Lịch: (028) 3868.7985 hoặc Hotline 0907.077.268
            </p>
            <p> Địa chỉ: 506/22, Đường 3/2, Phường 14, Quận 10, TPHCM</p>
          </div>
        </div>
        <div className=" right-[700px]  ">
          <div className="border border-[#00502B] rounded-lg">
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

                  {/* Tên */}


                  {/* SĐT */}
                  <Form.Item
                    name={["data", "phoneNumber"]}
                    label="Số điện thoại"
                    rules={[
                      {
                        required: true,
                        pattern: new RegExp(/((09|03|07|08|05)+([0-9]{8})\b)/g),
                        message: "Số điện thoại không đúng định dạng!"
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
                  <Form.Item
                    name={["data", "service"]}
                    label="Dịch vụ "
                    rules={[
                      {
                        // eslint-disable-next-line no-undef
                      },
                    ]}
                  >

                    <Input value={service?._id} placeholder={service?.name} disabled />
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
                      // disabledDate={disabledDate}
                      onChange={onChange1}
                      onOk={onOk}
                    />
                  </Form.Item>

                  {/* chọn nhân viên */}
                  <Form.Item
                    label="Chọn nhân viên"
                    name={["data", "employeeId"]}
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
                    name={["data", "shiftId"]}
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
                          if (itemStaff.date === dateBooking) {
                            if (item._id === itemStaff.shiftId)
                              checkIs = false
                            return
                          }
                        }
                        )
                        if (checkIs)
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
                  <Form.Item name={["data", "note"]} label="Ghi chú">
                    <Input.TextArea />
                  </Form.Item>
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
    </>
  );
};

export default Detaibooking;
