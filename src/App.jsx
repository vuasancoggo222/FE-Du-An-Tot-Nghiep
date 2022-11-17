import { Route, Routes } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "./App.css";
import "./index.css";
import WebsiteLayout from "./layouts/WebsiteLayout";
import HomePage from "./pages/website/Home";
import BookingPage from "./pages/website/BookingPage";
import Contact from "./pages/website/Contact";
import PriceList from "./pages/website/PriceList";
import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./components/admin/dashboard";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Detaibooking from "./pages/website/detailbook";
import { httpGetAll } from "./api/booking";
import { httpGetEmployees } from "./api/employee";
import ListEmployee from "./pages/admin/employee";
import AddEmployee from "./pages/admin/employee/add";
import { httpGetAllService } from "./api/services";
import ListBookingByEmployee from "./pages/admin/booking/employee";
import ListService from "./pages/admin/service";
import AddService from "./pages/admin/service/Add";
import { PrivateRouter, PrivateRouter2 } from "./utils/PrivateRouter";
import EditService from "./pages/admin/service/Edit";
import VerifyPage from "./pages/website/VerifyPage";
import ListBooking from "./pages/admin/booking";
import EditEmployee from "./pages/admin/employee/edit";
import UserHistory from "./pages/website/user/UserHistory";
import ContactList from "./pages/admin/contact/index";
import UserInfo from "./components/clients/UserInfo";
import ListUser from "./pages/admin/user";
import Userinformation from "./components/clients/userinformation";
import ReplyFeedback from "./pages/admin/feedback";
import News from "./pages/website/News";
import { io } from "socket.io-client";
import { REALTIME_SERVER, SocketEvent } from "./utils/SocketConstant";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  userNotificationState,
  notificationState,
} from "./recoil/notificationState";
import { isAuthenticate } from "./utils/LocalStorage";
const user = isAuthenticate()
export const socket = io(REALTIME_SERVER, {
  autoConnect: false,
  query : {
    token : user?.token
  }
});
import DetailNews from "./pages/website/DetailNews";
import UserEdit from "./pages/admin/user/edit";
import ListPost from "./pages/admin/post";
import AddPost from "./pages/admin/post/add";
import EditPost from "./pages/admin/post/edit";
import ListBanner from "./pages/admin/banner";
import Detailpost from "./pages/admin/post/detail";
function App() {
  const [notification, setNotification] = useRecoilState(notificationState);
  const [userNotification,setUserNotification] = useRecoilState(userNotificationState)
  const user = isAuthenticate();
  const [booking, setBooking] = useState();
  const [employees, setEmployees] = useState();
  const [service, setService] = useState();
  const [countDown, setCountDown] = useState("");

  window.addEventListener("unload", () => {
    if (countDown > 0) {
      localStorage.setItem("countDown", countDown);
    } else {
      localStorage.removeItem("countDown");
    }
  });

  const handleSetCountDown = () => {
    let timeDown = 60;
    let timerId = setInterval(() => {
      setCountDown(--timeDown);
      if (timeDown == 0) {
        clearInterval(timerId);
        setCountDown("");
      }
    }, 1000);
  };

  useEffect(() => {
    socket.connect();
    socket.on(SocketEvent.NOTIFICATION, (data) => {
      if(data.length){
        setNotification(data);
        console.log(data);
      }
    });
    socket.on(SocketEvent.USERLISTNOTIFICATION,(data)=>{
      if(data.length){
        setUserNotification(data)
      }
      console.log(data);
    })
    const getBooking = async () => {
      const res = await httpGetAll();

      setBooking(res);
    };
    getBooking();
    const getEmployee = async () => {
      const res = await httpGetEmployees();
      setEmployees(res);
    };
    getEmployee();
    const getService = async () => {
      const res = await httpGetAllService();
      setService(res);
    };
    getService();
    return () => {
      socket.off(SocketEvent.NOTIFICATION);
      socket.off(SocketEvent.USERLISTNOTIFICATION)
    };
  }, []);

  useEffect(() => {
    
    socket?.emit("newUser", user ? user.id : "");
  }, [socket, user]);
  const changeStatusBooking = async () => {
    const res = await httpGetAll();
    setBooking(res);
  };
  return (
    <>
      <div className="App">
        <Routes>
          <Route path="/" element={<WebsiteLayout />}>
            <Route index element={<HomePage />} />
            <Route path="/booking" element={<BookingPage />} />

            <Route element={<UserInfo />}>
              <Route path="booking-history/me" element={<UserHistory />} />
              <Route path="user-information/me" element={<Userinformation />} />
            </Route>

            <Route path="/contact" element={<Contact />} />
            <Route path="/news" element={<News />} />
            <Route path="/news/detail" element={<DetailNews />} />
            <Route path="/price-list" element={<PriceList />} />
            <Route path="/detail-booking/:id" element={<Detaibooking />} />
            <Route path="/verify" element={<VerifyPage />} />
            <Route path="*" element={<h1>404 Not Found</h1>} />
          </Route>
          <Route
            path="admin"
            element={
              <PrivateRouter>
                <AdminLayout />
              </PrivateRouter>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="booking">
              <Route
                index
                element={
                  <ListBooking
                    handleChangeStatus={changeStatusBooking}
                    dataBooking={booking}
                    dataEmployy={employees}
                    dataService={service}
                  />
                }
              />
              <Route
                path="employee"
                element={
                  <ListBookingByEmployee
                    handleChangeStatus={changeStatusBooking}
                    dataBooking={booking}
                    dataEmployy={employees}
                    dataService={service}
                  />
                }
              />
            </Route>
            <Route path="employee">
              <Route
                index
                element={
                  <PrivateRouter2>
                    <ListEmployee />
                  </PrivateRouter2>
                }
              />
              <Route path="add" element={<AddEmployee />} />
              <Route path=":id/edit" element={<EditEmployee />} />
            </Route>
            <Route path="service">
              <Route index element={<ListService dataEmployy={employees} />} />
              <Route
                path="add"
                element={<AddService dataEmployy={employees} />}
              />
              <Route path=":id/edit" element={<EditService />} />
            </Route>
            <Route path="contact">
              <Route index element={<ContactList />} />
            </Route>
            <Route path="banner">
              <Route index element={<ListBanner />} />
            </Route>
            <Route path="user">
              <Route
                index
                element={
                  <PrivateRouter2>
                    <ListUser />
                  </PrivateRouter2>
                }
              ></Route>
              <Route path=":id/edit" element={<UserEdit />} />
            </Route>
            <Route path="post">
              <Route index element={<ListPost />}></Route>
              <Route path=":id/edit" element={<EditPost />} />
              <Route path="add" element={<AddPost />} />
              <Route path=":id" element={<Detailpost />} />
            </Route>
            <Route path="feedback">
              <Route index element={<ReplyFeedback />}></Route>
            </Route>
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
