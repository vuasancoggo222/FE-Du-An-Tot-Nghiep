import { Button, Form, Input, Upload, Select, message, Row, Col } from "antd";
import React, { useEffect, useState } from "react";
import { httpUpdateEmployees, httpGetOne } from "../../../api/employee";
import { useParams } from "react-router-dom";
import { InboxOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import ImgCrop from 'antd-img-crop';
import { uploadCloudinary } from "../../../api/upload";
const { Option } = Select;

const EditEmployee = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [form] = Form.useForm();

  const onSubmit = async (data) => {
    var res = await httpUpdateEmployees(id, data);
    if (res._id !== undefined) {
      message.success("Add employee success", 4);
      navigate("/admin/employee");
    }
  };

  const [fileList, setFileList] = useState([]);
  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };  
  useEffect(() => {
    const reloadData = async (id) => {
      var res = await httpGetOne(id);
      console.log(res);
     
      setFileList([{url : res.avatar}])
      form.setFieldsValue({
        name: res.name,
        image : res.image,
        email : res.email,
        idCard : res.idCard,
        phoneNumber : res.phoneNumber,
        avatar : res.avatar,
        status : res.status
      });
    };
    reloadData(id);
  }, []);

  const uploadImage = async (options) => {
    const { onSuccess, onError, file } = options;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "my_upload");
    try {
      const res = await uploadCloudinary(formData);
      onSuccess("Ok");
      message.success("Upload successfully !");
      console.log("server res: ", res);
      setUrl(res.data.secure_url);
    } catch (err) {
      onError({ err });
    }
  };
  const onFinish = async (data) => {
    const dataPost = { ...data, avatar: url };
    await onSubmit(dataPost);

    console.log(dataPost);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };


  return (
    <>
      <div className="w-[1200px] px-6 py-6 m-auto">
        <div>
          <h1 className="w-full text-center mb-0 font-bold text-white capitalize pb-[20px]  text-[50px]">
            <div>Add New Employee</div>
          </h1>
        </div>
      </div>

      <div className=" px-6 py-6 ml-[30px]  ">
        <div className="mt-[150px] my-[20px]"></div>
        <Form
          className="m-auto text-center"
          form={form}
          name="basic"
          labelCol={{ span: 4, offset: 5 }}
          wrapperCol={{ span: 15, offset: 5 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
        >
          {/* name */}
          <Row gutter={[4, 4]}>
            <Col xxl={24} xl={24} sm={24} xs={24}>
              <Form.Item
                label="Username"
                name="name"
                rules={[
                  { required: true, message: "Please input your username !" },
                ]}
              >
                <Input type="text" />
              </Form.Item>
            </Col>
          </Row>
          {/* Number Phone */}
          <Form.Item
            name="phoneNumber"
            label="phoneNumber"
            rules={[
              { required: true, message: "Please input your phone number !" },
            ]}
          >
            <Input type="text" />
          </Form.Item>
          {/* Id Card */}
          <Form.Item
            label="Id Card"
            name="idCard"
            rules={[{ required: true, message: "Please input your id card !" }]}
          >
            <Input type="text" />
          </Form.Item>
          {/* Email */}
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email !" }]}
          >
            <Input type="text" />
          </Form.Item>
          {/* Gender */}
          <Form.Item
            name="gender"
            label="Gender"
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please select your gender",
              },
            ]}
          >
            <Select placeholder="Please select a gender">
              <Option value={0}>Nam</Option>
              <Option value={1}>Nữ</Option>
            </Select>
          </Form.Item>
          {/* Avater */}
          <Form.Item label="image">
<ImgCrop>
<Upload
        customRequest={uploadImage}
        listType="picture-card"
        fileList={fileList}
        onChange={onChange}
        name="avatar"
  
      >
        {fileList.length < 1 && '+ Upload'}
      </Upload>
</ImgCrop>
      </Form.Item>
          <Form.Item>
            

            <Form.Item wrapperCol={{ offset: 10, span: 5 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default EditEmployee;
