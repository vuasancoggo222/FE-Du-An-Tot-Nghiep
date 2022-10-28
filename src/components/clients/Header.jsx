import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "react-slideshow-image/dist/styles.css";
import { Avatar, Dropdown, Menu, Modal } from "antd";
import SignIn from "../../pages/website/SignIn";
import SignUp from "../../pages/website/SignUp";
import { isAuthenticate } from "../../utils/LocalStorage";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

const Header = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useState();
  const [user, setUser] = useState({});
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [modalText, setModalText] = useState("Content of the modal");
  const [ismolDal, setIsModal] = useState();

  const showModal = (e) => {
    setOpen(true);
    setIsModal(e.target.getAttribute("data"));
  };

  const handleSignIn = async () => {
    const user = await isAuthenticate();
    if (user) {
      setAuth(true);
      setUser(user);
      setOpen(false);
      if (user.role === 1) {
        navigate("/admin/booking/employee");
      } else if (user.role === 2) {
        navigate("/admin");
      }
    }
  };

  const handleSignUp = async () => {
    const signUp = await JSON.parse(localStorage.getItem("signup"));
    if (signUp) {
      setOpen(false);
    }
    localStorage.removeItem("signup");
  };

  const handleOk = () => {
    setModalText("The modal will be closed after two seconds");
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  // Kiểm tra nhấn signin/signup

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  const handleLogout = () => {
    console.log(1);
    localStorage.removeItem("user");
    message.success("Đăng xuất thành công.", 2);
    navigate("/");
    setAuth(false);
  };
  const menu = (
    <Menu
      items={[
        {
          key: "1",
          label: (
            <Link
              className="text-[5px] md:text-[8px] lg:text-[15px] xl:text-[15px] 2xl:text-[15px] w-[50px] mr-[30px]"
              to="user-information/me"
            >
              Hồ sơ của tôi
            </Link>
          ),
        },
        {
          key: "2",
          label: (
            <Link
              className="text-[5px] md:text-[8px] lg:text-[15px] xl:text-[15px] 2xl:text-[15px] w-[50px] mr-[30px]"
              to="/booking-history/me"
            >
              Lịch sử đặt lịch
            </Link>
          ),
        },
        {
          key: "3",
          label: (
            <button
              className="text-[5px] md:text-[8px] lg:text-[15px] xl:text-[15px] 2xl:text-[15px] w-[50px] mr-[30px]"
              onClick={handleLogout}
            >
              Đăng xuất
            </button>
          ),
        },
      ]}
    />
  );
  useEffect(() => {
    const user = isAuthenticate();
    if (user) {
      setAuth(true);
      setUser(user);
    }
  }, []);
  return (
    <>
      <div className="bg-[#005E2E] ">
        <header className="h-[80px] sm:w-[1200px] max-w-full m-auto py-[29px] justify-center">
          <div className="header-menu">
            <nav>
              <div className=" flex">
                <div>
                  <Link to={"/"}>
                    <img
                      className="flex w-[50px] sm:w-[100px] mr-[50px]"
                      src="https://beautyspa4.shostweb.com/wp-content/uploads/2021/12/logo-spa-4.svg"
                    />
                  </Link>
                </div>
                <div className="flex-auto w-84">
                  <Link to={"/"}>
                    <button className="text-[5px] md:text-[8px] lg:text-[15px] xl:text-[15px] 2xl:text-[15px] px-[10px] sm:px-[25px] text-[#fff]">
                      Trang chủ
                    </button>
                  </Link>
                  <Link to={`/products`}>
                    <button className="text-[5px] md:text-[8px] lg:text-[15px] xl:text-[15px] 2xl:text-[15px] px-[10px] sm:px-[25px] text-[#fff] ">
                      Sản phẩm
                    </button>
                  </Link>
                  <Link to={"/price-list"}>
                    <button className="text-[5px] md:text-[8px] lg:text-[15px] xl:text-[15px] 2xl:text-[15px] px-[10px] sm:px-[25px] text-[#fff]">
                      Dịch vụ
                    </button>
                  </Link>
                  <Link to={"/contact"}>
                    <button className="text-[5px] md:text-[8px] lg:text-[15px] xl:text-[15px] 2xl:text-[15px] px-[10px] sm:px-[25px] text-[#fff]">
                      Liên Hệ
                    </button>
                  </Link>
                  <Link to={"/news"}>
                    <button className="text-[5px] md:text-[8px] lg:text-[15px] xl:text-[15px] 2xl:text-[15px] px-[10px] sm:px-[25px] text-[#fff]">
                      Tin tức
                    </button>
                  </Link>
                </div>
                <div>
                  {auth ? (
                    <div
                      style={{ justifyItems: "center", display: "flex" }}
                      className=""
                    >
                      <button className="md:text-[8px] lg:text-[10px] xl:text-[15px] 2xl:text-[15px] sm:px-2 sm:w-[50px] lg:w-[100px] lg:inline-block text-[3px] w-[30px] rounded-md bg-[#003C21] border-2 border-emerald-500 block my-1">
                        <Link className="text-[#fff]" to={`/booking`}>
                          Đặt Lịch
                        </Link>
                      </button>
                      <Dropdown overlay={menu} placement="bottom">
                        <Avatar
                          style={{
                            marginLeft: "5px",
                            color: "#f56a00",
                            backgroundColor: "#fde3cf",
                          }}
                        >
                          {user.name.slice(0, 2)}
                        </Avatar>
                      </Dropdown>
                    </div>
                  ) : (
                    <div className="sm:flex-auto">
                      <button
                        data="signin"
                        onClick={showModal}
                        className="md:text-[8px] lg:text-[10px] xl:text-[15px] 2xl:text-[15px] sm:px-2 sm:w-[50px] lg:w-[100px] lg:inline-block text-[3px] w-[30px] rounded-md bg-[#003C21] border-2 border-emerald-500 block my-1 text-[#fff] "
                      >
                        Đăng nhập
                      </button>
                      <button
                        data="signup"
                        onClick={showModal}
                        className="md:text-[8px] lg:text-[10px] xl:text-[15px] 2xl:text-[15px] sm:px-2 sm:w-[50px] lg:w-[100px] lg:inline-block text-[3px] w-[30px] rounded-md bg-[#003C21] border-2 border-emerald-500 block my-1 text-[#fff] ml-3"
                      >
                        Đăng ký
                      </button>

                      <button className="md:text-[8px] lg:text-[10px] xl:text-[15px] 2xl:text-[15px] sm:px-2 sm:w-[50px] lg:w-[100px] lg:inline-block text-[3px] w-[30px] rounded-md bg-[#003C21] border-2 border-emerald-500 block my-1 ml-3">
                        <Link className="text-[#fff]" to={`/booking`}>
                          Đặt Lịch
                        </Link>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </nav>
          </div>
          <Modal
            open={open}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
            width={1000}
            footer={false}
          >
            <p>
              {ismolDal == "signin" ? (
                <SignIn handleSignIn={handleSignIn()} />
              ) : ismolDal == "signup" ? (
                <SignUp handleSignUp={handleSignUp()} />
              ) : (
                ""
              )}
            </p>
          </Modal>
        </header>
      </div>
    </>
  );
};

export default Header;
