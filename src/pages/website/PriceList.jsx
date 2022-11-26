import React from "react";
import SideBar from "./SideBar";

const PriceList = () => {
  return (
    <div>
      <section className="bg-white max-w-[1200px] mx-auto mb-8">
        <div className="flex mt-8 ">
          <div className="w-[75%] pr-10">
            <div className>
              <h2 className="text-[27px]">Bảng giá</h2>
              <p>
                Xin chào bạn - độc giả của <strong>Giuseart.com</strong>
              </p>
              <p className="pt-[23px] pb-[15px]">
                Lời đầu tiên, cho phép <strong>GiuseArt</strong> được gửi tới
                quý khách, quý thân nhân và bạn bè lời chúc sức khỏe, thành đạt
                và hạnh phúc.
              </p>
              <p>
                Cửa hàng được thành lập tháng 11/2016 dưới dạng Blog cá nhân,
                với mục đích ban đầu là nơi lưu trữ những hoặc những sản phẩm
                sáng tạo trong quá trình học tập, làm việc.
              </p>
              <p className="pt-[23px] pb-[15px]">
                Sau một thời gian hoạt động, website đã có những bước tiến đáng
                kể cả về chất lượng và hình thức. Số lượng khách truy cập
                website trở thành khách hàng sử dụng dịch vụ thiết kế tăng lên
                đáng kể. Từ việc chăm chút nội dung cho website theo sở thích,{" "}
                <strong>GiuseArt</strong> đã dần chinh phục khách hàng với những
                dịch vụ thiết kế sáng tạo uy tín và chất lượng.
              </p>
              <p>
                Tự tin với khả năng đáp ứng mọi yêu cầu thiết kế của khách hàng,{" "}
                <strong>GiuseArt</strong> chính thức đem lại dịch vụ Sự ủng hộ
                và tin tưởng của khách hàng sẽ trở thành nguồn cảm hứng lớn lao
                cho <strong>GiuseArt</strong> trong quá trình phác họa những ý
                tưởng thiết kế được trở thành hiện thực.
              </p>
              <p className="py-[15px]">
                Xin cám ơn sự tin tưởng và ủng hộ của quý khách trong thời gian
                qua.
              </p>
              <p>Trân trọng./.</p>
              <p className="py-[20px] font-bold">
                BẢNG GIÁ DỊCH VỤ PHẪU THUẬT THẨM MỸ
              </p>
              <p className="font-bold">
                (Đơn vị: 1000đ. Nhân số tiền ở cột “Giá dịch vụ” với 1.000đ để
                ra giá niêm yết theo đơn vị VND)
              </p>
              <p className="pt-[20px] pb-[29px] font-bold">
                BẢNG GIÁ PHẪU THUẬT THẨM MỸ MẮT
              </p>
            </div>
            <p className="ml-2 font-bold">PHẪU THUẬT THẨM MỸ MẮT</p>
            <div className="flex ">
              <h3 className="w-[90%] bg-[#008000] text-white pl-2 py-1">
                Tên dịch vụ
              </h3>
              <h3 className="w-[10%] bg-[#008000] text-white ml-[1px] pl-2 py-1">
                Giá dv
              </h3>
            </div>
            <ul>
              <li className="flex ml-2 my-2">
                <a
                  className="text-black w-[90%] hover:text-[#036636] font-normal"
                  href
                >
                  Cắt mí trên Pro Mini Deep/ Pro Open Deep Nanocell 4.0
                </a>
                <strong className="w-[10%] pl-2">24 triệu</strong>
              </li>
              <li className="flex ml-2 my-2">
                <a
                  className="text-black w-[90%] hover:text-[#036636] font-normal"
                  href
                >
                  Cắt mí trên Pro Mini Deep PCell / Pro Open Deep PCell
                </a>
                <strong className="w-[10%] pl-2">20 triệu</strong>
              </li>
              <li className="flex ml-2 my-2">
                <a
                  className="text-black w-[90%] hover:text-[#036636] font-normal"
                  href
                >
                  Cắt mí dưới Pro Open Deep PCell
                </a>
                <strong className="w-[10%] pl-2">18 triệu</strong>
              </li>
              <li className="flex ml-2 my-2">
                <a
                  className="text-black w-[90%] hover:text-[#036636] font-normal"
                  href
                >
                  Cắt mí trên Pro Deep Eyes
                </a>
                <strong className="w-[10%] pl-2">30 triệu</strong>
              </li>
              <li className="flex ml-2 my-2">
                <a
                  className="text-black w-[90%] hover:text-[#036636] font-normal"
                  href
                >
                  Cắt mí trên Pro Mini Deep/ Pro Open Deep
                </a>
                <strong className="w-[10%] pl-2">15 triệu</strong>
              </li>
              <li className="flex ml-2 my-2">
                <a
                  className="text-black w-[90%] hover:text-[#036636] font-normal"
                  href
                >
                  Lấy mỡ mí trên hoặc dưới
                </a>
                <strong className="w-[10%] pl-2">18 triệu</strong>
              </li>
              <li className="flex ml-2 my-2">
                <a
                  className="text-black w-[90%] hover:text-[#036636] font-normal"
                  href
                >
                  Cắt cung mày/ chân mày NanoCell 4.0
                </a>
                <strong className="w-[10%] pl-2">12 triệu</strong>
              </li>
              <li className="flex ml-2 my-2">
                <a
                  className="text-black w-[90%] hover:text-[#036636] font-normal"
                  href
                >
                  Cắt mí dưới Pro Mini Deep/ Pro Open Deep
                </a>
                <strong className="w-[10%] pl-2">14 triệu</strong>
              </li>
              <li className="flex ml-2 my-2">
                <a
                  className="text-black w-[90%] hover:text-[#036636] font-normal"
                  href
                >
                  Cắt cung mày/ chân mày Pcell
                </a>
                <strong className="w-[10%] pl-2">22 triệu</strong>
              </li>
              <li className="flex ml-2 my-2">
                <a
                  className="text-black w-[90%] hover:text-[#036636] font-normal"
                  href
                >
                  Cắt cung mày/ chân mày
                </a>
                <strong className="w-[10%] pl-2">26 triệu</strong>
              </li>
              <li className="flex ml-2 my-2">
                <a
                  className="text-black w-[90%] hover:text-[#036636] font-normal"
                  href
                >
                  Tạo hình sụp mí bẩm sinh độ 1 (1 bên)
                </a>
                <strong className="w-[10%] pl-2">10 triệu</strong>
              </li>
              <li className="flex ml-2 my-2">
                <a
                  className="text-black w-[90%] hover:text-[#036636] font-normal"
                  href
                >
                  Tạo hình sụp mí bẩm sinh độ 2 (1 bên)
                </a>
                <strong className="w-[10%] pl-2">12 triệu</strong>
              </li>
              <li className="flex ml-2 my-2">
                <a
                  className="text-black w-[90%] hover:text-[#036636] font-normal"
                  href
                >
                  Tạo hình sụp mí bẩm sinh độ 3 (1 bên)
                </a>
                <strong className="w-[10%] pl-2">14 triệu</strong>
              </li>
              <li className="flex ml-2 my-2">
                <a
                  className="text-black w-[90%] hover:text-[#036636] font-normal"
                  href
                >
                  Tạo hình sụp mí bẩm sinh độ 4 (1 bên)
                </a>
                <strong className="w-[10%] pl-2">15 triệu</strong>
              </li>
              <li className="flex ml-2 my-2">
                <a
                  className="text-black w-[90%] hover:text-[#036636] font-normal"
                  href
                >
                  Cắt xăm hỏng cung mày
                </a>
                <strong className="w-[10%] pl-2">23 triệu</strong>
              </li>
              <li className="flex ml-2 my-2">
                <a
                  className="text-black w-[90%] hover:text-[#036636] font-normal"
                  href
                >
                  Mở rộng góc mắt tạo mắt to tròn
                </a>
                <strong className="w-[10%] pl-2">22 triệu</strong>
              </li>
              <li className="flex ml-2 my-2">
                <a
                  className="text-black w-[90%] hover:text-[#036636] font-normal"
                  href
                >
                  Độn mắt sâu
                </a>
                <strong className="w-[10%] pl-2">17 triệu</strong>
              </li>
              <li className="flex ml-2 my-2">
                <a
                  className="text-black w-[90%] hover:text-[#036636] font-normal"
                  href
                >
                  Chữa mắt xếch
                </a>
                <strong className="w-[10%] pl-2">19 triệu</strong>
              </li>
              <li className="flex ml-2 my-2">
                <a
                  className="text-black w-[90%] hover:text-[#036636] font-normal"
                  href
                >
                  Chỉnh sửa mí mắt sau phẫu thuật (Độ khó thấp hoặc trung bình)
                </a>
                <strong className="w-[10%] pl-2">20 triệu</strong>
              </li>
              <li className="flex ml-2 my-2">
                <a
                  className="text-black w-[90%] hover:text-[#036636] font-normal"
                  href
                >
                  Chỉnh sửa mí mắt sau phẫu thuật (Độ khó cao)
                </a>
                <strong className="w-[10%] pl-2">28 triệu</strong>
              </li>
              <li className="flex ml-2 my-2">
                <a
                  className="text-black w-[90%] hover:text-[#036636] font-normal"
                  href
                >
                  Cắt mí trên Pro Mini Deep/ Pro Open Deep Nanocell 4.0
                </a>
                <strong className="w-[10%] pl-2">11 triệu</strong>
              </li>
              <li className="flex ml-2 my-2">
                <a
                  className="text-black w-[90%] hover:text-[#036636] font-normal"
                  href
                >
                  Cắt mí dưới Pro Mini Deep/ Pro Open Deep
                </a>
                <strong className="w-[10%] pl-2">16 triệu</strong>
              </li>
            </ul>
            <p className="mt-5">
              Quý khách click vào đây để nhận được những ưu đãi mới nhất tại Thu
              Cúc về dịch vụ cắt mí mắt
            </p>
          </div>
          <SideBar />
        </div>
      </section>
    </div>
  );
};

export default PriceList;
