import { Badge } from "antd";
import React, { useEffect } from "react";

import { getListNotification } from "../../api/notification";
// import { io } from "socket.io-client";
const notification = () => {
  // const socket = io("localhost:5000");

  const [show, setShow] = React.useState(false);
  const [notification, setNotification] = React.useState();

  // socket.on("notification", (data) => {
  //   console.log("data", data);
  //   setNotification(data);
  // });

  const onClick = () => {
    setShow(!show);
  };
  useEffect(() => {}, []);
  return (
    <>
      <li className="relative flex items-center pr-2">
        <p className="hidden transform-dropdown-show" />
        <a
          href="javascript:;"
          className="block p-0 text-sm text-white transition-all ease-nav-brand"
          aria-expanded="false"
        >
          <Badge count={2} overflowCount={10}>
            <i
              className="cursor-pointer fa fa-bell text-3xl text-white"
              onClick={onClick}
            />
          </Badge>
        </a>
        <ul
          className={`${
            show === false ? "hidden" : ""
          } text-sm mt-[50px] before:font-awesome before:leading-default before:duration-350 before:ease lg:shadow-3xl duration-250 min-w-44 before:sm:right-8 before:text-5.5 pointer-events-none absolute right-0 top-0 z-50 origin-top list-none rounded-lg border-0 border-solid border-transparent dark:shadow-dark-xl dark:bg-slate-850 bg-white bg-clip-padding px-2 py-4 text-left text-slate-500 transition-all before:absolute before:right-2 before:left-auto before:top-0 before:z-50 before:inline-block before:font-normal before:text-white before:antialiased before:transition-all before:content-['\f0d8']`}
        >
          {/* add show class on dropdown open js */}
          <li className="relative mb-2">
            <a
              className="dark:hover:bg-slate-900 ease py-1.2 clear-both block w-full whitespace-nowrap rounded-lg bg-transparent px-4 duration-300 hover:bg-gray-200 hover:text-slate-700 lg:transition-colors"
              href="javascript:;"
            >
              <div className="flex py-1">
                <div className="my-auto">
                  <img
                    src="../assets/img/team-2.jpg"
                    className="inline-flex items-center justify-center mr-4 text-sm text-white h-9 w-9 max-w-none rounded-xl"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <h6 className="mb-1 text-sm font-normal leading-normal dark:text-white">
                    <span className="font-semibold">{notification?.text}</span>{" "}
                    from Laur
                  </h6>
                  <p className="mb-0 text-xs leading-tight text-slate-400 dark:text-white/80">
                    <i className="mr-1 fa fa-clock" />
                    13 minutes ago
                  </p>
                </div>
              </div>
            </a>
          </li>
        </ul>
      </li>
    </>
  );
};

export default notification;
