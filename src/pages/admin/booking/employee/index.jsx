/* eslint-disable no-undef */
/* eslint-disable react/no-unknown-property */
import React, { useEffect, useRef, useState } from "react";
import { SearchOutlined } from '@ant-design/icons';
import { Button, DatePicker, Input, message, Modal, Space, Table, Tag, TimePicker, Select } from 'antd';
import { httpGetChangeStatus } from "../../../../api/booking";
import Highlighter from 'react-highlight-words';
import { httpGetOne } from "../../../../api/employee";
const ListBookingByEmployee = (props) => {
    const format = 'HH';
    const { Option } = Select;
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [titleModal, setTitleModal] = useState("Đang diễn ra");
    const [handleBooking, setHandleBooking] = useState();
    const [ishandle, setIshandle] = useState();
    const [isEmploye, setIsemploye] = useState();
    // eslint-disable-next-line react/prop-types
    const booking = props.dataBooking
    // eslint-disable-next-line react/prop-types

    const isEmployee = JSON.parse(localStorage.getItem('user'));
    if (isEmployee) {
        console.log(isEmployee
        );
    }
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

    const renderTime = (value) => {
        const d = new Date(value)
        let time = d.getHours();
        if (time.toString().length == 1) {
            time = `0${time}`
        }
        return time
    }

    const renderDate = (value) => {
        const d = new Date(value)
        let date = d.getDate();
        let month = d.getMonth() + 1;
        if (date.toString().length == 1) {
            date = `0${date}`;
        }
        if (month.toString().length == 1) {
            month = `0${month}`;
        }
        return `${d.getFullYear()}-${month}-${date}`;
    }

    function formatCash(str) {
        const string = str.toString()
        return string.split('').reverse().reduce((prev, next, index) => {
            return ((index % 3) ? next : (next + ',')) + prev
        })
    }

    const showModal = (e) => {
        // eslint-disable-next-line react/prop-types
        let isButon = e.target.getAttribute("data");
        let idBooking = e.target.getAttribute("dataId");
        let show = e.target.getAttribute("isshow");
        if (isButon == null) {
            isButon = e.target.offsetParent.getAttribute("data");
            idBooking = e.target.offsetParent.getAttribute("dataId");
            show = e.target.offsetParent.getAttribute("isshow");
        }
        console.log(idBooking);
        // eslint-disable-next-line react/prop-types
        booking.map(async (item) => {
            if (item._id == idBooking) {
                if (item.status == isButon || show == "false") {
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
        if (isButon === "3") {
            setTitleModal("Chuyển sang Đang diễn ra")
        } else if (isButon === "4") {
            setTitleModal("Chuyển sang Hoàn thành")
        } else {
            setTitleModal("Chuyển sang khách không đến")
        }
    };

    // eslint-disable-next-line no-unused-vars
    const handleOk = async () => {
        setIsModalOpen(false);
        console.log(ishandle);
        if (ishandle === "3") {
            try {
                await httpGetChangeStatus(handleBooking._id, { status: 3 })
                message.success(`Xác nhận khách hàng "${handleBooking.name}"`)
            } catch (error) {
                message.error(`${error.response.data.message}`)
            }
        } else if (ishandle === "4") {
            try {
                await httpGetChangeStatus(handleBooking._id, { status: 4 })
                message.success(`Hủy khách hàng "${handleBooking.name}"`)
            } catch (error) {
                message.error(`${error.response.data.message}`)
            }
        } else {
            try {
                await httpGetChangeStatus(handleBooking._id, { status: 5 })

                message.success(`Reset chờ khách hàng "${handleBooking.name}"`)
            } catch (error) {
                message.error(`${error.response.data.message}`)
            }
        }
        // eslint-disable-next-line react/prop-types
        props.handleChangeStatus();
    };

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

    const getColumnSearchDateTime = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div
                style={{
                    padding: 8,
                }}
            >

                <DatePicker
                    // disabledDate={disabledDate}
                    onChange={async (e) => { console.log(renderDate(e._d)), setSelectedKeys([renderDate(e._d)]) }}
                    // onChange={setSelectedKeys([2022006])}
                    onOk={onOk}
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

    const getColumnSearchTime = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div
                style={{
                    padding: 8,
                }}
            >
                <TimePicker onChange={async (e) => { console.log(renderTime(e._d)), setSelectedKeys([renderTime(e._d).toString()]) }} style={{
                    marginBottom: 8,
                    display: 'block',
                }} format={format} />

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
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const columns = [
        {
            title: 'Tên',
            dataIndex: 'name',
            key: 'name',
            ...getColumnSearchProps('name'),
        },
        {
            title: 'SĐT',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
            ...getColumnSearchProps('phoneNumber')
        },
        {
            title: <span >
                Ngày

            </span>,
            dataIndex: 'date',
            key: 'date',
            render: (data) => <span>{data}</span>,
            ...getColumnSearchDateTime("date")
            // filters: dateFilter,
            // onFilter: (value, record) => record.date.toString().indexOf(value) === 0,
        },
        {
            title: 'Giờ',
            dataIndex: 'time',
            key: 'time',
            ...getColumnSearchTime("time")
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
            filters: service,
            onFilter: (value, record) => record.serviceId.indexOf(value) === 0,
        },
        {
            title: 'Trạng thái',
            key: 'status',
            dataIndex: 'status',
            filters: [
                {
                    text: 'Đã xác nhận',
                    value: '1',
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
                    key = "Đang diễn ra"
                    color = "#da0cc8"
                } else if (status === 4) {
                    key = "Hoàn thành"
                    color = "#69c20a"
                }
                else {
                    key = "Khách không đến"
                    color = "#cd3e3e"
                }
                return (
                    <Tag color={color} key={key}>
                        {key.toUpperCase()}
                    </Tag>
                )

            },

        },
        {
            title: 'Hành động',
            dataIndex: "action",
            key: 'action',
            render: (item) => {
                // chờ
                let showWait = "false"
                let showSussces = "false"
                let showFailure = "false"
                let BtWaitCursor = "not-allowed"
                let BtWaitColor = "#dedede"
                // let BtWaitColor = "#cd3e3e"
                // xác nhận
                let BtSusscesCursor = "not-allowed"
                let BtSusscessColor = "#dedede"
                // let BtSusscessColor = "#da0cc8"
                // hủy
                let BtFailureCursor = "not-allowed"
                let BtFailureColor = "#dedede"
                // let BtFailureColor = "green"

                if (item.status === 1) {
                    // chờ
                    showSussces = "true"
                    showWait = "true"
                    BtSusscesCursor = "pointer"
                    BtSusscessColor = "#da0cc8"
                    BtWaitCursor = "not-allowed"
                    BtWaitColor = "#cd3e3e"
                } else if (item.status === 3) {
                    BtFailureCursor = "pointer"
                    BtFailureColor = "green"
                    showFailure = "true"
                    // xác nhận
                   
                } 
                return (
                 
                    <Select
                    style={{ width: "170px" , color:"blue", textAlign:"center"}}
                    value="Đổi trạng thái"
                    >
                        <Option value="3"> <Button isshow={showSussces} onClick={showModal} dataId={item._id} data="3" style={{ cursor: BtSusscesCursor, backgroundColor: BtSusscessColor, border: "none", color: "white", width: "100%" }} >
                            Đang diễn ra
                        </Button></Option>
                        <Option value="4">  <Button isshow={showFailure} onClick={showModal} dataId={item._id} data="4" type="danger" style={{ cursor: BtFailureCursor, backgroundColor: BtFailureColor, border: "none", color: "white", width: "100%" }} >
                            Hoàn thành
                        </Button></Option>
                        <Option value="5"><Button isshow={showWait} onClick={showModal} dataId={item._id} data="5" style={{ cursor: BtWaitCursor, backgroundColor: BtWaitColor, border: "none", color: "white", width: "100%" }} >
                            Khách không đến
                        </Button></Option>
                    </Select>
                )
            },
        },
    ];
    let datatable = [];
    // eslint-disable-next-line react/prop-types
    booking?.forEach((item) => {
        console.log(item);
        if (item.employeeId?._id == isEmploye?._id && item.status != 0 && item.status != 2) {
            const time = renderTime(item.time)
            const date = renderDate(item.date)
            datatable.push({
                name: item.name,
                phoneNumber: item.phoneNumber,
                status: item.status,
                date: date,
                time: time,
                employeeId: item.employeeId.name,
                serviceId: item.serviceId[0].name,
                action: (item)
            })
        }
    })
    
    useEffect(() => {
        const getEmployee = async () => {
            const res = await httpGetOne(isEmployee.id)
            setIsemploye(res)
            console.log(res);
        }
        getEmployee()
        
    }, [])
    return <div className="w-full px-6 py-6 mx-auto">
        <div>
            <h1 className="mb-0 font-bold text-white capitalize pb-[20px] text-center text-[50px]">
                List Booking By {isEmploye?.name}
            </h1>
        </div>

        <Table columns={columns} dataSource={datatable} />;

        <Modal style={{ fontFamily: "revert-layer" }} title={titleModal} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <p>Tên Khách hàng: {handleBooking?.name}</p>
            <p>Số điện thoại: {handleBooking?.phoneNumber}</p>
            <p>Ngày: {renderDate(handleBooking?.date)}</p>
            <p>Giờ đến: {renderTime(handleBooking?.time)}</p>
            <p>Nhân viên: {handleBooking?.employeeId.name}</p>
            <p>Dịch vụ: {handleBooking?.serviceId[0].name}</p>
            <p>Thanh toán: {formatCash(handleBooking?.bookingPrice || "0")}</p>
            <p>Note: {handleBooking?.note}</p>
        </Modal>
    </div>;
};
export default ListBookingByEmployee;