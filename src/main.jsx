import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "antd/dist/antd.min.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter } from "react-router-dom";

import { io } from "socket.io-client";
export const socket = io("localhost:5000");

import ScrollToTop from "./components/clients/Scrolltotop";
ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
    <ScrollToTop />
  </BrowserRouter>
);
