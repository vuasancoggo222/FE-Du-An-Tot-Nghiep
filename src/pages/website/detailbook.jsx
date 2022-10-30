import React, { useEffect, useState } from "react";
import { Button, Form, Input, Select, DatePicker, message, Modal } from "antd";
import useEmployee from "../../hooks/use-employee";
import { httpGetOne } from "../../api/employee";
import { httpAddBooking } from "../../api/booking";
import { useNavigate, useParams } from "react-router-dom";
import { getSerViceBySlug, httpGet } from "../../api/services";
import { TimePicker } from "antd";
import { isAuthenticate } from "../../utils/LocalStorage";
import Formcomment from "../../components/clients/comment";
import { generateCaptcha } from "../../utils/GenerateCaptcha";
import { signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../../firebase/config";
const Detaibooking = (props) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: employees, error } = useEmployee();
  // const [employeeBooking, setEmployeeBooking] = useState();
  const [service, setService] = useState();
  const [formData, setFormData] = useState();
  const [titleModal, setTitleModal] = useState();
  // eslint-disable-next-line react/prop-types
  const [timeReload, setTimeReload] = useState(props.countDown);
  const [titleStatusConfirm, setTitleStatusConfirm] = useState("Vui lòng chờ trong giây lát");
  const [feedback, setFeedback] = useState();
  const format = "HH";
  const user = isAuthenticate();

  // eslint-disable-next-line react/prop-types
  const countDown = props.countDown

  const getValueOtp = (data) => {
    const otp = data.otp
    const confirmationResult = window.confirmationResult
    confirmationResult.confirm(otp).then(async (result) => {
      console.log(result._tokenResponse.idToken);
      const token = result._tokenResponse.idToken
      await httpAddBooking(token, { ...formData, serviceId: service?._id, bookingPrice: service?.price });
      message.success('Đặt lịch thành công', 2)
      navigate('/')

    }).catch((error) => {
      setTitleStatusConfirm("Đặt lịch thất bại, mời thao tác lại sau")
      // eslint-disable-next-line react/prop-types
      props.handleSetCountDown()
      let timeDown = 60
      message.error(`${error.message}`, 2)
      const timerId = setInterval(() => {
        setTimeReload(timeDown - 1)
        if (timeDown == 0) {
          clearInterval(timerId)
          setIsModalOpen(false)
          setTimeReload("")
        }
      }, 1000);

      message.error(`${error.message}`, 2)
    });
  }
  const onSubmit = async (data) => {
    setTitleModal("Mã xác nhận sẽ được gửi về số " + data.phoneNumber)
    setTitleStatusConfirm("Vui lòng chờ trong giây lát")
    await setIsModalOpen(true)
    generateCaptcha()
    let appVerifier = window.recaptchaVerifier
    signInWithPhoneNumber(auth, data.phoneNumber.replace("0", "+84"), appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        message.success('Gửi OTP thành công')
        setTitleStatusConfirm("Mã xác nhận đã gửi thành công")
        console.log('success');
      }).catch((error) => {
        // eslint-disable-next-line react/prop-types
        props.handleSetCountDown()
        setTitleStatusConfirm("Gửi mã xác thực thất bại, mời thao tác lại sau")
        let timeDown = 60
        message.error(`${error.message}`, 2)
        const timerId = setInterval(() => {
          setTimeReload(--timeDown)
          if (timeDown == 0) {
            clearInterval(timerId)
            setIsModalOpen(false)
            setTimeReload("")
          }
        }, 1000);
      });
    setFormData(data)
    // const d = new Date(data.time._d)
    // console.log(d.getHours());
  };
  const onChange = (time, timeString) => {
    console.log(time, timeString);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  // console.log(user);
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

  const onOk = (value) => {
    console.log("onOk: ", value);
  };
  const onChange1 = (value) => {
    console.log("Selected Time: ", value);
  };

  // eslint-disable-next-line no-unused-vars
  const [open, setOpen] = useState(false);
  const onChangeSelected = async (e) => {
    console.log(e);
    // await setEmployeeBooking(employees[e]);
    const employeesOne = await httpGetOne(e);
    console.log(employeesOne);
    // setEmployeeBooking(employeesOne);
    if (!employees) return <div>Loading...</div>;
    if (error) return <div>Failed to loading</div>;
  };
  const onHandleAdd = (value) => {
    console.log("cha:", value);
  };

  useEffect(() => {
    console.log(countDown);
    const getSerVice = async () => {
      const data = await getSerViceBySlug(id);
      const feedbackData = await httpGet("/feedback/service", data._id);
      setFeedback(feedbackData);
      setService(data);
    };
    getSerVice();
    if (countDown > 0) {
      let timeDown = countDown
      const timerId = setInterval(() => {
        // eslint-disable-next-line react/prop-types
        setTimeReload(--timeDown)
        if (timeDown == 0) {
          clearInterval(timerId)
          setTimeReload("")
        }
      }, 1000);
    }else if (localStorage.getItem("countDown")) {
      let timeDown = localStorage.getItem("countDown")
      console.log(timeDown);
      const timerId = setInterval(() => {
        // eslint-disable-next-line react/prop-types
        setTimeReload(--timeDown)
        if (timeDown == 0) {
          clearInterval(timerId)
          setTimeReload("")
          localStorage.removeItem("countDown")
        }
      }, 1000);
    }

   
  }, []);
  return (
    <>
      <div className="bg-[url('https://beautyspa4.shostweb.com/wp-content/uploads/2021/11/cole-keister-8V1gfeaPP1Y-unsplash.jpg')] b-centerg bg-no-repeat bg-cover py-[100px] ">
        <section>
          <div className="text-center text-[#FFF]">
            <h2 className="text-[#FFF] text-[50px]">
              {" "}
              <span className="uppercase text-white font-medium">
                {service?.name}
              </span>
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
                    phoneNumber: user?.phoneNumber,
                    name: user?.name,
                    prefix: "+84",
                  }}
                  onFinish={onSubmit}
                >
                  {/* Tên */}
                  <Form.Item
                    name="name"
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
                    name="phoneNumber"
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
                      style={{
                        width: "100%",
                      }}
                    />
                  </Form.Item>
                  <Form.Item
                    name="service"
                    label="Dịch vụ "
                    rules={[
                      {
                        // eslint-disable-next-line no-undef
                      },
                    ]}
                  >
                    <Input
                      value={service?._id}
                      placeholder={service?.name}
                      readOnly
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
                    name="date"
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
                  <Form.Item label="Chọn nhân viên" name="employeeId">
                    <Select onChange={onChangeSelected}>
                      {employees?.map((item, index) => (
                        <Select.Option value={item._id} key={index}>
                          {item.name}
                          <div
                            className=""
                          // onClick={() => {
                          //   setOpen(true);
                          // }}
                          ></div>
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Form.Item
                    label="Chọn giờ đến"
                    name="time"
                  // rules={[
                  //   {
                  //     required: true,
                  //   },
                  // ]}
                  >
                    {/* <Select onChange={onChangeSelected}>
                      {shift?.map((item, index) => {
                        let checkIs = true;

                        employeeBooking?.timeWork.map((itemStaff) => {
                          if (itemStaff.date === dateBooking) {
                            if (item._id === itemStaff.shiftId) checkIs = false;
                            return;
                          }
                        });
                        if (checkIs)
                          return (
                            <Select.Option value={item._id} key={index}>
                              {item.shiftName +
                                "(" +
                                item.timeStart +
                                "-" +
                                item.timeEnd +
                                ")"}
                              <div
                                className=""
                                // onClick={() => {
                                //   setOpen(true);
                                // }}
                              ></div>
                            </Select.Option>
                          );
                      })}
                    </Select> */}
                    <TimePicker onChange={onChange} format={format} />
                  </Form.Item>
                  {/* chọn ca  */}
                  <Form.Item name="note" label="Ghi chú">
                    <Input.TextArea />
                  </Form.Item>
                  <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                    <Button
                      type="primary"
                      style={{ backgroundColor: "#00502b", border: "none" }}
                      htmlType="submit"
                      disabled={timeReload > 0 ? true : false}
                    >
                      Đặt lịch
                    </Button>
                    <span style={{ color: "red", marginLeft: "5px" }}>{timeReload > 0 ? timeReload + "s" : ""}</span>
                  </Form.Item>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="formcomment w-[1200px] m-auto">
        <div className="">
          <Formcomment serviceId={service?._id} feedbackData={feedback} />
        </div>
      </div>
      <Modal footer={false} title={titleModal} onCancel={handleCancel} open={isModalOpen}>

        <>
          <p style={{ color: titleStatusConfirm == "Mã xác nhận đã gửi thành công" ? "green" : titleStatusConfirm == "Vui lòng chờ trong giây lát" ? "black" : "red" }}>* {titleStatusConfirm + " "}{timeReload != "" ? timeReload + "s" : ""}</p>
          <Form className="mt-10" onFinish={getValueOtp} name="otpvalue">
            <Form.Item
              name="otp" label="Mã xác nhận"
              rules={[
                {
                  required: "true",
                  message: "Bắt buộc nhập"
                }
              ]}
            >
              <Input style={{ width: 'calc(100% - 200px)' }} />
            </Form.Item>
            {/* <Form.Item>
            <Button type="primary" onClick={onGetOtp}>Nhận mã</Button>
          </Form.Item> */}
            <Form.Item>
              <Button success htmlType="submit">Xác thực</Button>
            </Form.Item>
          </Form>
          <div id="recaptcha"></div></>
      </Modal>
    </>
  );
};

export default Detaibooking;
