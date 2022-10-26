/* eslint-disable no-const-assign */
/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
/* eslint-disable react/no-unknown-property */
import React, { useRef, useState } from "react";
import { SearchOutlined } from '@ant-design/icons';
import { Button, DatePicker, Form, Input, message, Modal, Select, Space, Table, Tag, TimePicker } from 'antd';
import { httpGetChangeStatus } from "../../../api/booking";
import Highlighter from 'react-highlight-words';
import moment from "moment";
// import { httpChangeStatusTimeWork } from "../../../api/employee";
const ListBooking = (props) => {
    const [form] = Form.useForm();
    const [searchText, setSearchText] = useState('');
    const { Option } = Select;
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [titleModal, setTitleModal] = useState("Xác nhận");
    const [handleBooking, setHandleBooking] = useState();
    const [ishouse, setIsHouse] = useState();
    const [ishouseNoneBlock, setIsHouseNoneBlock] = useState();
    const [timeUpdate, setTimeUpdate] = useState();
    const [dateUpdate, setDateUpdate] = useState();
    const [employeeBooking, setEmployeeBooking] = useState();
    // eslint-disable-next-line no-unused-vars
    const [dateBooking, seDateBooking] = useState();
    const [ishandle, setIshandle] = useState();
    const dateFormat = 'YYYY/MM/DD';
    const format = 'HH';
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
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const changeEmployee = (e) => {
        console.log(e);
        let count = 0;
        setEmployeeBooking(e)
        booking?.map((item) => {
            // console.log(renderDate(value._d) == renderDate(item.date));
            if (item.status == 1 && renderDate(item.date) == renderDate(dateUpdate) && item.employeeId._id == e && renderTime(item.time) == renderTime(timeUpdate)) {
                count = Number(count) + 1;
            }
        })

        if (count > 0) {
            setIsHouseNoneBlock("block")
            setIsHouse(count)
        } else {
            setIsHouseNoneBlock("none")
        }
        console.log(count);
    }
    const onchangeDateBooking = (value) => {
        let count = 0;
        console.log(employeeBooking);
        // setDateUpdate(dateIp.value)
        setDateUpdate(value)
        booking?.map((item) => {
            // console.log(renderDate(value._d) == renderDate(item.date));
            if (item.status == 1 && renderDate(item.date) == renderDate(value) && item.employeeId._id == employeeBooking && renderTime(item.time) == renderTime(timeUpdate)) {
                count = Number(count) + 1;

            }
        })
        console.log(count);
        if (count > 0) {
            setIsHouseNoneBlock("block")
            setIsHouse(count)
        } else {
            setIsHouseNoneBlock("none")
        }
    };
    const onOk = (value) => {
        // console.log("...."+ employeeBooking);

        console.log("onOk: ", value);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };
    const onchangeTimeBooking = async (value) => {
        setTimeUpdate(value)
        let count = 0;
        booking?.map((item) => {
            if (item.status == 1 && renderDate(item.date) == renderDate(dateUpdate) && item.employeeId._id == employeeBooking && renderTime(item.time) == renderTime(value)) {
                count = Number(count) + 1;
            }
        })
        if (count > 0) {
            setIsHouseNoneBlock("block")
            setIsHouse(count)
        } else {
            setIsHouseNoneBlock("none")
        }

    };

    function formatCash(str) {
        const string = str.toString()
        return string.split('').reverse().reduce((prev, next, index) => {
            return ((index % 3) ? next : (next + ',')) + prev
        })
    }

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
    // let elemenPick;
    const showModal = (e) => {
        // eslint-disable-next-line react/prop-types
        setIsHouseNoneBlock("none")
        let isButon = e.target.getAttribute("data");
        let idBooking = e.target.getAttribute("dataId");
        let show = e.target.getAttribute("isshow");
        if (isButon == null) {
            isButon = e.target.offsetParent.getAttribute("data");
            idBooking = e.target.offsetParent.getAttribute("dataId");
            show =e.target.offsetParent.getAttribute("isshow");
        }
        let count = 0;
        let isBooking;
        // eslint-disable-next-line react/prop-types

        // eslint-disable-next-line react/prop-types
        booking.map(async (item) => {
            if (item._id == idBooking) {
                isBooking = item
                await setHandleBooking(item)
                setDateUpdate(item.date)
                setTimeUpdate(item.time)
                setEmployeeBooking(item.employeeId._id || "")
                return
            }
        })

        booking.map(async (item) => {

            if (item._id == idBooking) {
                if (item.status == isButon || show == "false") {
                    return
                }
                await seDateBooking(item.date.toString())
                form.setFieldsValue({
                    name: item?.name,
                    phoneNumber: item?.phoneNumber.toString().replace("+84", "0"),
                    serviceId: item?.serviceId[0]._id,
                    employeeId: item?.employeeId?._id,
                    note: item?.note,
                    bookingPrice: item?.bookingPrice,
                    date: (moment(renderDate(item?.date), dateFormat)),
                    time: item?.time != undefined ? (moment(renderTime(item?.time), format)) : "",
                });
                await setIsModalOpen(true);
            }
        })

        setIshandle(isButon)
        if (isButon === "1") {
            setTitleModal("Xác nhận")
        } else if (isButon === "2") {
            setTitleModal("Hủy")
        } else if (isButon === "0") {
            setTitleModal("Chờ xác nhận")
        }
        else if (isButon === "6") {
            setTitleModal("Thanh toán")
        }

        if (isButon == 1) {
            booking?.map((item) => {
                if (item.status == 1 && renderDate(item.date) == renderDate(isBooking.date) && renderTime(item.time) == renderTime(isBooking.time) && item.employeeId._id == isBooking.employeeId._id) {
                    count = Number(count) + 1;
                }
            })
            if (count > 0) {
                setIsHouseNoneBlock("block")
                setIsHouse(count)
            } else {
                setIsHouseNoneBlock("none")
            }
        } else {
            setIsHouseNoneBlock("none")
        }
    };

    // eslint-disable-next-line no-unused-vars
    const handleOk = async () => {

    };

    const handleCancel = () => {
        setIsModalOpen(false);
        props.handleChangeStatus();
    };
    const renderTime = (value) => {
        const d = new Date(value)
        let time = d.getHours();
        if (time.toString().length == 1) {
            time = `0${time}: 00`
        } else {
            time = `${time}: 00`
        }
        if (value == undefined) {
            return ""
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
            title: 'Trạng Thái',
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
                    text: 'Chờ thanh toán',
                    value: '4',
                },
                {
                    text: 'Khách không đến',
                    value: '5',
                },
                {
                    text: 'Hoàn thành',
                    value: '6',
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
                    key = "Chờ thanh toán"
                    color = "#69c20a"
                }
                else if (status == 5) {
                    key = "Khách không đến"
                    color = "#bc0808"
                } else {
                    key = "Hoàn thành"
                    color = "#09857e"
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
                let isShowCucess = "false";
                let isShowFailure = "false";
                let isShowPay = "false";
                let BtSusscesCursor = "pointer"
                let BtSusscessColor = "#dedede"
                // let BtSusscessColor = "#26cbe8"
                // hủy
                let BtFailureCursor = "not-allowed"
                let BtFailureColor = "#dedede"
                // let BtFailureColor = "#db5656"
                // thanh toán
                let BtPayCursor = "not-allowed"
                let BtPayColor = "#dedede"
                // let BtPayColor = "#09857e"

                if (item.status === 0) {
                    // xac nhan
                    isShowCucess = "true"
                    isShowFailure = "true"
                    BtSusscesCursor = "pointer"
                    BtSusscessColor = "#26cbe8"
                    BtFailureCursor = "pointer"
                    BtFailureColor = "#db5656"
                } else if (item.status === 4) {
                    // hủy
                    BtPayCursor = "pointer"
                    BtPayColor = "#09857e"
                    isShowPay ="true"
                }
                return (
                    <Select className="selectChangeSatus"
                        style={{ width: "150px", color: "blue", textAlign: "center" }}
                        value="Đổi trạng thái"
                    >
                        <Option value="1"> <Button isshow={isShowCucess} onClick={showModal} dataId={item._id} data="1" style={{ cursor: BtSusscesCursor, backgroundColor: BtSusscessColor, border: "none", color: "white", width: "100%" }} >
                            Xác nhận
                        </Button></Option>
                        <Option value="2">  <Button isshow={isShowFailure} onClick={showModal} dataId={item._id} data="2" type="danger" style={{ cursor: BtFailureCursor, backgroundColor: BtFailureColor, border: "none", color: "white", width: "100%" }} >
                            Hủy
                        </Button></Option>
                        {/* <Option value="0"><Button onClick={showModal} dataId={item._id} data="0" style={{ cursor: BtWaitCursor, backgroundColor: BtWaitColor, border: "none", color: "white", width: "100%" }} >
                            Chờ xác nhận
                        </Button></Option> */}
                        <Option value="6"><Button isshow={isShowPay} onClick={showModal} dataId={item._id} data="6" style={{ cursor:BtPayCursor, backgroundColor: BtPayColor, border: "none", color: "white", width: "100%" }} >
                            Thanh toán
                        </Button></Option>

                    </Select>
                )
            },
        },
    ];

    // eslint-disable-next-line react/prop-types
    const datatable = booking?.map((item) => {
        const time = renderTime(item.time)
        const date = renderDate(item.date)
        return {
            name: item.name,
            phoneNumber: item.phoneNumber.toString().replace("+84", "0"),
            status: item.status,
            date: date,
            time: time,
            employeeId: item.employeeId?.name,
            serviceId: item.serviceId[0].name,
            action: (item)
        }
    })
    const validateMessages = {
        required: "${label} không được để trống!",
        types: {
            email: "${label} không đúng định dạng!",
            number: "${label} is not a valid number!",
        },
        number: {
            range: "${label} must be between ${min} and ${max}",
        },
    };
    const onSubmit = async (data) => {
        console.log("submit", data);
        console.log(timeUpdate, dateUpdate);
        if (ishandle === "1") {
            try {
                await httpGetChangeStatus(handleBooking?._id, { ...data, date: dateUpdate, time: timeUpdate, status: 1 })
                message.success(`${titleModal} khách hàng ${handleBooking.name}`)
            } catch (error) {
                message.error(`${error.response.data.message}`)
            }
        }
        else if (ishandle === "2") {
            try {
                await httpGetChangeStatus(handleBooking._id, { status: 2 })
                message.success(`${titleModal} khách hàng ${handleBooking.name}`)
            } catch (error) {
                message.error(`${error.response.data.message}`)
            }
        } else if (ishandle === "0") {
            try {
                await httpGetChangeStatus(handleBooking._id, { status: 0 })
                message.success(`${titleModal} khách hàng ${handleBooking.name}`)
            } catch (error) {
                message.error(`${error.response.data.message}`)
            }
        }
        else if (ishandle === "6") {
            try {
                await httpGetChangeStatus(handleBooking._id, { status: 6 })
                message.success(`${titleModal} khách hàng ${handleBooking.name}`)
            } catch (error) {
                message.error(`${error.response.data.message}`)
            }
        }
        // eslint-disable-next-line react/prop-types
        props.handleChangeStatus();
        handleCancel()
    };
    const onHandleAdd = (value) => {
        console.log("cha:", value);
    };
    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            <Select
                style={{
                    width: 70,
                }}
            >
                <Option value="84">+84</Option>
            </Select>
        </Form.Item>
    );

    const layout = {
        labelCol: {
            span: 7,
        },
        wrapperCol: {
            span: 16,
        },
    };

    return <div className="w-full px-6 py-6 mx-auto">
        <div>
            <h1 className="mb-0 font-bold text-white capitalize pb-[20px] text-center text-[50px]">
                List Booking
            </h1>
        </div>

        <Table columns={columns} dataSource={datatable} />;
        <Modal footer={null} style={{ fontFamily: "revert-layer" }} title={titleModal} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>

            <Form
                form={form}
                onAdd={onHandleAdd}
                {...layout}
                name="nest-messages"
                validateMessages={validateMessages}
                initialValues={{
                    prefix: "+84",
                }}
                onFinish={onSubmit}
            >
                {/* Tên */}
                <Form.Item
                    name="name"
                    label="Tên "
                    rules={[
                        {
                            required: ishandle == 1 ? true : false,
                        },
                    ]}
                >

                    <Input disabled={ishandle == 1 ? false : true} />
                </Form.Item>

                <Form.Item
                    name="phoneNumber"
                    label="Số điện thoại"
                    rules={[
                        {
                            required: ishandle == 1 ? true : false,
                            pattern: new RegExp(/((09|03|07|08|05)+([0-9]{8})\b)/g),
                            message: "Số điện thoại không đúng định dạng!"
                        },
                    ]}
                >
                    <Input
                        disabled={ishandle == 1 ? false : true}
                        addonBefore={prefixSelector}
                        style={{
                            width: "100%",
                        }}
                    />
                </Form.Item>
                <Form.Item
                    name="serviceId"
                    label="Dịch vụ"
                    rules={[
                        {
                            required: ishandle == 1 ? true : false,
                            // eslint-disable-next-line no-undef
                        },
                    ]}
                >

                    <Select disabled={ishandle == 1 ? false : true}>
                        {props.dataService?.map((item, index) => (
                            <Select.Option value={item._id} key={index}>
                                {item.name}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item
                    name="date"
                    label="Ngày đến"
                    rules={[
                        {
                            required: ishandle == 1 ? true : false,
                            // eslint-disable-next-line no-undef
                        },
                    ]}
                >
                    <DatePicker
                        disabled={ishandle == 1 ? false : true}
                        showTime
                        format={dateFormat}
                        onOk={onchangeDateBooking}
                    // onOk={onOk}
                    />
                </Form.Item>

                {/* chọn nhân viên */}
                <Form.Item
                    name="employeeId"
                    label="Nhân viên"
                    rules={[
                        {
                            required: ishandle == 1 ? true : false,
                            // eslint-disable-next-line no-undef
                        },
                    ]}

                >

                    <Select disabled={ishandle == 1 ? false : true} onChange={changeEmployee} >
                        {props.dataEmployy?.map((item, index) => (
                            <Select.Option value={item._id} key={index}>
                                {item.name}
                            </Select.Option>
                        ))}
                    </Select >
                </Form.Item>

                <Form.Item
                    name="time"
                    label="Giờ đến"
                    rules={[
                        {
                            required: ishandle == 1 ? true : false,
                            // eslint-disable-next-line no-undef
                        },
                    ]}
                >
                    <TimePicker
                        disabled={ishandle == 1 ? false : true}
                        format={format}
                        onOk={onchangeTimeBooking}
                    />
                </Form.Item>

                <Form.Item
                    style={{ display: ishouseNoneBlock }}
                    label="Note"
                    name="time"
                >
                    <div className="" style={{ color: "#cfab1b", display: ishouseNoneBlock }}>Nhân viên này đã có {ishouse} khách vào thời điểm này !</div>
                </Form.Item>
                {/* chọn ca  */}
                <Form.Item
                    name="bookingPrice"
                    label="Thanh toán"
                    initialValue={formatCash(handleBooking?.bookingPrice || "0")}
                >
                    <Input disabled />
                </Form.Item>
                <Form.Item name="note" label="Ghi chú">
                    <Input.TextArea disabled={ishandle == 1 ? false : true} />
                </Form.Item>
                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                    <Button type="primary" htmlType="submit">
                        {titleModal}
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    </div>
};
export default ListBooking;