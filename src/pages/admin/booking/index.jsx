/* eslint-disable react/no-unknown-property */
import React, { useState } from "react";
import { Button, Modal, Space, Table, Tag, Tooltip } from 'antd';
const ListBooking = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [titleModal] = useState("Xác nhận khách hàng");
  
    const showModal = async () => {
        await setIsModalOpen(true);
    
    };

    const handleOk = async () => {
        setIsModalOpen(false);
     
    };

  

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Phone',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Ngày',
            dataIndex: 'date',
            key: 'date',
            render: (data) => <a>{data}</a>,
        },
        {
            title: 'Ca',
            dataIndex: 'shiftId',
            key: 'shiftId',
        },
        {
            title: 'Nhân viên',
            dataIndex: 'employeeId',
            key: 'employeeId',

        },
        {
            title: 'Dịch vụ',
            dataIndex: 'serviceId',
            key: 'serviceId',
        },
        {
            title: 'Status',
            key: 'status',
            dataIndex: 'status',
            render: (status) => {
                let key = "Chờ xác nhận";
                let color = "volcano"
                if (status === 0) {
                    true
                } else if (status === 1) {
                    key = "Đã xác nhận"
                    color = "blue"
                }
                else if (status === 2) {
                    key = "Hủy"
                    color = "Silver"
                } else if (status === 3) {
                    key = "Hoàn thành"
                    color = "green"
                } else {
                    key = "Khách không đến"
                    color = "Red"
                }
                return (
                    <Tag color={color} key={key}>
                        {key.toUpperCase()}
                    </Tag>
                )
            }
        },
        {
            title: 'Action',
            dataIndex: "action",
            key: 'action',
            render: (id) => (
                <Space size="middle">
                    <Tooltip title="Xác nhận">
                        <Button style={{ border: "none" }} shape="circle" ><i style={{ fontSize: "25px", color: "blue" }} onClick={showModal} dataId={id} data="success" class="far fa-check-circle"></i></Button>
                    </Tooltip>
                    <Tooltip title="Hủy">
                        <Button style={{ border: "none" }} shape="circle" ><i style={{ fontSize: "25px", color: "red" }} onClick={showModal} dataId={id} data="failure" class="far fa-times-circle"></i></Button>
                    </Tooltip>
                    <Tooltip title="Chờ xác nhận">
                        <Button style={{ border: "none" }} shape="circle" >
                            <i style={{ fontSize: "25px", color: "Gray" }} onClick={showModal} dataId={id} data="wait" class="fas fa-info-circle"></i>
                        </Button>
                    </Tooltip>

                </Space>
            ),
        },
    ];
    const data = [
        {
            "_id": "6335b6a7fd266b3cca1203a2",
            "name": "Vu chiu",
            "phoneNumber": "0347378693",
            "note": "hehe",
            "status": 0,
            "date": 20220930,
            "shiftId": {
              "_id": "6329f29881117054d459f8d6",
              "shiftName": "Ca 2",
              "timeStart": "9:20",
              "timeEnd": "10:20"
            },
            "employeeId": {
              "_id": "632e853433bb1bbd4bb1cf57",
              "name": "Lê Trọng Vũ",
              "email": "levu@gmail.com",
              "phoneNumber": "0384765293",
              "status": 1,
              "gender": 0,
              "timeWork": [
                {
                  "date": 20220930,
                  "shiftId": "6329f29881117054d459f8d6",
                  "status": 0,
                  "_id": "6335b6a7fd266b3cca1203a5"
                }
              ],
              "createdAt": "2022-09-24T04:19:00.754Z",
              "updatedAt": "2022-09-29T15:15:51.588Z",
              "__v": 0
            },
            "serviceId": {
              "_id": "632e7e9ad0933c8c06926642",
              "name": "Combo SPA 001",
              "description": "Các chuyên viên da liễu trực tiếp thăm khám, soi da và đề xuất các phương pháp điều trị phù hợp để mang lại hiệu quả cao nhất. Không chỉ vậy, bạn còn trải nghiệm nhiều dịch vụ với công nghệ hiện đại, tiên tiến nhất cùng mức giá siêu hời.",
              "price": 400000,
              "status": 1,
              "createdAt": "2022-09-24T03:50:50.545Z",
              "updatedAt": "2022-09-24T03:50:50.545Z",
              "__v": 0
            },
            "createdAt": "2022-09-29T15:15:51.499Z",
            "updatedAt": "2022-09-29T15:15:51.499Z",
            "__v": 0
          },{
            "_id": "6335b6a7fd266b3cca1203a2",
            "name": "Vu chiu",
            "phoneNumber": "0347378693",
            "note": "hehe",
            "status": 0,
            "date": 20220930,
            "shiftId": {
              "_id": "6329f29881117054d459f8d6",
              "shiftName": "Ca 2",
              "timeStart": "9:20",
              "timeEnd": "10:20"
            },
            "employeeId": {
              "_id": "632e853433bb1bbd4bb1cf57",
              "name": "Lê Trọng Vũ",
              "email": "levu@gmail.com",
              "phoneNumber": "0384765293",
              "status": 1,
              "gender": 0,
              "timeWork": [
                {
                  "date": 20220930,
                  "shiftId": "6329f29881117054d459f8d6",
                  "status": 0,
                  "_id": "6335b6a7fd266b3cca1203a5"
                }
              ],
              "createdAt": "2022-09-24T04:19:00.754Z",
              "updatedAt": "2022-09-29T15:15:51.588Z",
              "__v": 0
            },
            "serviceId": {
              "_id": "632e7e9ad0933c8c06926642",
              "name": "Combo SPA 001",
              "description": "Các chuyên viên da liễu trực tiếp thăm khám, soi da và đề xuất các phương pháp điều trị phù hợp để mang lại hiệu quả cao nhất. Không chỉ vậy, bạn còn trải nghiệm nhiều dịch vụ với công nghệ hiện đại, tiên tiến nhất cùng mức giá siêu hời.",
              "price": 400000,
              "status": 1,
              "createdAt": "2022-09-24T03:50:50.545Z",
              "updatedAt": "2022-09-24T03:50:50.545Z",
              "__v": 0
            },
            "createdAt": "2022-09-29T15:15:51.499Z",
            "updatedAt": "2022-09-29T15:15:51.499Z",
            "__v": 0
          },
          {
            "_id": "6335b6a7fd266b3cca1203a2",
            "name": "Vu chiu",
            "phoneNumber": "0347378693",
            "note": "hehe",
            "status": 0,
            "date": 20220930,
            "shiftId": {
              "_id": "6329f29881117054d459f8d6",
              "shiftName": "Ca 2",
              "timeStart": "9:20",
              "timeEnd": "10:20"
            },
            "employeeId": {
              "_id": "632e853433bb1bbd4bb1cf57",
              "name": "Lê Trọng Vũ",
              "email": "levu@gmail.com",
              "phoneNumber": "0384765293",
              "status": 1,
              "gender": 0,
              "timeWork": [
                {
                  "date": 20220930,
                  "shiftId": "6329f29881117054d459f8d6",
                  "status": 0,
                  "_id": "6335b6a7fd266b3cca1203a5"
                }
              ],
              "createdAt": "2022-09-24T04:19:00.754Z",
              "updatedAt": "2022-09-29T15:15:51.588Z",
              "__v": 0
            },
            "serviceId": {
              "_id": "632e7e9ad0933c8c06926642",
              "name": "Combo SPA 001",
              "description": "Các chuyên viên da liễu trực tiếp thăm khám, soi da và đề xuất các phương pháp điều trị phù hợp để mang lại hiệu quả cao nhất. Không chỉ vậy, bạn còn trải nghiệm nhiều dịch vụ với công nghệ hiện đại, tiên tiến nhất cùng mức giá siêu hời.",
              "price": 400000,
              "status": 1,
              "createdAt": "2022-09-24T03:50:50.545Z",
              "updatedAt": "2022-09-24T03:50:50.545Z",
              "__v": 0
            },
            "createdAt": "2022-09-29T15:15:51.499Z",
            "updatedAt": "2022-09-29T15:15:51.499Z",
            "__v": 0
          }
    ]
  
    return <div className="w-full px-6 py-6 mx-auto">
        <div>
            <h1 className="mb-0 font-bold text-white capitalize pb-[20px] text-center text-[50px]">
                List Booking
            </h1>
        </div>

        <Table columns={columns} dataSource={data} />;

        <Modal style={{ fontFamily: "revert-layer" }} title={titleModal} 
        open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
         
        </Modal>
    </div>;
};
export default ListBooking;