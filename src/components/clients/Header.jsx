import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "react-slideshow-image/dist/styles.css";
import { Avatar, Dropdown, Menu, Modal } from "antd";
import SignIn from "../../pages/website/SignIn";
import SignUp from "../../pages/website/SignUp";
import { isAuthenticate } from "../../utils/LocalStorage";
import { useNavigate } from 'react-router-dom'
import { message } from 'antd'


const Header = () => {

  const navigate = useNavigate()
  const [auth, setAuth] = useState()
  const [user, setUser] = useState({})
  useEffect(() => {
    const user = isAuthenticate()
    if (user) {
      setAuth(true)
      setUser(user)
    }
  }, [])
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [modalText, setModalText] = useState("Content of the modal");
  const [ismolDal, setIsModal] = useState();
  const showModal = async (e) => {
    await setOpen(true);
    const footerModal = document.querySelector(".ant-modal-footer");
    footerModal.style.display = "none";
    setIsModal(e.target.getAttribute("data"));
  };

  const handleSignIn = () => {
    const user = isAuthenticate()
    if (user) {
      setAuth(true)
      setUser(user)
    }
    setOpen(false)
  }

  const handleOk = () => {
    setModalText("The modal will be closed after two seconds");
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  // Kiểm tra nhấn signin/signup
  const checkInUp = () => {
    console.log(ismolDal);
    if (ismolDal === "signin") {
      return <SignIn handleSignIn={handleSignIn} />;
    } else {
      return <SignUp />;
    }
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };
  const handleLogout = () => {
    console.log(1);
    localStorage.removeItem('user')
    message.success('Đăng xuất thành công.', 2)
    navigate('/')
    setAuth(false)
  }
  const menu = (
    <Menu
      items={[
        {
          key: '1',
          label: (
            <Link to="user-information/me">
              Hồ sơ của tôi
            </Link>
          ),
        },
        {
          key: '2',
          label: (
            <Link to="/booking-history/me">
              Lịch sử đặt lịch
            </Link>
          ),
        },
        {
          key: '3',
          label: (
            <button onClick={handleLogout}>Đăng xuất</button>
          ),
        },
      ]}
    />
  );
  return (
    <>
      <div className="bg-[#005E2E] ">
        <header className="h-[80px] w-[1920px] max-w-full m-auto py-[29px]  pl-[200px] ">
          <div className="header-menu">
            <nav>
              <div className=" flex">
                <Link to={"/"}>
                  <img
                    className="flex mr-[100px]"
                    src="https://beautyspa4.shostweb.com/wp-content/uploads/2021/12/logo-spa-4.svg"
                    width="100px"
                  />
                </Link>
                <div
                  style={{ justifyContent: "center" }}
                  className="flex-auto w-84"
                >
                  <Link to={"/"}>
                    <button className="px-[23px] text-[#fff]">Trang chủ</button>
                  </Link>
                  <Link to={`/products`}>
                    <button className="px-[23px] text-[#fff] ">Sản phẩm</button>
                  </Link>
                  <Link to={"/price-list"}>
                    <button className="px-[23px] text-[#fff]">Dịch vụ</button>
                  </Link>
                  <Link to={"/contact"}>
                    <button className="px-[23px] text-[#fff]">Liên Hệ</button>
                  </Link>
                </div>
                {auth ? <div className="flex-auto">
                  <button className=" mx-3 rounded-md bg-[#003C21] mr-5  border-2 border-emerald-500 px-3">
                    <Link className="text-[#fff]" to={`/booking`}>
                      Đặt Lịch
                    </Link>
                  </button>
                  <Dropdown overlay={menu} placement="bottom">
                    <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>{user.name.slice(0, 2)}</Avatar>
                  </Dropdown>
                </div> : <div className="flex-auto">
                  <button
                    data="signin"
                    onClick={showModal}
                    className=" mx-3 rounded-md bg-[#003C21] text-[#fff] border-2 border-emerald-500 px-3"
                  >
                    Đăng nhập
                  </button>
                  <button
                    data="signup"
                    onClick={showModal}
                    className=" mx-3 rounded-md bg-[#003C21] text-[#fff] border-2 border-emerald-500 px-3"
                  >
                    Đăng ký
                  </button>

                  <button className=" mx-3 rounded-md bg-[#003C21]  border-2 border-emerald-500 px-3">
                    <Link className="text-[#fff]" to={`/booking`}>
                      Đặt Lịch
                    </Link>
                  </button>
                </div>}
              </div>
            </nav>
          </div>
          <Modal
            open={open}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
            width={1000}
          >
            <p>{checkInUp()}</p>
          </Modal>
        </header>
      </div>
    </>
  );
};

export default Header;
