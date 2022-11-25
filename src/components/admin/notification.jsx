import { Badge } from "antd";
import React from "react";
import { useRecoilValue } from "recoil";
import { notificationState, userNotificationState } from "../../recoil/notificationState";
import { isAuthenticate } from "../../utils/LocalStorage";
const notification = () => {
  const user = isAuthenticate()
  const listNotification = useRecoilValue(notificationState)
  const userNotification = useRecoilValue(userNotificationState)
  
  const [show, setShow] = React.useState(false);

  const onClick = () => {
    setShow(!show);
  };
 
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
          <div>
          {userNotification.length && userNotification.map((item,index) =>{
            return (
              <li key="item._id">{index}{item.text}</li>
            )
          })}
          </div>
         
        </ul>
      </li>
    </>
  );
};

export default notification;
