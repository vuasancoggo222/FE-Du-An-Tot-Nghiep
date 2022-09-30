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

import ListEmployee from "./pages/admin/employee";
import AddEmployee from "./pages/admin/employee/add";



function App() {
  const [booking, setBooking] = useState()
  useEffect(() => {
    const getBooking = async () => {
      const res = await httpGetAll();
      console.log(res);
      setBooking(res)
    }
    getBooking()
  },[])

  const changeStatusBooking = async () => {
    const res = await httpGetAll();
    console.log(res);
    setBooking(res)
  }
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
            <Route path="booking" element={<ListBooking handleChangeStatus={changeStatusBooking} dataBooking={booking} />} />
            <Route path="employee">
            <Route index element={<ListEmployee  />} />
            <Route path="add" element={<AddEmployee />} />
            </Route>
          </Route>
        </Routes>
      </div>  
    </>
  );
}

export default App;
