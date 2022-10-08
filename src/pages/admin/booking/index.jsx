/* eslint-disable no-undef */
/* eslint-disable react/no-unknown-property */
import React, { useRef, useState } from "react";
import { SearchOutlined } from '@ant-design/icons';
import { Button, DatePicker, Input, message, Modal, Space, Table, Tag, Tooltip } from 'antd';
import { httpGetChangeStatus } from "../../../api/booking";
import Highlighter from 'react-highlight-words';
import { httpChangeStatusTimeWork } from "../../../api/employee";
const ListBooking = (props) => {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [titleModal, setTitleModal] = useState("Xác nhận khách hàng");
    const [handleBooking, setHandleBooking] = useState();
    const [ishandle, setIshandle] = useState();
    const [dateFilter, setDateFilter] = useState();
    // eslint-disable-next-line react/prop-types
    const booking = props.dataBooking
    // eslint-disable-next-line react/prop-types
    const employee = props.dataEmployy?.map((item) => {
        return {
            text: item.name,
            value: item.name,
        }
    })
    // eslint-disable-next-line react/prop-types
    const service = props.dataService?.map((item) => {
        return {
            text: item.name,
            value: item.name,
        }
    })
    // eslint-disable-next-line react/prop-types
  
    // eslint-disable-next-line react/prop-types
    console.log(props);
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const onOk = (value) => {
        // console.log("...."+ employeeBooking);

        console.log("onOk: ", value);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };
    const onChange1 = (value, dateString) => {
        setDateFilter([
            {
                text: Number(dateString.replace("-", "").replace("-", "")),
                value: Number(dateString.replace("-", "").replace("-", ""))
            }
        ])
        console.log(dateFilter)
       
    };
    const btn = document.querySelectorAll(".ant-checkbox-input");
    console.log(btn);
    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div
                style={{
                    padding: 8,
                }}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({
                                closeDropdown: false,
                            });
                            setSearchText(selectedKeys[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1890ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: '#ffc069',
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    const showModal = (e) => {
        // eslint-disable-next-line react/prop-types
        const isButon = e.target.getAttribute("data");
        const idBooking = e.target.getAttribute("dataId");
        console.log(idBooking);
        // eslint-disable-next-line react/prop-types
        booking.map(async (item) => {
            if (item._id == idBooking) {
                if (item.status == isButon) {
                    return
                }
                await setIsModalOpen(true);
            }
        })

        // eslint-disable-next-line react/prop-types
        booking.map(async (item) => {
            if (item._id == idBooking) {
                await setHandleBooking(item)
                console.log(item);
                return
            }
        })
        setIshandle(isButon)
        if (isButon === "1") {
            setTitleModal("Đã xác nhận")
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

    console.log(btn);
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            ...getColumnSearchProps('name'),
        },
        {
            title: 'Phone',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
            ...getColumnSearchProps('phoneNumber')
        },
        {
            title: <span > <DatePicker
                // disabledDate={disabledDate}
                onChange={onChange1}
                onOk={onOk}
            />

            </span>,
            dataIndex: 'date',
            key: 'date',
            render: (data) => <span>{showtime(data)}</span>,
            filters: dateFilter,
            onFilter: (value, record) => record.date.toString().indexOf(value) === 0,
        },
        {
            title: 'Ca',
            dataIndex: 'shiftId',
            key: 'shiftId',
            filters: shift,
            onFilter: (value, record) => record.shiftId.indexOf(value) === 0,
        },
        {
            title: 'Nhân viên',
            dataIndex: 'employeeId',
            key: 'employeeId',
            filters: employee,
            onFilter: (value, record) => record.employeeId.indexOf(value) === 0,
        },
        {
            title: 'Dịch vụ',
            dataIndex: 'serviceId',
            key: 'serviceId',
            filters: service,
            onFilter: (value, record) => record.serviceId.indexOf(value) === 0,
        },
        {
            title: 'Status',
            key: 'status',
            dataIndex: 'status',
            filters: [
                {
                    text: 'Chờ xác nhận',
                    value: '0',
                },
                {
                    text: 'Đã xác nhận',
                    value: '1',
                },
                {
                    text: 'Hủy',
                    value: '2',
                },
                {
                    text: 'Đang diễn ra',
                    value: '3',
                },
                {
                    text: 'Hoàn thành',
                    value: '4',
                },
                {
                    text: 'Khách không đến',
                    value: '5',
                }
            ],
            onFilter: (value, record) => record.status.toString().indexOf(value) === 0,
            render: (status) => {
                let key = "Chờ xác nhận";
                let color = "#e4ed36"
                if (status === 0) {
                    true
                } else if (status === 1) {
                    key = "Đã xác nhận"
                    color = "blue"
                }
                else if (status === 2) {
                    key = "Hủy"
                    color = "red"
                } else if (status === 3) {
                    key = "Đang diễn ra"
                    color = "#da0cc8"
                } else if (status === 4) {
                    key = "Hoàn thành"
                    color = "#69c20a"
                }
                else {
                    key = "Khách không đến"
                    color = "#bc0808"
                }
                return (
                    <Tag color={color} key={key}>
                        {key.toUpperCase()}
                    </Tag>
                )

            },

        },
        {
            title: 'Action',
            dataIndex: "action",
            key: 'action',
            render: (item) => {
                // chờ
                let BtWaitCursor
                let BtWaitColor = "#e4ed36"
                // xác nhận
                let BtSusscesCursor
                let BtSusscessColor = "blue"
                // hủy
                let BtFailureCursor
                let BtFailureColor = "red"

                if (item.status === 0) {
                    // chờ
                    BtWaitCursor = "not-allowed"
                    BtWaitColor = "#f9f6f6"
                } else if (item.status === 1) {
                    // xác nhận
                    BtSusscesCursor = "not-allowed"
                    BtSusscessColor = "#f9f6f6"
                } else if (item.status === 2) {
                    // hủy
                    BtFailureCursor = "not-allowed"
                    BtFailureColor = "#f9f6f6"
                }
                return (
                    <Space size="middle">
                        <Tooltip title="Xác nhận">
                            <Button style={{ border: "none", cursor: BtSusscesCursor, color: BtSusscessColor }} shape="circle" ><i style={{ fontSize: "25px" }} onClick={showModal} dataId={item._id} data="1" class="far fa-check-circle"></i></Button>
                        </Tooltip>
                        <Tooltip title="Hủy">
                            <Button style={{ border: "none", cursor: BtFailureCursor, color: BtFailureColor }} shape="circle" ><i style={{ fontSize: "25px" }} onClick={showModal} dataId={item._id} data="2" class="far fa-times-circle"></i></Button>
                        </Tooltip>
                        <Tooltip title="Chờ xác nhận">
                            <Button style={{ border: "none", cursor: BtWaitCursor, color: BtWaitColor }} shape="circle" >
                                <i style={{ fontSize: "25px" }} onClick={showModal} dataId={item._id} data="0" class="fas fa-info-circle"></i>
                            </Button>
                        </Tooltip>

                    </Space>
                )
            },
        },
    ];
    // eslint-disable-next-line react/prop-types
    const datatable = booking?.map((item) => {
        return {
            name: item.name,
            phoneNumber: item.phoneNumber,
            status: item.status,
            date: item.date,
            employeeId: item.employeeId.name,
            serviceId: item.serviceId.name,
            action: (item)
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
            <p>Nhân viên: {handleBooking?.employeeId.name}</p>
            <p>Dịch vụ: {handleBooking?.serviceId.name}</p>
            <p>Note: {handleBooking?.note}</p>
        </Modal>
    </div>;
};
export default ListBooking;