import React from "react";
import image from "../../../assets/img/image/1.jpg";
import image1 from "../../../assets/img/image/cham-soc-da-1.jpg";
import image2 from "../../../assets/img/image/GIAM-MO-BUNG.png";
import image3 from "../../../assets/img/image/nám.jpg";
import image4 from "../../../assets/img/image/tam trang.jpg";
import image5 from "../../../assets/img/image/xam may.jpg";
import image6 from "../../../assets/img/image/xoa xam.jpg";
import banner from "../../../assets/img/image/banner.jpg";

const SideBar = () => {
  return (
    <div className="w-[100%] md:w-[25%] ">
      <div className="border-2 border-[#00502B] border-t-transparent rounded-3xl text-center pb-4">
        <h2 className="bg-[#00502B] text-white text-[28px] font-bold text-center mb-0 rounded-tr-2xl rounded-tl-2xl">
          Thời gian làm việc
        </h2>
        <h2 className="text-[#00502B] text-[28px] font-bold">7H00 - 19H00</h2>
        <p className="text-[22px]">
          Từ <strong>thứ 2</strong> đến <strong>Chủ nhật</strong>
        </p>
      </div>
      <div className="text-[#00502B] border-2 border-[#00502B] border-t-transparent rounded-3xl mt-5">
        <h2 className="bg-[#00502B] text-white text-[28px] font-bold text-center mb-4 rounded-tr-2xl rounded-tl-2xl">
          Dịch vụ nổi bật
        </h2>
        <div className="px-4">
          <a
            className="block text-[#036636] hover:text-[#008000] font-bold pb-2"
            href
          >
            Điêu khắc lông mày được bao lâu?
          </a>
          <a
            className="block text-[#036636] hover:text-[#008000] font-bold pb-2"
            href
          >
            Điêu khắc lông mày hỏng có sửa được không?
          </a>
          <a
            className="block text-[#036636] hover:text-[#008000] font-bold pb-2"
            href
          >
            Có nên điêu khắc lông mày không?
          </a>
          <a
            className="block text-[#036636] hover:text-[#008000] font-bold pb-2"
            href
          >
            Chăm sóc sau khi nâng chân mày thế nào để nhanh lành?
          </a>
          <a
            className="block text-[#036636] hover:text-[#008000] font-bold pb-2"
            href
          >
            Phun môi collagen giá bao nhiêu tiền 1 lần?
          </a>
          <a
            className="block text-[#036636] hover:text-[#008000] font-bold pb-2"
            href
          >
            Phun môi có đánh son được không?
          </a>
        </div>
      </div>
      <div>
        <img className="w-[100%] mt-4 mb-6" src={banner} alt />
      </div>
      <div className="border-2 border-[#00502B] border-t-transparent rounded-3xl mt-5">
        <h2 className="bg-[#00502B] text-white text-[28px] font-bold text-center mb-4 rounded-tr-2xl rounded-tl-2xl">
          Có thể bạn quan tâm
        </h2>
        <div className="px-4">
          <a
            className="flex text-[#036636] hover:text-[#008000] font-bold pb-3 pt-3"
            href
          >
            <img className="mr-2 w-[44px] h-[44px]" src={image} alt />
            Rút chất liệu mũi là gì
          </a>
          <a
            className="flex text-[#036636] hover:text-[#008000] font-bold pb-3 pt-3"
            href
          >
            <img className="mr-2 w-[44px] h-[44px]" src={image1} alt />
            Thu gọn cánh mũi
          </a>
          <a
            className="flex text-[#036636] hover:text-[#008000] font-bold pb-3 pt-3"
            href
          >
            <img className="mr-2 w-[44px] h-[44px]" src={image2} alt />
            Nâng mũi High-line
          </a>
          <a
            className="flex text-[#036636] hover:text-[#008000] font-bold pb-3 pt-3"
            href
          >
            <img className="mr-2 w-[44px] h-[44px]" src={image3} alt />
            Nâng mũi NanoCell 4.0
          </a>
          <a
            className="flex text-[#036636] hover:text-[#008000] font-bold pb-3 pt-3"
            href
          >
            <img className="mr-2 w-[44px] h-[44px]" src={image4} alt />
            Nâng mũi BisCell
          </a>
        </div>
      </div>
      <div className="border-2 border-[#00502B] border-t-transparent rounded-3xl mt-5">
        <h2 className="bg-[#00502B] text-white text-[28px] font-bold text-center mb-0 rounded-tr-2xl rounded-tl-2xl">
          Xem video
        </h2>
        <video
          className="rounded-b-[22px] w-[100%]"
          src="./image/Rectangle.png"
          controls
        />
      </div>
      <div className="border-2 border-[#00502B] border-t-transparent rounded-3xl mt-5 ">
        <h2 className="bg-[#00502B] text-white text-[28px] font-bold text-center mb-0 rounded-tr-2xl rounded-tl-2xl">
          Câu chuyện khác hàng
        </h2>
        <div className="px-4">
          <a
            className="flex text-[#036636] hover:text-[#008000] pb-3 pt-3 font-bold"
            href
          >
            <img className="mr-2 w-[44px] h-[44px]" src={image5} alt />
            Điêu khắc lông mày được bao lâu?
          </a>
          <a
            className="flex text-[#036636] hover:text-[#008000] pb-3 pt-3 font-bold"
            href
          >
            <img className="mr-2 w-[44px] h-[44px]" src={image6} alt />
            Điêu khắc lông mày hỏng có sửa được không?
          </a>
          <a
            className="flex text-[#036636] hover:text-[#008000] pb-3 pt-3 font-bold"
            href
          >
            <img className="mr-2 w-[44px] h-[44px]" src={image} alt />
            Có nên điêu khắc lông mày không?
          </a>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
