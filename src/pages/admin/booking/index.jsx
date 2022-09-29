/* eslint-disable react/no-unknown-property */
import React, { useState } from "react";
import { Button, Modal, Space, Table, Tag, Tooltip } from 'antd';
import { httpGetChangeStatus } from "../../../api/booking";
const ListBooking = (props) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [titleModal, setTitleModal] = useState("Xác nhận khách hàng");
    const [handleBooking, setHandleBooking] = useState();
    const [ishandle, setIshandle] = useState();
    // eslint-disable-next-line react/prop-types
    const booking = props.dataBooking
    
    const showModal = async (e) => {
        await setIsModalOpen(true);
        const isButon = e.target.getAttribute("data");
        const idBooking = e.target.getAttribute("dataId");
        console.log(idBooking);
        // const res = await httpGetOne(idBooking)
        // eslint-disable-next-line react/prop-types
        booking.map((item, index) => {
            if(index == idBooking) {
                setHandleBooking(item)
                console.log(item);
                return 
            }
        })
        setIshandle(isButon)
        if (isButon === "success") {
            return
        } else if(isButon === "failure") {
            setTitleModal("Hủy khách hàng")
        }else{
            setTitleModal("Chờ xác nhận")
        }
    };

    const handleOk = async () => {
        setIsModalOpen(false);
        console.log(ishandle);
        if (ishandle === "success") {
            await httpGetChangeStatus(handleBooking._id, { status: 1 })
        } else if (ishandle === "failure") {
            await httpGetChangeStatus(handleBooking._id, { status: 2 })
        }else{
            await httpGetChangeStatus(handleBooking._id, { status: 0 })
        }
        // eslint-disable-next-line react/prop-types
        props.handleChangeStatus();
    };

    const showtime = (data) => {    
        const str = data.toString()
        return str.substring(0,4) + "-" + str.substring(4,6) + "-" +str.substring(6,8)
    }

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
            render: (data) => <a>{showtime(data)}</a>,
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

    // eslint-disable-next-line react/prop-types
    const datatable = booking?.map((item, index) => {
        return {
            name: item.name,
            phoneNumber: item.phoneNumber,
            status: item.status,
            date: item.date,
            shiftId: item.shiftId.shiftName,
            employeeId:item.employeeId.name,
            serviceId: item.serviceId.name,
            action: index
        }
    })
    return <div className="w-full px-6 py-6 mx-auto">
        <div>
            <h1 className="mb-0 font-bold text-white capitalize pb-[20px] text-center text-[50px]">
                List Booking
            </h1>
        </div>

        <Table columns={columns} dataSource={datatable} />;

        <Modal style={{ fontFamily: "revert-layer" }} title={titleModal} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <p>Tên Khách hàng: {handleBooking?.name}</p>
            <p>Số điện thoại: {handleBooking?.phoneNumber}</p>
            <p>Ngày: {handleBooking?.date}</p>
            <p>Giờ: {handleBooking?.shiftId.shiftName}</p>
            <p>Nhân viên: {handleBooking?.employeeId.name}</p>
            <p>Dịch vụ: {handleBooking?.serviceId.name}</p>
        </Modal>
    </div>;
};
export default ListBooking;