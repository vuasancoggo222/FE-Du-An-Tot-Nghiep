import React from "react";

const Contact = () => {
  return (
    <div>
      <div className="bg-[#f4f4f4] m-auto">
        <div className="bg-[#01321f] py-[100px] ">
          <section>
            <div className="text-center text-[#FFF]">
              <h2 className="text-[#FFF] text-[30px]">Liên Hệ</h2>
              <p className="text-base">
                Beauty luôn lắng nghe, luôn luôn thấu hiểu
              </p>
            </div>
          </section>
        </div>
        <div className="container m-auto " style={{ maxWidth: "1313px" }}>
          <div className="container m-auto lg:px-24">
            <section className="grid sm:grid-cols-1 md:grid-cols-2 m-auto gap-[20px]">
              <div className="bg-white text-center py-[40px] px-[100px] mt-[-60px] h-[350px] mb-[20px] col-span-1">
                <button className="rounded-full bg-black px-[12px] py-[12px] ">
                  <i className="fa-solid fa-phone fa-2x text-white"></i>
                </button>
                <h2 className="text-lg font-bold leading-7 text-center text-[#01321f] mt-4">
                  Tư vấn{" "}
                </h2>
                <p className="mt-4 text-base">
                  Tư vấn về các dịch vụ làm đẹp tại Beauty
                </p>
                <div className="">
                  <div>
                    <button className="bg-[#00502b] px-[8px] py-[8px] text-white hover:bg-[#01321f] mt-4 text-lg font-semibold">
                      {" "}
                      <i className="fa-solid fa-comments fa-1x text-white px-[10px]"></i>{" "}
                      (028) 4455 7788
                    </button>
                  </div>
                </div>
              </div>
              <div className="bg-white text-center py-[40px] px-[100px] mt-[-60px] h-[350px] mb-[20px] col-span-1 ">
                <button className="rounded-full bg-black px-[10px] py-[13px]">
                  <i className="fa-solid fa-comments fa-2x text-white"></i>
                </button>
                <h2 className="text-lg font-bold leading-7 text-center text-[#01321f] mt-4">
                  Chăm sóc{" "}
                </h2>
                <p className="mt-4 text-base">
                  Lắng nghe, thay đổi để phát triển
                </p>
                <div className="">
                  <div>
                    <button className="bg-[#00502b] px-[8px] py-[8px] text-white hover:bg-[#01321f] mt-4 text-lg font-semibold">
                      {" "}
                      <i className="fa-solid fa-comments fa-1x text-white px-[10px]"></i>{" "}
                      (028) 4455 7788
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>
          <div className="container mx-auto lg:px-24 mb-4">
            <div className="bg-white w-full shadow rounded p-8 sm:p-12 ">
              <p className="text-2xl text-green-700 font-bold leading-7 text-center ">
                Để lại lời nhắn cho Beauty
              </p>
              <div className="lg:mx-36">
                <form action="" method="post">
                  <div className="md:flex items-center mt-8">
                    <div className="w-full flex flex-col">
                      <label className="font-semibold leading-none text-black-300">
                        Your name
                      </label>
                      <input
                        type="text"
                        className="border border-gray-300 leading-none  p-2 focus:outline-none focus:border-green-700 mt-4  bg-white rounded"
                      />
                    </div>
                  </div>
                  <div className="md:flex items-center mt-8">
                    <div className="w-full flex flex-col">
                      <label className="font-semibold leading-none text-black-300">
                        Your email
                      </label>
                      <input
                        type="text"
                        className="border border-gray-300 leading-none p-2 focus:outline-none focus:border-green-700 mt-4  bg-white rounded"
                      />
                    </div>
                  </div>
                  <div className="md:flex items-center mt-8">
                    <div className="w-full flex flex-col">
                      <label className="font-semibold leading-none text-black-300">
                        Tiêu đề:
                      </label>
                      <input
                        type="text"
                        className="border border-gray-300 leading-none p-2 focus:outline-none focus:border-green-700 mt-4  bg-white rounded"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="w-full flex flex-col mt-8">
                      <label className="font-semibold leading-none text-black-300">
                        Message
                      </label>
                      <textarea
                        type="text"
                        className=" border border-gray-300 h-40 text-base leading-none  p-2 focus:outline-none focus:border-green-700 mt-4 bg-white  rounded"
                      ></textarea>
                    </div>
                  </div>
                  <div className="flex items-center justify-start w-full">
                    <button className="mt-9 font-semibold leading-none text-white py-4 px-10 bg-green-700 rounded hover:bg-green-600 focus:ring-2 focus:ring-offset-2 focus:ring-green-700 focus:outline-none">
                      Send message
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
