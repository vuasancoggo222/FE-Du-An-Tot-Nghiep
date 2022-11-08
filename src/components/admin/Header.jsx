import React from "react";
import Notification from "./notification";

const Header = () => {
  return (
    <>
      {/* Navbar */}
      <nav className="relative flex flex-wrap items-center justify-between px-0 py-2 mx-6 transition-all ease-in shadow-none duration-250 rounded-2xl lg:flex-nowrap lg:justify-start">
        <div className="flex items-center justify-between w-full px-4 py-1 mx-auto flex-wrap-inherit">
          <nav>
            {/* breadcrumb */}
            <ol className="flex flex-wrap pt-1 mr-12 bg-transparent rounded-lg sm:mr-16">
              <li className="text-sm leading-normal">
                <a className="text-white opacity-50" href="javascript:;">
                  Pages
                </a>
              </li>
              <li
                className="text-sm pl-2 capitalize leading-normal text-white before:float-left before:pr-2 before:text-white before:content-['/']"
                aria-current="page"
              >
                Dashboard
              </li>
            </ol>
          </nav>
          <div className="flex items-center mt-2 grow sm:mt-0 sm:mr-6 md:mr-0 lg:flex lg:basis-auto">
            <div className="flex items-center md:ml-auto md:pr-4">
              <div className="relative flex flex-wrap items-stretch w-full transition-all rounded-lg ease">
                <span className="text-sm ease leading-5.6 absolute z-50 -ml-px flex h-full items-center whitespace-nowrap rounded-lg rounded-tr-none rounded-br-none border border-r-0 border-transparent bg-transparent py-2 px-2.5 text-center font-normal text-slate-500 transition-all">
                  <i className="fas fa-search" />
                </span>
                <input
                  type="text"
                  className="pl-9 text-sm focus:shadow-primary-outline ease w-1/100 leading-5.6 relative -ml-px block min-w-0 flex-auto rounded-lg border border-solid border-gray-300 dark:bg-slate-850 dark:text-white bg-white bg-clip-padding py-2 pr-3 text-gray-700 transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none focus:transition-shadow"
                  placeholder="Type here..."
                />
              </div>
            </div>
            <ul className="flex flex-row justify-end pl-0 mb-0 list-none md-max:w-full">
              {/* online builder btn  */}
              {/* <li class="flex items-center">
              <a class="inline-block px-8 py-2 mb-0 mr-4 text-xs font-bold text-center text-blue-500 uppercase align-middle transition-all ease-in bg-transparent border border-blue-500 border-solid rounded-lg shadow-none cursor-pointer leading-pro hover:-translate-y-px active:shadow-xs hover:border-blue-500 active:bg-blue-500 active:hover:text-blue-500 hover:text-blue-500 tracking-tight-rem hover:bg-transparent hover:opacity-75 hover:shadow-none active:text-white active:hover:bg-transparent" target="_blank" href="https://www.creative-tim.com/builder/soft-ui?ref=navbar-dashboard&amp;_ga=2.76518741.1192788655.1647724933-1242940210.1644448053">Online Builder</a>
            </li> */}
              <li className="flex items-center">
                <a
                  href="../pages/sign-in.html"
                  className="block px-0 py-2 text-sm font-semibold text-white transition-all ease-nav-brand"
                >
                  <i className="fa fa-user sm:mr-1" />
                  <span className="hidden sm:inline">Sign In</span>
                </a>
              </li>
              <li className="flex items-center pl-4 xl:hidden">
                <a
                  href="javascript:;"
                  className="block p-0 text-sm text-white transition-all ease-nav-brand"
                >
                  <div className="w-4.5 overflow-hidden">
                    <i className="ease mb-0.75 relative block h-0.5 rounded-sm bg-white transition-all" />
                    <i className="ease mb-0.75 relative block h-0.5 rounded-sm bg-white transition-all" />
                    <i className="ease relative block h-0.5 rounded-sm bg-white transition-all" />
                  </div>
                </a>
              </li>
              <li className="flex items-center px-4">
                <a
                  href="javascript:;"
                  className="p-0 text-sm text-white transition-all ease-nav-brand"
                >
                  <i className="cursor-pointer fa fa-cog" />
                  {/* fixed-plugin-button-nav  */}
                </a>
              </li>
              <Notification />
            </ul>
          </div>
        </div>
      </nav>
      {/* end Navbar */}
      {/* cards */}

      {/* end cards */}
    </>
  );
};

export default Header;
