import React from 'react';
import { ArrowRightOutlined } from '@ant-design/icons';
import { Button, Form, Input, Row, Col, Space, message } from 'antd';
import { httpAddContact } from '../../api/contact';
import { useNavigate } from "react-router-dom"

function Contact() {
    const navigate = useNavigate()
    const onSubmit = async (data) => {
        var res = await httpAddContact(data)
        if (res._id !== undefined) {
            message.success("Add contact success")
        }
        navigate("/contact")
    }
    const onFinish = async (data) => {
        const dataPost = { ...data }
        await onSubmit(dataPost)
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };


    return (
        <React.Fragment>
            <div>
                <div className='register-wrapper'>
                    <div className='register-right'>
                        <div className='form-wrapper'>
                            <Form
                                name='basic'
                                onFinish={onFinish}
                                onFinishFailed={onFinishFailed}
                                autoComplete='off'
                                layout='vertical'

                            >
                                <Row gutter={[4, 8]}>
                                    <Col xxl={24} xl={24} sm={24} xs={24}>
                                        <Row>
                                            <Col xxl={24} xl={10} sm={10} xs={10}>
                                                <Form.Item
                                                    label='Your Name'
                                                    name='name'
                                                    rules={[
                                                        { required: true, message: "Please input your name !" },
                                                    ]}
                                                    style={{ marginRight: '10px' }}
                                                >
                                                    <Input
                                                        placeholder='Your Name'
                                                        className='form-input'
                                                    />
                                                    
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xxl={24} xl={10} sm={10} xs={10}>
                                                <Form.Item
                                                    label='Your Address'
                                                    name='address'
                                                     rules={[
                                                        { required: true, message: "Please input your address !" },
                                                    ]}
                                                    style={{ marginRight: '10px' }}
                                                >
                                                    <Input
                                                        placeholder='Your Address'
                                                        className='form-input'
                                                    />
                                                   
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xxl={24} xl={10} sm={10} xs={10}>
                                                <Form.Item
                                                    label='Your Context'
                                                    name='content'
                                                    rules={[
                                                        { required: true, message: "Please input your content !" },
                                                    ]}
                                                    style={{ marginRight: '10px' }}
                                                >
                                                    <Input
                                                        placeholder='Your Context'
                                                        className='form-input'
                                                    />
                                                    
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xxl={24} xl={10} sm={10} xs={10}>
                                                <Form.Item
                                                    label='Your PhoneNumber'
                                                    name='phoneNumber'
                                                    rules={[
                                                        { required: true, message: "Please input your phone number !" },
                                                    ]}
                                                    style={{ marginRight: '10px' }}
                                                >
                                                    <Input
                                                        placeholder='Your PhoneNumber'
                                                        className='form-input'
                                                    />
                                                    
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                                <Form.Item>
                                    <Space className='space'>
                                        <Button htmlType='submit' className='btn-submit'>
                                            Thêm
                                            <ArrowRightOutlined />
                                        </Button>
                                    </Space>
                                </Form.Item>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Contact;
