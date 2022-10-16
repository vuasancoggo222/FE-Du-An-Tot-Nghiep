import React from "react";
import { Button, Form, Input, message } from "antd";
import { useNavigate } from 'react-router-dom';
import { login } from '../../api/user';

const SignIn = (props) => {
  
  const navigate = useNavigate()
  const layout = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const bgStaff = {
    width: "100%",
    height: "100%",
    backgroundImage:
      "url('https://res.cloudinary.com/df7kkrfoe/image/upload/v1663325104/tac-phong-lam-viec-nhan-vien-spa-1_mfbeu0.jpg')",
    backgroundRepeat: 'no-repeat'
  };
  const onFinish = async (values) => {
    const userValues = {
      phoneNumber: values.phoneNumber.phoneNumber,
      password: values.password.password
    }
    console.log(values.phoneNumber.phoneNumber, values.password.password);
    try {
      const data = await login(userValues)
      console.log(data);
      localStorage.setItem('user', JSON.stringify(data))
      message.success('Đăng nhập thành công')
      navigate('/')
    } catch (error) {
      message.error(`${error.message}`, 2)
    }
  };
  const validateMessages = {
    required: '${label} Không được bỏ trống!',
    types: {
      text: '${label} không đúng định dạng!',
    },
  };
  const texHello = {
    backgroundColor: "white",
    color: "#002200",
    opacity: 0.8
  }
  return <div>
    <div style={{ height: "320px", width: "100%" }} className=" border-green-600 ... 0 bg-white flex rounded-r-3xl rounded-l-2xl"  >

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
          <h3 className="font-bold text-2xl text-center mt-5 ...">Đăng nhập</h3>
          <div className="pt-8 p-10">
            <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>

              <Form.Item
                name={['phoneNumber', 'phoneNumber']}
                label="Phone"
                rules={[
                  {
                    type: 'text',
                    required: true
                  },
                ]}
              >
                <Input />
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
              {/* <Form.Item
                name="remember"
                valuePropName="checked"
                wrapperCol={{
                  offset: 6,
                  span: 16,
                }}
              >
                <Checkbox>Remember me</Checkbox>
              </Form.Item> */}

              <Form.Item
                wrapperCol={{
                  offset: 6,
                  span: 16,
                }}
              >
                <Button onClick={(() => {
                  // eslint-disable-next-line react/prop-types
                  props.handleSignIn()
                })} type="primary" htmlType="submit">
                  Đăng nhập
                </Button>
              </Form.Item>

            </Form>
          </div>
        </div>
      </div>
    </div>
  </div>

};

export default SignIn;