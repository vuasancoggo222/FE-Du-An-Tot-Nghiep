import React from 'react'

const EditEmployee = () => {
  return (
    <div>
          <div>
                <h1 className="mb-0 font-bold text-white capitalize text-center text-[50px]">Sửa Thông Tin Nhân Viên</h1>
            </div>
            <div className="flex items-center justify-center pt-52 pb-16 ">

                <div className="mx-auto w-full max-w-[950px]">
                    <form action="https://formbold.com/s/FORM_ID" method="POST">
                    <div className="mb-5">
                            <label
                                htmlFor="guest"
                                className="mb-3 block text-base font-medium text-[#07074D]"
                            >
                               Họ và Tên
                            </label>
                            <input
                                type="text"
                                name="guest"
                                id="guest"
                                placeholder=""
                                min="0"
                                className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-1.5 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            />
                        </div>
                        <div className="mb-5">
                            <label
                                htmlFor="guest"
                                className="mb-3 block text-base font-medium text-[#07074D]"
                            >
                               Email
                            </label>
                            <input
                                type="text"
                                name="guest"
                                id="guest"
                                placeholder=""
                                min="0"
                                className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-1.5 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            />
                        </div>
                        <div className="mb-5">
                            <label
                                htmlFor="guest"
                                className="mb-3 block text-base font-medium text-[#07074D]"
                            >
                               Phone
                            </label>
                            <input
                                type="text"
                                name="guest"
                                id="guest"
                                placeholder=""
                                min="0"
                                className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-1.5 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            />
                        </div>
                        <div className="mb-5">
                            <label
                                htmlFor="guest"
                                className="mb-3 block text-base font-medium text-[#07074D]"
                            >
                               CCCD/CMND
                            </label>
                            <input
                                type="text"
                                name="guest"
                                id="guest"
                                placeholder=""
                                min="0"
                                className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-1.5 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            />
                        </div>
                        <div className="mb-5">
                            <label
                                htmlFor="guest"
                                className="mb-3 block text-base font-medium text-[#07074D]"
                            >
                              Ảnh
                            </label>
                            <input
                                type="file"
                                name="guest"
                                id="guest"
                                placeholder=""
                                min="0"
                                className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-1.5 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            />
                        </div>

                        
                        <div className="mb-5">
                            <label className="mb-3 block text-base font-medium text-[#07074D]">
                                Giới Tính
                            </label>
                            <div className="flex items-center space-x-6">
                                <div className="flex items-center">
                                    <input
                                        type="radio"
                                        name="radio1"
                                        id="radioButton1"
                                        className="h-5 w-5"
                                    />
                                    <label
                                        htmlFor="radioButton1"
                                        className="pl-3 text-base font-medium text-[#07074D]"
                                    >
                                        Nam
                                    </label>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        type="radio"
                                        name="radio1"
                                        id="radioButton2"
                                        className="h-5 w-5"
                                    />
                                    <label
                                        htmlFor="radioButton2"
                                        className="pl-3 text-base font-medium text-[#07074D]"
                                    >
                                        Nữ
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div>
                            <button
                                className="hover:shadow-form rounded-md bg-[#6A64F1] py-2 px-8 text-center text-base font-semibold text-white outline-none"
                            >
                                Update
                            </button>
                        </div>
                    </form>
                </div>
            </div>
    </div>
  )
}

export default EditEmployee