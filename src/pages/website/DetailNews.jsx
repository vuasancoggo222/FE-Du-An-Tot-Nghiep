import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOnePost } from "../../api/post";

const News = () => {
  const { id } = useParams();
  const [post, setPosts] = useState();
  useEffect(() => {
    const data = async () => {
      const res = await getOnePost(id);
      setPosts(res);
      console.log(res);
    };
    data();
  }, []);
  return (
    <section className="flex bg-white max-w-[1200px] mx-auto mb-8 mt-8">
      <div className="w-[75%] pr-10">
        <div>
          <h1 className="text-[#00502b] text-center font-medium">Tin tức</h1>
          <h2 className="text-[#00502b] text-center text-3xl">{post?.title}</h2>

          <div className="centerimage">
            <div dangerouslySetInnerHTML={{ __html: post?.content }}></div>
          </div>
        </div>
        <div className="flex justify-between mt-10 border-t-2 border-black"></div>
        <div className="w-[100%]">
          <h3 className="text-xl text-[#00502b] mt-6">Tin liên quan</h3>
          <div className="flex justify-between">
            <img
              className="w-[270px] object-cover"
              src="https://beautyspa4.shostweb.com/wp-content/uploads/2021/11/tri-seo-loi-6.jpg"
              alt=""
            />
            <img
              className="w-[270px] object-cover"
              src="https://beautyspa4.shostweb.com/wp-content/uploads/2021/11/cay-mo-mong-2-1.jpg"
              alt=""
            />
            <img
              className="w-[270px] object-cover"
              src="https://beautyspa4.shostweb.com/wp-content/uploads/2021/11/243181645_2092348744251302_1527671312089282676_n-768x768-1.jpg"
              alt=""
            />
          </div>
        </div>
        <div>
          <h3 className="text-xl text-[#00502b] mt-10">Trả lời </h3>
          <p className="text-base mt-2">
            Email của bạn sẽ không được hiển thị công khai. Các trường bắt buộc
            được đánh dấu *
          </p>
          <p className="text-base mt-2 font-semibold">Bình luận *</p>
          <textarea
            className="border-2 border-[#e7e3e3] p-5 outline-[#ccc] text-lg w-[100%]"
            name=""
            id=""
            cols="80"
            rows="5"
          ></textarea>
          <div className="flex justify-between">
            <div className="flex flex-col w-[30%]">
              <label className="text-base mt-2 font-semibold">Tên *</label>
              <input
                className="border-2 border-[#e7e3e3] p-1 outline-[#ccc] text-lg"
                type="text"
                name=""
                id=""
              />
            </div>
            <div className="flex flex-col w-[30%]">
              <label className="text-base mt-2 font-semibold">Email *</label>
              <input
                className="border-2 border-[#e7e3e3] p-1 outline-[#ccc] text-lg"
                type="text"
                name=""
                id=""
              />
            </div>
            <div className="flex flex-col w-[30%]">
              <label className="text-base mt-2 font-semibold">Trang web</label>
              <input
                className="border-2 border-[#e7e3e3] p-1 outline-[#ccc] text-lg"
                type="text"
                name=""
                id=""
              />
            </div>
          </div>
          <input className="mr-2 mt-8" type="checkbox" name="" id="" />
          <strong>
            Lưu tên của tôi, email, và trang web trong trình duyệt này cho lần
            bình luận kế tiếp của tôi.
          </strong>{" "}
          <br />
          <button className="bg-[#00502b] hover:bg-[#0c452b] text-xl font-semibold pt-2 pb-2 pl-4 pr-4 text-white mt-8">
            PHẢN HỒI
          </button>
        </div>
      </div>
      <div className="w-[25%] ">
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
    </section>
  );
};

export default News;
