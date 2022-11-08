import React from "react";
import { Link } from "react-router-dom";

const DetailNews = () => {
  return (
    <section className="bg-white max-w-[1200px] mx-auto mb-8 mt-8">
      <div className="flex items-center ml-5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-8 h-8"
          color="#014b29"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
          />
        </svg>
        <h2 className="text-2xl text-[#014b29] mb-0 ml-3">Tin tức</h2>
      </div>
      <div className="flex">
        <div className="w-[75%] pr-10">
          <div className="flex flex-wrap">
            <Link
              to="/news/detail"
              className="w-[30%] border-2 border-[#f3dd82] rounded-xl mx-3 my-5"
            >
              <img
                className="rounded-t-[10px] w-[100%] h-[260px] object-cover"
                src="https://beautyspa4.shostweb.com/wp-content/uploads/2021/11/hut-mo-canh-tay-9.jpg"
                alt=""
              />
              <h2 className="text-center text-lg font-semibold mx-3 text-[#00502b]">
                Lấy lại đôi tay thon gọn nhờ hút mỡ tay
              </h2>
              <div className="w-8 h-[2px] bg-[#ccc] mx-auto"></div>
              <p className="text-center font-semibold mt-3 text-[14px] text-[#32394c]">
                Cánh tay to hay bắp tay ngấn mỡ, da chùng ảnh hưởng nhiều đến
                thẩm
              </p>
            </Link>
            <Link
              to=""
              className="w-[30%] border-2 border-[#f3dd82] rounded-xl mx-3 my-5"
            >
              <img
                className="rounded-t-[10px] w-[100%] h-[260px] object-cover"
                src="https://beautyspa4.shostweb.com/wp-content/uploads/2021/11/tri-seo-loi-6.jpg"
                alt=""
              />
              <h2 className="text-center text-lg font-semibold mx-3 text-[#00502b]">
                Lấy lại đôi tay thon gọn nhờ hút mỡ tay
              </h2>
              <div className="w-8 h-[2px] bg-[#ccc] mx-auto"></div>
              <p className="text-center font-semibold mt-3 text-[14px] text-[#32394c]">
                Cánh tay to hay bắp tay ngấn mỡ, da chùng ảnh hưởng nhiều đến
                thẩm
              </p>
            </Link>
            <Link
              to=""
              className="w-[30%] border-2 border-[#f3dd82] rounded-xl mx-3 my-5"
            >
              <img
                className="rounded-t-[10px] w-[100%] h-[260px] object-cover"
                src="https://beautyspa4.shostweb.com/wp-content/uploads/2021/11/mong-teo-lep.jpg"
                alt=""
              />
              <h2 className="text-center text-lg font-semibold mx-3 text-[#00502b]">
                Lấy lại đôi tay thon gọn nhờ hút mỡ tay
              </h2>
              <div className="w-8 h-[2px] bg-[#ccc] mx-auto"></div>
              <p className="text-center font-semibold mt-3 text-[14px] text-[#32394c]">
                Cánh tay to hay bắp tay ngấn mỡ, da chùng ảnh hưởng nhiều đến
                thẩm
              </p>
            </Link>
            <Link
              to=""
              className="w-[30%] border-2 border-[#f3dd82] rounded-xl mx-3 my-5"
            >
              <img
                className="rounded-t-[10px] w-[100%] h-[260px] object-cover"
                src="https://beautyspa4.shostweb.com/wp-content/uploads/2021/11/cay-mo-mong-2-1.jpg"
                alt=""
              />
              <h2 className="text-center text-lg font-semibold mx-3 text-[#00502b]">
                Lấy lại đôi tay thon gọn nhờ hút mỡ tay
              </h2>
              <div className="w-8 h-[2px] bg-[#ccc] mx-auto"></div>
              <p className="text-center font-semibold mt-3 text-[14px] text-[#32394c]">
                Cánh tay to hay bắp tay ngấn mỡ, da chùng ảnh hưởng nhiều đến
                thẩm
              </p>
            </Link>
            <Link
              to=""
              className="w-[30%] border-2 border-[#f3dd82] rounded-xl mx-3 my-5"
            >
              <img
                className="rounded-t-[10px] w-[100%] h-[260px] object-cover"
                src="https://beautyspa4.shostweb.com/wp-content/uploads/2021/11/tri-ran-da4.jpg"
                alt=""
              />
              <h2 className="text-center text-lg font-semibold mx-3 text-[#00502b]">
                Lấy lại đôi tay thon gọn nhờ hút mỡ tay
              </h2>
              <div className="w-8 h-[2px] bg-[#ccc] mx-auto"></div>
              <p className="text-center font-semibold mt-3 text-[14px] text-[#32394c]">
                Cánh tay to hay bắp tay ngấn mỡ, da chùng ảnh hưởng nhiều đến
                thẩm
              </p>
            </Link>
            <Link
              to=""
              className="w-[30%] border-2 border-[#f3dd82] rounded-xl mx-3 my-5"
            >
              <img
                className="rounded-t-[10px] w-[100%] h-[260px] object-cover"
                src="https://beautyspa4.shostweb.com/wp-content/uploads/2021/11/244584160_4758697530849800_957965771340671551_n-768x768-1.jpg"
                alt=""
              />
              <h2 className="text-center text-lg font-semibold mx-3 text-[#00502b]">
                Lấy lại đôi tay thon gọn nhờ hút mỡ tay
              </h2>
              <div className="w-8 h-[2px] bg-[#ccc] mx-auto"></div>
              <p className="text-center font-semibold mt-3 text-[14px] text-[#32394c]">
                Cánh tay to hay bắp tay ngấn mỡ, da chùng ảnh hưởng nhiều đến
                thẩm
              </p>
            </Link>
            <Link
              to=""
              className="w-[30%] border-2 border-[#f3dd82] rounded-xl mx-3 my-5"
            >
              <img
                className="rounded-t-[10px] w-[100%] h-[260px] object-cover"
                src="https://beautyspa4.shostweb.com/wp-content/uploads/2021/11/252509017_4823535007699385_2615811310447600500_n-768x768-1.jpg"
                alt=""
              />
              <h2 className="text-center text-lg font-semibold mx-3 text-[#00502b]">
                Lấy lại đôi tay thon gọn nhờ hút mỡ tay
              </h2>
              <div className="w-8 h-[2px] bg-[#ccc] mx-auto"></div>
              <p className="text-center font-semibold mt-3 text-[14px] text-[#32394c]">
                Cánh tay to hay bắp tay ngấn mỡ, da chùng ảnh hưởng nhiều đến
                thẩm
              </p>
            </Link>
            <Link
              to=""
              className="w-[30%] border-2 border-[#f3dd82] rounded-xl mx-3 my-5"
            >
              <img
                className="rounded-t-[10px] w-[100%] h-[260px] object-cover"
                src="https://beautyspa4.shostweb.com/wp-content/uploads/2021/11/243181645_2092348744251302_1527671312089282676_n-768x768-1.jpg"
                alt=""
              />
              <h2 className="text-center text-lg font-semibold mx-3 text-[#00502b]">
                Lấy lại đôi tay thon gọn nhờ hút mỡ tay
              </h2>
              <div className="w-8 h-[2px] bg-[#ccc] mx-auto"></div>
              <p className="text-center font-semibold mt-3 text-[14px] text-[#32394c]">
                Cánh tay to hay bắp tay ngấn mỡ, da chùng ảnh hưởng nhiều đến
                thẩm
              </p>
            </Link>
          </div>
        </div>
        <div className="w-[25%] ">
          <div className="border-2 border-[#00502B] border-t-transparent rounded-3xl text-center pb-4">
            <h2 className="bg-[#00502B] text-white text-[28px] font-bold text-center mb-0 rounded-tr-2xl rounded-tl-2xl">
              Thời gian làm việc
            </h2>
            <h2 className="text-[#00502B] text-[28px] font-bold">
              7H00 - 19H00
            </h2>
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
            <img
              className="w-[100%] mt-4 mb-6"
              src="https://thanhthuybeauty.com/wp-content/uploads/2020/10/banner-quang-cao-300x300.jpg"
              alt
            />
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
                <img
                  className="mr-2 w-[44px] h-[44px]"
                  src="https://thanhthuybeauty.com/wp-content/uploads/2020/10/tu-van-3-300x167.jpg"
                  alt
                />
                Rút chất liệu mũi là gì
              </a>
              <a
                className="flex text-[#036636] hover:text-[#008000] font-bold pb-3 pt-3"
                href
              >
                <img
                  className="mr-2 w-[44px] h-[44px]"
                  src="https://thanhthuybeauty.com/wp-content/uploads/2020/10/tu-van-4-300x200.jpg"
                  alt
                />
                Thu gọn cánh mũi
              </a>
              <a
                className="flex text-[#036636] hover:text-[#008000] font-bold pb-3 pt-3"
                href
              >
                <img
                  className="mr-2 w-[44px] h-[44px]"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGM9Gva3DiF5VIcb_OQV8-baXcstYB8Pay7g&usqp=CAU"
                  alt
                />
                Nâng mũi High-line
              </a>
              <a
                className="flex text-[#036636] hover:text-[#008000] font-bold pb-3 pt-3"
                href
              >
                <img
                  className="mr-2 w-[44px] h-[44px]"
                  src="https://thanhthuybeauty.com/wp-content/uploads/2020/10/96243980_3241418309244404_2262902871081091072_o-300x256.jpg"
                  alt
                />
                Nâng mũi NanoCell 4.0
              </a>
              <a
                className="flex text-[#036636] hover:text-[#008000] font-bold pb-3 pt-3"
                href
              >
                <img
                  className="mr-2 w-[44px] h-[44px]"
                  src="https://thanhthuybeauty.com/wp-content/uploads/2020/10/96372996_3233515503368018_4629360027893760000_o.jpg"
                  alt
                />
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
                <img
                  className="mr-2 w-[44px] h-[44px]"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUfp-LxsSFZkebtyf143IKldTeRbGZq1zemQ&usqp=CAU"
                  alt
                />
                Điêu khắc lông mày được bao lâu?
              </a>
              <a
                className="flex text-[#036636] hover:text-[#008000] pb-3 pt-3 font-bold"
                href
              >
                <img
                  className="mr-2 w-[44px] h-[44px]"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9g6bCNhOormxufV3rGvu9CHnLM8ju8Wn_aw&usqp=CAU"
                  alt
                />
                Điêu khắc lông mày hỏng có sửa được không?
              </a>
              <a
                className="flex text-[#036636] hover:text-[#008000] pb-3 pt-3 font-bold"
                href
              >
                <img
                  className="mr-2 w-[44px] h-[44px]"
                  src="https://thanhthuybeauty.com/wp-content/uploads/2020/10/tu-van-1-300x300.jpg"
                  alt
                />
                Có nên điêu khắc lông mày không??
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DetailNews;
