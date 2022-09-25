
import React, { useState } from "react";
import {Link} from 'react-router-dom'
import 'react-slideshow-image/dist/styles.css';
import { Modal } from "antd";
import SignIn from "../../pages/website/SignIn";
import SignUp from "../../pages/website/SignUp";

const Header = () => {
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    // eslint-disable-next-line no-unused-vars
    const [modalText, setModalText] = useState('Content of the modal');
    const [ismolDal, setIsModal] = useState();
    const showModal = async (e) => {
      await setOpen(true);
      const footerModal = document.querySelector(".ant-modal-footer");
      footerModal.style.display = "none"
      setIsModal(e.target.getAttribute("data"))
  
    };
  
    const handleOk = () => {
      setModalText('The modal will be closed after two seconds');
      setConfirmLoading(true);
      setTimeout(() => {
        setOpen(false);
        setConfirmLoading(false);
      }, 2000);
    };
    // Kiểm tra nhấn signin/signup
    const checkInUp = () => {
      console.log(ismolDal)
      if (ismolDal === "signin") {
        return <SignIn />
      } else {
        return <SignUp />
      }
    }
  
    const handleCancel = () => {
      console.log('Clicked cancel button');
      setOpen(false);
    };
  return (
    <>
    <div  className="bg-[#005E2E] ">
      <header className="h-[80px] w-[1920px] max-w-full m-auto py-[29px]  pl-[200px] ">
          <div className="header-menu">
              <nav>
              <div className=" flex">
                <Link to={"/"}><img className="flex mr-[100px]" src="https://beautyspa4.shostweb.com/wp-content/uploads/2021/12/logo-spa-4.svg" width="100px"/></Link>
                <div style={{justifyContent:"center"}} className="flex-auto w-84">
                <Link to={"/"} ><button className="px-[23px] text-[#fff]" >Trang chủ</button></Link>
                <Link to={`/products`}><button className="px-[23px] text-[#fff] ">Sản phẩm</button></Link>
                <Link to={"/price-list"}><button className="px-[23px] text-[#fff]">Dịch vụ</button></Link>
                <Link to={"/contact"}><button className="px-[23px] text-[#fff]">Liên Hệ</button></Link>
                </div>
                <div className="flex-auto">
                <button data="signin" onClick={showModal} className=" mx-3 rounded-md bg-[#003C21] text-[#fff] border-2 border-emerald-500 px-3">Đăng nhập</button>
              <button data="signup" onClick={showModal} className=" mx-3 rounded-md bg-[#003C21] text-[#fff] border-2 border-emerald-500 px-3" >Đăng ký</button>
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
      >
        <p>
          {checkInUp()}
        </p>
      </Modal>
      </header>
    </div>
</>
  )
}

export default Header