import { Button,  Form, Input } from "antd";
// import { Option } from "antd/lib/mentions";
import React from "react";

const SignUp = () => {
  // const bgSign = {
  //   backgroundImage:
  //     "url('https://res.cloudinary.com/df7kkrfoe/image/upload/v1663306360/aromatherapy-la-gi_wclia9.jpg')",
  // };
  const bgStaff = {
    width: "100%",
    height: "100%",
    backgroundImage:
      "url('https://res.cloudinary.com/df7kkrfoe/image/upload/v1663325104/tac-phong-lam-viec-nhan-vien-spa-1_mfbeu0.jpg')",
    backgroundRepeat: 'no-repeat'
  };
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };
  const layout = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const validateMessages = {
    required: '${label} Không được bỏ trống!',
    types: {
      email: '${label} không đúng định dạng!',
    },
  };
  const texHello = {
    backgroundColor: "white",
    color: "#002200",
    opacity: 0.8
  }
//   const prefixSelector = (
//     <Form.Item name="prefix" noStyle>
//       <Select style={{ width: 70 }}>
//         <Option value="86">+86</Option>
//         <Option value="87">+87</Option>
//       </Select>
//     </Form.Item>
//   );

  return <div>

    <div style={{ height: "350px", width: "100%" }} className=" border-green-600 ... 0 bg-white flex rounded-r-3xl rounded-l-2xl"  >

      <div style={{ width: "40%" }} className="">
        <div className="pt-48 rounded-xl  flex justify-center text-white font-bold text-xl font-mono  ..." width="100px" style={bgStaff}>
          <div >
            <div style={texHello} className="p-2 text-center">Chào bạn đến với Tuyến Spa</div>
            <div style={texHello} className="text-center">Dịch vụ spa uy tín</div>
            <p style={{ backgroundColor: "black" }} className="text-white text-sm text-center mt-5 ..."> Hỗ trợ đăng ký: 012344567</p>
          </div>
        </div>

      </div>
      <div style={{ width: "60%" }} className="flex justify-center  ...">
        <div style={{ width: "100%" }} className="pl-5">
          <h3 className="font-bold text-2xl text-center mt-5 ...">Đăng Ký Tài Khoản</h3>
          <div className="pt-5 p-10">
            <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>

              <Form.Item
                name={['name', 'name']}
                label="Name"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name={['email', 'email']}
                label="Email"
                rules={[
                  {
                    type: 'email',
                    required: true
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                 name={['phone']}
                 label="Number Phone"
                rules={[{
                  required: true,
                  pattern: new RegExp(/((09|03|07|08|05)+([0-9]{8})\b)/g),
                  message:"Số điện thoại không đúng định dạng!"
                }]}
              >
                <Input/>
              </Form.Item>
              <Form.Item
                name={['password', 'password']}
                label="Password"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input.Password />

              </Form.Item>


              <Form.Item
                wrapperCol={{
                  offset: 6,
                  span: 16,
                }}
              >
                <Button type="primary" htmlType="submit">
                  Đăng ký
                </Button>
              </Form.Item>

            </Form>
          </div>
        </div>
      </div>
    </div>
  </div>


};

export default SignUp;