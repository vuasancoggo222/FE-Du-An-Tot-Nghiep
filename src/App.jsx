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
import ListBooking from "./pages/admin/booking";
import { httpGetAll } from "./api/booking";
import { httpGetAllShift } from "./api/shift";
import { httpGetEmployees } from "./api/employee";

import ListEmployee from "./pages/admin/employee";
import AddEmployee from "./pages/admin/employee/add";
import { httpGetAllService } from "./api/services";
import ListBookingByEmployee from "./pages/admin/booking/employee";
import ListService from "./pages/admin/service";

function App() {
  const [booking, setBooking] = useState();
  const [employees, setEmployees] = useState();
  const [service, setService] = useState();
  const [shift, setShift] = useState();
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
    const getShift = async () => {
      const res = await httpGetAllShift();
      setShift(res);
    };
    getShift();
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
            <Route path="/contact" element={<Contact />} />
            <Route path="/price-list" element={<PriceList />} />
            <Route path="/detail-booking/:id" element={<Detaibooking />} />
          </Route>
          <Route path="admin" element={<AdminLayout />}>
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
                    dataShift={shift}
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
                    dataShift={shift}
                  />
                }
              />
            </Route>
            <Route path="employee">
              <Route index element={<ListEmployee />} />
              <Route path="add" element={<AddEmployee />} />
            </Route>
            <Route path="service">
              <Route index element={<ListService />} />
            </Route>
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
