import { Descriptions, Tabs } from "antd";
import React, { useEffect, useState } from "react";
import { userHistory } from "../../../api/booking";
import { isAuthenticate } from "../../../utils/LocalStorage";
const UserHistory = () => {
  const user = isAuthenticate();
  const id = user?.id;
  const [history, setHistory] = useState([]);
  const [unconfirmBooking, setUnconfirmBooking] = useState([]);
  const [confirmBooking, setConfirmBooking] = useState([]);
  const [cancelBooking, setCancelBooking] = useState([]);
  const [successBooking, setSuccessBooking] = useState([]);
  useEffect(() => {
    const getUserHistory = async () => {
      try {
        const data = await userHistory(id);
        setHistory(data);
        setUnconfirmBooking(data.filter((item) => item.status == 0));
        setConfirmBooking(data.filter((item) => item.status == 1));
        setCancelBooking(data.filter((item) => item.status == 2));
        setSuccessBooking(data.filter((item) => item.status == 3));
      } catch (error) {
        console.log(error);
      }
    };
    getUserHistory();
  }, [id]);

  return (
    <Tabs defaultActiveKey="1">
      <Tabs.TabPane tab="Chờ xác nhận" key="1">
        {unconfirmBooking.map((item) => {
          return (
            <Descriptions
              key={item._id}
              bordered
              title="Chờ xác nhận"
              size="middle"
            >
              <div>Tên khách hàng :{item.name}</div>
              <div>Số điện thoại :{item.phoneNumber}</div>
              <div>Ghi chú :{item.note}</div>
              <div>
                Danh sách dịch vụ :
                {item.serviceId.map((service) => {
                  return (
                    <div key={service._id}>
                      <div>Tên dịch vụ :{service.name}</div>
                      <div>Giá : {service.price}</div>
                    </div>
                  );
                })}
              </div>
            </Descriptions>
          );
        })}
      </Tabs.TabPane>
      <Tabs.TabPane tab="Đã xác nhận" key="2">
        {confirmBooking.map((item) => {
          return (
            <Descriptions
              key={item._id}
              bordered
              title="Chờ xác nhận"
              size="middle"
            >
              <div>Tên khách hàng :{item.name}</div>
              <div>Số điện thoại :{item.phoneNumber}</div>
              <div>Ghi chú :{item.note}</div>
              <div>
                Danh sách dịch vụ :
                {item.serviceId.map((service) => {
                  return (
                    <div key={service._id}>
                      <div>Tên dịch vụ :{service.name}</div>
                      <div>Giá : {service.price}</div>
                    </div>
                  );
                })}
              </div>
            </Descriptions>
          );
        })}
      </Tabs.TabPane>
      <Tabs.TabPane tab="Đã huỷ" key="3">
        {cancelBooking.map((item) => {
          return (
            <Descriptions
              key={item._id}
              bordered
              title="Chờ xác nhận"
              size="middle"
            >
              <div>Tên khách hàng :{item.name}</div>
              <div>Số điện thoại :{item.phoneNumber}</div>
              <div>Ghi chú :{item.note}</div>
              <div>
                Danh sách dịch vụ :
                {item.serviceId.map((service) => {
                  return (
                    <div key={service._id}>
                      <div>Tên dịch vụ :{service.name}</div>
                      <div>Giá : {service.price}</div>
                    </div>
                  );
                })}
              </div>
            </Descriptions>
          );
        })}
      </Tabs.TabPane>
      <Tabs.TabPane tab="Đã hoàn thành" key="4">
        {successBooking.map((item) => {
          return (
            <Descriptions
              key={item._id}
              bordered
              title="Chờ xác nhận"
              size="middle"
            >
              <div>Tên khách hàng :{item.name}</div>
              <div>Số điện thoại :{item.phoneNumber}</div>
              <div>Ghi chú :{item.note}</div>
              <div>
                Danh sách dịch vụ :
                {item.serviceId.map((service) => {
                  return (
                    <div key={service._id}>
                      <div>Tên dịch vụ :{service.name}</div>
                      <div>Giá : {service.price}</div>
                    </div>
                  );
                })}
              </div>
            </Descriptions>
          );
        })}
      </Tabs.TabPane>
    </Tabs>
  );
};

export default UserHistory;
