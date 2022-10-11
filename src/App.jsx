import { Route, Routes } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "./App.css";
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
import { PrivateRouter } from "./utils/PrivateRouter";
import EditService from "./pages/admin/service/Edit";
import VerifyPage from "./pages/website/VerifyPage";
import ListBooking from "./pages/admin/booking";
import EditEmployee from "./pages/admin/employee/edit";
import UserHistory from "./pages/website/user/UserHistory";
function App() {
  const [booking, setBooking] = useState();
  const [employees, setEmployees] = useState();
  const [service, setService] = useState();
  useEffect(() => {
    const getBooking = async () => {
      const res = await httpGetAll();
      console.log(res);
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
  }, []);

  const changeStatusBooking = async () => {
    const res = await httpGetAll();
    console.log(res);
    setBooking(res);
  };

  return (
    <>
      <div className="App">
        <Routes>
          <Route path="/" element={<WebsiteLayout />}>
            <Route index element={<HomePage />} />
            <Route path="/booking" element={<BookingPage />} />
            <Route path="booking-history/me" element={<UserHistory />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/price-list" element={<PriceList />} />
            <Route path="/detail-booking/:id" element={<Detaibooking />} />
            <Route path="/verify" element={<VerifyPage />} />
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
              <Route index element={<ListEmployee />} />
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
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
