/* eslint-disable no-undef */
/* eslint-disable react/no-unknown-property */
import React, { useState } from "react";
import { Button, message, Modal, Space, Table, Tag, Tooltip } from 'antd';
import { httpGetChangeStatus } from "../../../api/booking";
import { httpChangeStatusTimeWork } from "../../../api/employee";
const ListBooking = (props) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [titleModal, setTitleModal] = useState("Xác nhận khách hàng");
    const [handleBooking, setHandleBooking] = useState();
    const [ishandle, setIshandle] = useState();
    // eslint-disable-next-line react/prop-types
    const booking = props.dataBooking

    const showModal = (e) => {
        // eslint-disable-next-line react/prop-types
        const isButon = e.target.getAttribute("data");
        const idBooking = e.target.getAttribute("dataId");
        // eslint-disable-next-line react/prop-types
        booking.map(async (item, index) => {
            if (index == idBooking) {
                if (item.status == isButon) {
                    return
                }
                await setIsModalOpen(true);
            }
        })


        console.log(idBooking);
        // const res = await httpGetOne(idBooking)
        // eslint-disable-next-line react/prop-types
        booking.map((item, index) => {
            if (index == idBooking) {
                setHandleBooking(item)
                console.log(item);
                return
            }
        })
        setIshandle(isButon)
        if (isButon === "1") {
            return
        } else if (isButon === "2") {
            setTitleModal("Hủy khách hàng")
        } else {
            setTitleModal("Chờ xác nhận")
        }
    };

    // eslint-disable-next-line no-unused-vars
    const handleOk = async () => {
        setIsModalOpen(false);
        console.log(ishandle);
        if (ishandle === "1") {
            try {
                await httpGetChangeStatus(handleBooking._id, { status: 1 })
                await httpChangeStatusTimeWork(handleBooking.employeeId._id, handleBooking.date, handleBooking.shiftId._id, { status: 1 })
                message.success(`Xác nhận khách hàng "${handleBooking.name}"`)
            } catch (error) {
                message.error(`${error.response.data.message}`)
            }
        } else if (ishandle === "2") {
            try {
                await httpGetChangeStatus(handleBooking._id, { status: 2 })
                await httpChangeStatusTimeWork(handleBooking.employeeId._id, handleBooking.date, handleBooking.shiftId._id, { status: 2 })
                message.success(`Hủy khách hàng "${handleBooking.name}"`)
            } catch (error) {
                message.error(`${error.response.data.message}`)
            }
        } else {
            try {
                await httpGetChangeStatus(handleBooking._id, { status: 0 })
                await httpChangeStatusTimeWork(handleBooking.employeeId._id, handleBooking.date, handleBooking.shiftId._id, { status: 0 })
                message.success(`Reset chờ khách hàng "${handleBooking.name}"`)
            } catch (error) {
                message.error(`${error.response.data.message}`)
            }
        }
        // eslint-disable-next-line react/prop-types
        props.handleChangeStatus();
    };

    const showtime = (data) => {
        const str = data.toString()
        return str.substring(0, 4) + "-" + str.substring(4, 6) + "-" + str.substring(6, 8)
    }

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Phone',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
        },
        {
            title: 'Ngày',
            dataIndex: 'date',
            key: 'date',

            render: (data) => <span>{showtime(data)}</span>,

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
            render: (status, item, index) => {
                console.log(item);
                // chờ
                let BtWaitCursor
                let BtWaitColor = "#06060a"
                // xác nhận
                let BtSusscesCursor
                let BtSusscessColor = "blue"
                // hủy
                let BtFailureCursor
                let BtFailureColor = "red"

                if (item.status === 0) {
                    // chờ
                    BtWaitCursor = "not-allowed"
                    BtWaitColor = "gray"
                } else if (item.status === 1) {
                    // xác nhận
                    BtSusscesCursor = "not-allowed"
                    BtSusscessColor = "gray"
                } else if (item.status === 2) {
                    // hủy
                    BtFailureCursor = "not-allowed"
                    BtFailureColor = "gray"
                }
                return (
                    <Space size="middle">
                        <Tooltip title="Xác nhận">
                            <Button style={{ border: "none", cursor: BtSusscesCursor, color: BtSusscessColor }} shape="circle" ><i style={{ fontSize: "25px" }} onClick={showModal} dataId={index} data="1" class="far fa-check-circle"></i></Button>
                        </Tooltip>
                        <Tooltip title="Hủy">
                            <Button style={{ border: "none", cursor: BtFailureCursor, color: BtFailureColor }} shape="circle" ><i style={{ fontSize: "25px" }} onClick={showModal} dataId={index} data="2" class="far fa-times-circle"></i></Button>
                        </Tooltip>
                        <Tooltip title="Chờ xác nhận">
                            <Button style={{ border: "none", cursor: BtWaitCursor, color: BtWaitColor }} shape="circle" >
                                <i style={{ fontSize: "25px" }} onClick={showModal} dataId={index} data="0" class="fas fa-info-circle"></i>
                            </Button>
                        </Tooltip>

                    </Space>
                )
            },
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
            employeeId: item.employeeId.name,
            serviceId: item.serviceId.name,
            action: (index, item.status, index)
        }})
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
            <p>Note: {handleBooking?.note}</p>
        </Modal>
    </div>;
};
export default ListBooking;