import React, { useState } from "react";
import EmployeeModal from "../../components/clients/EmployeeModal";
import { Button, Form, Input, InputNumber, Select, DatePicker } from "antd";
import moment from "moment";
import useEmployee from "../../hooks/use-employee";
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

const Detaibooking = () => {
  const { data: employees, error } = useEmployee();
  console.log(employees);
  const onSubmit = (data) => {
    console.log("submit", data.user.name);
  };
  const onChange1 = (value, dateString) => {
    console.log("Selected Time: ", value);
    console.log("Formatted Selected Time: ", dateString);
  };
  const [id, setId] = useState("");
  const [open, setOpen] = useState(false);
  const onChangeSelected = (value) => {
    setId(value);
  };
  const onHandleAdd = (value) => {
    console.log("cha:", value);
  };
  if (!employees) return <div>Loading...</div>;
  if (error) return <div>Failed to loading</div>;
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
                  {/* Email */}
                  <Form.Item
                    name={["user", "email"]}
                    label="Dịch Vụ"
                    rules={[
                      {
                        type: "text",
                        placeholder: "Dịch Vụ Mát Xa",
                      },
                    ]}
                  >
                    <Input />
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
                          {item.name}
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
                    <EmployeeModal id={id} open={open} />
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
      </div>
    </>
  );
};

export default Detaibooking;
