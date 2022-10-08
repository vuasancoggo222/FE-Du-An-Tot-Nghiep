import React from 'react';
import {
    DownOutlined,
    ArrowLeftOutlined,
    ArrowRightOutlined,
} from '@ant-design/icons';
import {
    Button,
    Form,
    Input,
    Row,
    Col,
    Dropdown,
    Menu,
    Space,
    Typography,
    Select,
} from 'antd';

const menu = (
    <Menu
        selectable
        defaultSelectedKeys={['3']}
        items={[
            {
                key: '1',
                label: 'Item 1',
            },
            {
                key: '2',
                label: 'Item 2',
            },
            {
                key: '3',
                label: 'Item 3',
            },
        ]}
    />
);

function AddNewEmployee() {
    const [form] = Form.useForm();
    const onFinish = (values) => {
        console.log('Success:', values);
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
                                                    name=''
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
                                                    name=''
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
                                                    name=''
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
                                                    name=''
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
                                            Submit
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

export default AddNewEmployee;
