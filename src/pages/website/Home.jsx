import React from "react";
import { Slide } from "react-slideshow-image";
import { NavLink } from "react-router-dom";
import "react-slideshow-image/dist/styles.css";
import ServiceCategory from "../../components/clients/ServiceCategory";

import useBanner from "../../hooks/use-banner";
import Post from "../../components/clients/Post";

const HomePage = () => {
  const { data, error } = useBanner();
  if (!data) return <div>loading</div>;
  if (error) return <div>Failed loading</div>;
  return (
    <>
      <div className="slide-container">
        <Slide>
          {data?.map((item, index) => (
            <div className="each-slide" key={index}>
              <div style={{ backgroundImage: `url(${item?.image})` }}></div>
            </div>
          ))}
        </Slide>
      </div>

      <article className="w-full max-w-[1920px] px-[10px] mx-auto relative ">
        <div className="slide-container"></div>
        <div>
          <h2 className="text-center text-[#08541F] text-lg py-[30px] ">
            DỊCH VỤ THẨM MỸ HOT
          </h2>
          <div className="w-[1200px] grid grid-cols-[390px_1fr] gap-[20px] m-auto py-[30px] ">
            <div className="girdimage text-left bg-[#FBF1F0] rounded-md border-2 border-[#EACE83]">
              <img
                src="https://beautyspa4.shostweb.com/wp-content/uploads/2021/11/f2-big-dv1.jpg"
                alt=""
              />
              <div>
                <h5 className="text-center text-[#08541F] pt-[20px] text-base">
                  Nâng mũi Biscell
                </h5>
                <p className="px-[20px] text-[15px]">
                  Công nghệ nâng mũi độc quyền tại Thu Cúc, sử dụng sụn 2 lớp
                  Bistool Softxil nhập khẩu chính hãng từ Hàn Quốc, được Bộ Y tế
                  cấp phép sử dụng
                </p>
                <div className="text-center pb-[20px]">
                  <NavLink to={"/"}>
                    <button className="rounded-md bg-[#003C21] text-[#fff] px-[15px] py-[5px]">
                      Xem thêm
                    </button>
                  </NavLink>
                </div>
              </div>
            </div>
            <ServiceCategory />
          </div>
        </div>

        <div className="m-auto">
          <div className="bg-[url('https://beautyspa4.shostweb.com/wp-content/uploads/2021/11/f1-bg.jpg')]">
            <h2 className="text-center text-lg text-[#00502b]">
              ĐÁNH GIÁ TỪ KHÁCH HÀNG
            </h2>
            <div className="">
              <div className="w-[1200px] grid grid-cols-[400px_400px_400px] gap-[20px] m-auto py-[30px]">
                <div className="text-left bg-[#00502B] rounded-md border-2 border-[#EACE83]">
                  <div className="pt-[50px]">
                    <img
                      className="m-auto rounded-full"
                      src="https://beautyspa4.shostweb.com/wp-content/uploads/2021/11/the-nao-la-mat-phuong-7-150x150.jpg"
                      alt=""
                    />
                  </div>
                  <div className="reputation">
                    <img src={`../`} alt="" />
                  </div>
                  <div>
                    <h5 className="text-center text-[#FFF] pt-[20px]">
                      Dịch vụ tuyệt vời!
                    </h5>
                    <p className="px-[20px] text-[#FFF]">
                      Sau khi thực hiện liệu trình Tế Bào Gốc tại Beauty, Hô cảm
                      thấy bản thân khỏe mạnh hơn, không còn mệt mỏi, tinh thần
                      sảng khoái nên ăn ngon, ngủ sâu. Đặc biệt, làn da trở nên
                      sáng bóng, vô cùng mịn màng.
                    </p>
                    <div className="text-center pb-[20px]">
                      <h5 className="text-center text-[#FFF] pt-[20px]">
                        Anh Trung sky
                      </h5>{" "}
                    </div>
                  </div>
                </div>
                <div className="text-left bg-[#00502B] rounded-md border-2 border-[#EACE83]">
                  <div className="pt-[50px]">
                    <img
                      className="m-auto rounded-full"
                      src="https://beautyspa4.shostweb.com/wp-content/uploads/2021/11/the-nao-la-mat-phuong-7-150x150.jpg"
                      alt=""
                    />
                  </div>
                  <div className="reputation">
                    <img src={`../`} alt="" />
                  </div>
                  <div>
                    <h5 className="text-center text-[#FFF] pt-[20px]">
                      Dịch vụ tuyệt vời!
                    </h5>
                    <p className="px-[20px] text-[#FFF]">
                      Sau khi thực hiện liệu trình Tế Bào Gốc tại Beauty, Hô cảm
                      thấy bản thân khỏe mạnh hơn, không còn mệt mỏi, tinh thần
                      sảng khoái nên ăn ngon, ngủ sâu. Đặc biệt, làn da trở nên
                      sáng bóng, vô cùng mịn màng.
                    </p>
                    <div className="text-center pb-[20px]">
                      <h5 className="text-center text-[#FFF] pt-[20px]">
                        Anh Trung sky
                      </h5>{" "}
                    </div>
                  </div>
                </div>
                <div className="text-left bg-[#00502B] rounded-md border-2 border-[#EACE83]">
                  <div className="pt-[50px]">
                    <img
                      className="m-auto rounded-full"
                      src="https://beautyspa4.shostweb.com/wp-content/uploads/2021/11/the-nao-la-mat-phuong-7-150x150.jpg"
                      alt=""
                    />
                  </div>
                  <div className="reputation">
                    <img src={`../`} alt="" />
                  </div>
                  <div>
                    <h5 className="text-center text-[#FFF] pt-[20px]">
                      Dịch vụ tuyệt vời!
                    </h5>
                    <p className="px-[20px] text-[#FFF]">
                      Sau khi thực hiện liệu trình Tế Bào Gốc tại Beauty, Hô cảm
                      thấy bản thân khỏe mạnh hơn, không còn mệt mỏi, tinh thần
                      sảng khoái nên ăn ngon, ngủ sâu. Đặc biệt, làn da trở nên
                      sáng bóng, vô cùng mịn màng.
                    </p>
                    <div className="text-center pb-[20px]">
                      <h5 className="text-center text-[#FFF] pt-[20px]">
                        Anh Trung sky
                      </h5>{" "}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bannerslide ">
          <div className=" w-[1200px] m-auto ">
            <h2 className="text-center text-[#00502b] py-[20px] text-lg">
              REBORN TÁI SINH
            </h2>
            <p className="text-center text-base">
              “Reborn Tái sinh” là chương trình truyền hình thực tế về phẫu
              thuật thẩm mỹ do Hệ thống thẩm mỹ Bệnh viện Thu Cúc tổ chức với sự
              đồng hành của các chuyên gia, bác sĩ có trên 20 năm kinh nghiệm
              tạo hình thẩm mỹ và những người nổi tiếng hàng đầu tại Việt Nam.
              Chương trình tìm kiếm những thí sinh kém may mắn về ngoại hình để
              trao tấm vé phẫu thuật thẩm mỹ toàn diện miễn phí 100%, trị giá 1
              tỷ đồng/suất để giúp họ “tái sinh” nhan sắc, “tái sinh” cuộc đời.
            </p>

            <div className="grid grid-cols-[300px_300px_300px_300px] gap-[20px] py-[30px] ">
              <div>
                <img
                  src="https://thammythucuc.vn/wp-content/themes/thu-cuc-new/assets/images/fh3-mau2_truoc.jpg"
                  alt=""
                />
              </div>
              <div>
                <img
                  src="https://thammythucuc.vn/wp-content/themes/thu-cuc-new/assets/images/fh3-mau1_truoc.jpg"
                  alt=""
                />
              </div>
              <div>
                <img
                  src="https://thammythucuc.vn/wp-content/themes/thu-cuc-new/assets/images/fh3-mau2_truoc.jpg"
                  alt=""
                />
              </div>
              <div>
                <img
                  src="https://thammythucuc.vn/wp-content/themes/thu-cuc-new/assets/images/fh3-mau1_truoc.jpg"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
        <div className="posttime">
            <Post/>
          <div className="form-group-1 my-[20px] ">
            <div className="w-[1200px] form-group grid grid-cols-[340px_340px_1fr] gap-[10px] pb-[10px] m-auto  rounded-lg bg-[#cdcbcb] py-[40px] px-[30px]">
              <div>
                <img
                  src="https://beautyspa4.shostweb.com/wp-content/uploads/2021/12/imgw_lienhe_111.png"
                  alt=""
                  width="340px"
                />
              </div>
              <div>
                <img
                  src="https://beautyspa4.shostweb.com/wp-content/uploads/2021/11/imgw_datlich_111.jpg"
                  alt=""
                  width="340px"
                />
              </div>
              <div>
                <form action="" className="formrmd ">
                  <input
                    type="text"
                    className="rounded-md px-[15px] py-[15px] border-2 border-emerald-600"
                    placeholder="Ho va ten* "
                  />{" "}
                  <br />
                  <input
                    type="number"
                    className="rounded-md px-[15px] py-[15px] border-2 border-emerald-600"
                    placeholder="Số điện thoai* "
                  />{" "}
                  <br />
                  <p className="text-center">
                    (Mọi thông tin của khách hàng đều được bảo mật tuyệt đối)
                  </p>
                  <div className="text-center">
                    <a href="" className="text-[#00502b]">
                      <button className=" rounded-full bg-[#FFFFFF] px-[50px] py-[5px] border-2 border-emerald-600 ">
                        <b>Đặt Lịch</b>
                      </button>
                    </a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </article>
    </>
  );
};

export default HomePage;
