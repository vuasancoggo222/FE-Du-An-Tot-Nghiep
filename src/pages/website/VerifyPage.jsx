import { Button, Form, Input, message, Select } from 'antd'
import { Option } from 'antd/lib/mentions';
import React, { useState } from 'react'
import { Typography } from 'antd';
const { Title } = Typography;
import {auth} from '../../firebase/config'
import { signInWithPhoneNumber  } from "firebase/auth";
import { useLocation, useNavigate } from 'react-router-dom';
import { changeAccountStatus } from '../../api/user';
import { generateCaptcha } from '../../utils/GenerateCaptcha';
function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
  }
const VerifyPage = () => {
    let query = useQuery();
    const phoneNumber = query.get("phone")
    const prefix = query.get("prefix")
    console.log(phoneNumber,prefix);
    const navigate = useNavigate()
    const [isSend,setIsSend] = useState(false)
    const [showInput,setShowInput] = useState(false)
    const [form] = Form.useForm();  
    const [form2] = Form.useForm()  
    const formItemLayout = {
        labelCol: {
          xs: {
            span: 12,
          },
          sm: {
            span:8,
          },
        },
        wrapperCol: {
          xs: {
            span: 24,
          },
          sm: {
            span: 8,
          },
        },
      };
    
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
        const phoneNumber = `+${values.prefix}${values.phone}`
            setShowInput(true)
            setTimeout(() => {
              setIsSend(true)
            }, 1000);
            generateCaptcha()
            let appVerifier =  window.recaptchaVerifier
            signInWithPhoneNumber(auth, phoneNumber, appVerifier)
            .then((confirmationResult) => {
             window.confirmationResult = confirmationResult;
             message.success('Gửi OTP thành công')
}).catch((error) => {
        message.error(`${error.message}`,2)
    });
     
      };
      const onVerify = (values) => {
        const otp = values.otp
        const confirmationResult = window.confirmationResult
        confirmationResult.confirm(otp).then(async (result) => {
            console.log(result._tokenResponse.idToken);
            const token = result._tokenResponse.idToken
            message.success('Xác thực OTP thành công.',2)
            const phoneNumber = result.user.phoneNumber.substring(1)
            await changeAccountStatus(phoneNumber,1,token)
            navigate('/')
          }).catch((error) => {
            message.error(`${error.message}`,2)
          });
      };
      const prefixSelector = (
        <Form.Item name="prefix" noStyle>
          <Select
            style={{
              width: 70,
            }}
          >
            <Option value={prefix}>+{prefix}</Option>
          </Select>
        </Form.Item>
      );
  return (
    <>
         <Title level={2}>Xác thực Otp</Title>
         <Form
      {...formItemLayout}
      form={form}
      name="phoneNumber"
      onFinish={onFinish}
      initialValues={
        {prefix : prefix,phone : phoneNumber}
      }
      scrollToFirstError
    >
        <Form.Item
        name="phone"
        label="Số điện thoại">
        <Input addonBefore={prefixSelector} style={{ width: '80%' }} readOnly/>
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8, span: 6 }}>
        {isSend ? <><span>Chưa nhận được mã xác nhận ? <Button type="link" primary htmlType="submit">
         Gửi lại 
        </Button> </span></> : <Button type="primary" htmlType="submit">
          Nhận mã xác nhận 
        </Button>}
      </Form.Item>
    </Form>
      {showInput ?  <Form
      {...formItemLayout}
      form={form2}
      name="verify"
      onFinish={onVerify}
    >       <Form.Item  name="otp" wrapperCol={{ offset: 0, span: 2 }} label="Mã xác thực">
        <Input  minLength={6} maxLength={6}/>
            </Form.Item>
           <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Xác thực 
        </Button>
      </Form.Item>
    </Form> : <></>}
    <div id="recaptcha"></div>
    </>
  )
}

export default VerifyPage