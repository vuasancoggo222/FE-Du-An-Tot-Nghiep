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
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
  };
  return (
    <>
      <div className="border border-[#00502b] rounded-md ">
        <h1 className="text-2xl py-2 px-10 bg-[#00502b] text-white rounded-t-md">
          Lịch sử đặt lịch
        </h1>
        <div className="px-10 pb-5  ">
          <Tabs defaultActiveKey="1">
            <Tabs.TabPane
              tab="Chờ xác nhận"
              key="1"
              className="overflow-auto max-h-screen"
            >
              {unconfirmBooking.map((item) => {
                return (
                  <Descriptions
                    key={item._id}
                    bordered
                    title="Chờ xác nhận"
                    size="middle"
                  >
                    <div>
                      Tên khách hàng :{" "}
                      <span className="font-semibold">{item.name}</span>{" "}
                    </div>
                    <div>
                      Số điện thoại :{" "}
                      <span className="font-semibold">{item.phoneNumber}</span>
                    </div>
                    <div className="">
                      Ngày đặt :{" "}
                      <span className="font-semibold">
                        {formatDate(item.date)}
                      </span>{" "}
                    </div>

                    <div>
                      Ghi chú : <p>{item.note}</p>{" "}
                    </div>
                    <div>
                      {item.serviceId.map((service) => {
                        return (
                          <div key={service._id}>
                            <div>
                              Tên dịch vụ :{" "}
                              <span className="font-semibold">
                                {service.name}
                              </span>
                            </div>
                            <div>
                              Giá :{" "}
                              <span className="font-semibold">
                                {service.price}
                              </span>{" "}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </Descriptions>
                );
              })}
            </Tabs.TabPane>
            <Tabs.TabPane
              tab="Đã xác nhận"
              key="2"
              className="overflow-auto max-h-screen"
            >
              {confirmBooking.map((item) => {
                return (
                  <Descriptions
                    key={item._id}
                    bordered
                    title="Chờ xác nhận"
                    size="middle"
                  >
                    <div>
                      Tên khách hàng :{" "}
                      <span className="font-semibold">{item.name}</span>{" "}
                    </div>
                    <div>
                      Số điện thoại :{" "}
                      <span className="font-semibold">{item.phoneNumber}</span>
                    </div>
                    <div className="">
                      Ngày đặt :{" "}
                      <span className="font-semibold">
                        {formatDate(item.date)}
                      </span>{" "}
                    </div>

                    <div>
                      Ghi chú : <p>{item.note}</p>{" "}
                    </div>
                    <div>
                      {item.serviceId.map((service) => {
                        return (
                          <div key={service._id}>
                            <div>
                              Tên dịch vụ :{" "}
                              <span className="font-semibold">
                                {service.name}
                              </span>
                            </div>
                            <div>
                              Giá :{" "}
                              <span className="font-semibold">
                                {service.price}
                              </span>{" "}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </Descriptions>
                );
              })}
            </Tabs.TabPane>
            <Tabs.TabPane
              tab="Đã huỷ"
              key="3"
              className="overflow-auto max-h-screen"
            >
              {cancelBooking.map((item) => {
                return (
                  <Descriptions
                    key={item._id}
                    bordered
                    title="Chờ xác nhận"
                    size="middle"
                  >
                    <div>
                      Tên khách hàng :{" "}
                      <span className="font-semibold">{item.name}</span>{" "}
                    </div>
                    <div>
                      Số điện thoại :{" "}
                      <span className="font-semibold">{item.phoneNumber}</span>
                    </div>
                    <div className="">
                      Ngày đặt :{" "}
                      <span className="font-semibold">
                        {formatDate(item.date)}
                      </span>{" "}
                    </div>

                    <div>
                      Ghi chú : <p>{item.note}</p>{" "}
                    </div>
                    <div>
                      {item.serviceId.map((service) => {
                        return (
                          <div key={service._id}>
                            <div>
                              Tên dịch vụ :{" "}
                              <span className="font-semibold">
                                {service.name}
                              </span>
                            </div>
                            <div>
                              Giá :{" "}
                              <span className="font-semibold">
                                {service.price}
                              </span>{" "}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </Descriptions>
                );
              })}
            </Tabs.TabPane>
            <Tabs.TabPane
              tab="Đã hoàn thành"
              key="4"
              className="overflow-auto max-h-screen"
            >
              {successBooking.map((item) => {
                return (
                  <Descriptions
                    key={item._id}
                    bordered
                    title="Chờ xác nhận"
                    size="middle"
                  >
                    <div>
                      Tên khách hàng :{" "}
                      <span className="font-semibold">{item.name}</span>{" "}
                    </div>
                    <div>
                      Số điện thoại :{" "}
                      <span className="font-semibold">{item.phoneNumber}</span>
                    </div>
                    <div className="">
                      Ngày đặt :{" "}
                      <span className="font-semibold">
                        {formatDate(item.date)}
                      </span>{" "}
                    </div>

                    <div>
                      Ghi chú : <p>{item.note}</p>{" "}
                    </div>
                    <div>
                      {item.serviceId.map((service) => {
                        return (
                          <div key={service._id}>
                            <div>
                              Tên dịch vụ :{" "}
                              <span className="font-semibold">
                                {service.name}
                              </span>
                            </div>
                            <div>
                              Giá :{" "}
                              <span className="font-semibold">
                                {service.price}
                              </span>{" "}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </Descriptions>
                );
              })}
            </Tabs.TabPane>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default UserHistory;
