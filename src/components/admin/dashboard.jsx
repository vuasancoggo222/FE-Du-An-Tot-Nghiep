/* eslint-disable react/no-unknown-property */
import { DatePicker } from "antd";
import React, { useEffect, useState } from "react";
import { httpGetAll } from "../../api/booking";
import { httpGetEmployees } from "../../api/employee";
import { httpGetAllService } from "../../api/services";
import { httpGetAllUser } from "../../api/user";
import moment from "moment";
const Dashboard = () => {
  const [booking, setBooking] = useState();
  const [employees, setEmployees] = useState();
  const [user, setUser] = useState();
  const [service, setService] = useState();
  const [serviceFilter, setServiceFilter] = useState("");
  const [monthFilter, setMonthFilter] = useState(moment().format("YYYY-MM"));
  const [dateFilter, setDateFilter] = useState("")
  const [yearFilter, setYearFilter] = useState("")
  const [chartLable, setChartLable] = useState("Doanh thu");
  const [dataChart, setDataChart] = useState();
  const [dataChartFirst, setDataChartFirst] = useState();
  const [chartYear, setChartYear] = useState();
  const [tatalChartBefor, setTatalChartBefor] = useState();
  const [isChart, setIsChart] = useState("turnover");
  
  function formatCash(str) {
    const string = str.toString()
    return string.split('').reverse().reduce((prev, next, index) => {
      return ((index % 3) ? next : (next + ',')) + prev
    })
  }

  const renderDate = (value) => {
    const d = new Date(value)
    let date = d.getDate();
    let month = d.getMonth() + 1;
    if (date.toString().length == 1) {
      date = `0${date}`;
    }
    if (month.toString().length == 1) {
      month = `0${month}`;
    }
    return `${d.getFullYear()}-${month}-${date}`;
  }

  const renderYear = (value) => {
    const d = new Date(value)
    return d.getFullYear();
  }



  const countCustomerByEmployee = (idEmployee) => {
    let coutn = 0
    const thisday = new Date();
    const today = `${thisday.getFullYear()}-${thisday.getMonth() + 1}-${thisday.getDate()}`
    booking?.forEach((item) => {
      let dayItem = renderDate(item.date)
      if (item.employeeId != undefined) {
        if (idEmployee == item.employeeId?._id && dayItem == today && item.status != 0 && item.status != 2 && item.status != 5) {
          coutn += 1
        }
      }
    })
    return coutn
  }

  const renderMonth = (value) => {
    const d = new Date(value)
    let month = d.getMonth() + 1;
    if (month.toString().length == 1) {
      month = `0${month}`;
    }
    return `${d.getFullYear()}-${month}`;
  }

  const onChangeMonthService = (date, dateString) => {
    if (dateString == "") {
      setServiceFilter("")
    } else {
      setServiceFilter(dateString)
    }
  };

  const changeDateFilter = (date, dateString) => {
    if (dateString == "") {
      setDateFilter("")
    } else {
      setMonthFilter("")
      setDateFilter(dateString)
      setYearFilter("")
    }
  };

  const changeMonthFilter = (date, dateString) => {
    if (dateString == "") {
      setMonthFilter("")
    } else {
      setMonthFilter(dateString)
      setDateFilter("")
      setYearFilter("")
    }
  };

  const changeYearFilter = (date, dateString) => {
    if (dateString == "") {
      setYearFilter("")
    } else {
      setYearFilter(dateString)
      setDateFilter("")
      setMonthFilter("")
    }
  };

  const onChangeYearChart = (date, dateString) => {
    // setYearFilter("2022")
    // setMonthFilter("")
    // setDateFilter("")
    let year = dateString
    const d = new Date()
    if (dateString == "") {
      year = d.getFullYear()
    }
    let arrData = []
    let count;
    for (let i = 0; i <= 11; i++) {
      count = 0;
      let month;
      if ((i + 1).toString().length == 1) {
        month = `${year}-0${i + 1}`
      } else {
        month = `${year}-${i + 1}`
      }
      if (isChart == "turnover") {
        setChartLable("Doanh thu")
      } else if (isChart == "booking") {
        setChartLable("Hoàn thành")
      } else if (isChart == "userBad") {
        setChartLable("Hẹn xấu")
      } else if (isChart == "newUser") {
        setChartLable("Khách mới")
      }
      booking?.map((item) => {
        if (isChart == "turnover") {
          if (renderMonth(item.date) == month && item.status == 4) {
            count += item.serviceId[0].price
          }
        } else if (isChart == "booking") {
          if (renderMonth(item.date) == month && item.status == 4) {
            count += 1
          }
        }
        else if (isChart == "userBad") {
          if (renderMonth(item.date) == month && item.status == 5) {
            count += 1
          }
        }
      })
      if (isChart == "newUser") {
        user?.map((item) => {
          if (renderMonth(item.createdAt) == month) {
            count += 1
          }
        })
      }
      arrData.push(count)
    }
    setDataChart(arrData)
    setChartYear(dateString)
  };

  const countCustomerSpaIngByEmployee = (idEmployee) => {
    let coutn = 0
    const thisday = new Date();
    const today = `${thisday.getFullYear()}-${thisday.getMonth() + 1}-${thisday.getDate()}`
    booking?.forEach((item) => {
      let dayItem = renderDate(item.date)
      if (idEmployee == item.employeeId?._id && dayItem == today && item.status == 3) {
        coutn += 1
      }
    })
    return coutn
  }

  const countCustomerSpaSuccessByEmployee = (idEmployee) => {
    let coutn = 0
    const thisday = new Date();
    const today = `${thisday.getFullYear()}-${thisday.getMonth() + 1}-${thisday.getDate()}`
    booking?.forEach((item) => {
      let dayItem = renderDate(item.date)
      if (idEmployee == item.employeeId?._id && dayItem == today && item.status == 4) {
        coutn += 1
      }
    })
    return coutn
  }

  const colorbyRevenue = (revenue) => {
    if (revenue <= 33) {
      return "red"
    } else if (revenue <= 66) {
      return "blue"
    } else {
      return "#13c2c2"
    }
  }

  const countCustomerDone = () => {
    let coutn = 0
    let isCheck = ""
    booking?.forEach((item) => {
      let timeItem
      if (monthFilter != "") {
        timeItem = renderMonth(item.date)
        isCheck = monthFilter
      } else if (dateFilter != "") {
        timeItem = renderDate(item.date)
        isCheck = dateFilter
      } else {
        timeItem = renderYear(item.date)
        isCheck = yearFilter
      }
      if (item.status == 4 && timeItem == isCheck) {
        coutn += 1
      }
    })
    return coutn
  }

  const thisday = new Date();
  const today = `${thisday.getFullYear()}-${thisday.getMonth() + 1}-${thisday.getDate()}`

  const countCustomerIng = () => {
    let coutn = 0
    const thisday = new Date();
    const today = `${thisday.getFullYear()}-${thisday.getMonth() + 1}-${thisday.getDate()}`
    booking?.forEach((item) => {
      let dayItem = renderDate(item.date)
      if (item.status == 3 && dayItem == today) {
        coutn += 1
      }
    })
    return coutn
  }

  const countUserNew = () => {
    let coutn = 0
    let isCheck = ""
    user?.forEach((item) => {
      let timeItem
      if (monthFilter != "") {
        timeItem = renderMonth(item.createdAt)
        isCheck = monthFilter
      } else if (dateFilter != "") {
        timeItem = renderDate(item.createdAt)
        isCheck = dateFilter
      } else {
        timeItem = renderYear(item.createdAt)
        isCheck = yearFilter
      }
      if (timeItem == isCheck) {
        coutn += 1
      }
    })
    return coutn
  }

  const countCustomerBad = () => {
    let coutn = 0
    let isCheck = ""
    booking?.forEach((item) => {
      let timeItem
      if (monthFilter != "") {
        timeItem = renderMonth(item.date)
        isCheck = monthFilter
      } else if (dateFilter != "") {
        timeItem = renderDate(item.date)
        isCheck = dateFilter
      } else {
        timeItem = renderYear(item.date)
        isCheck = yearFilter
      }
      if (item.status == 5 && timeItem == isCheck) {
        coutn += 1
      }
    })
    return coutn
  }

  const countBookingWait = () => {
    let coutn = 0
    const thisday = new Date();
    const today = `${thisday.getFullYear()}-${thisday.getMonth() + 1}-${thisday.getDate()}`
    booking?.forEach((item) => {
      let dayItem = renderDate(item.date)
      if (item.status == 0 && dayItem == today) {
        coutn += 1
      }
    })
    return coutn
  }

  const countBookingSuccess = () => {
    let coutn = 0
    const thisday = new Date();
    const today = `${thisday.getFullYear()}-${thisday.getMonth() + 1}-${thisday.getDate()}`
    booking?.forEach((item) => {
      let dayItem = renderDate(item.date)
      if (item.status == 1 && dayItem == today) {
        coutn += 1
      }
    })
    return coutn
  }

  const getMoneyThisDay = () => {
    let coutn = 0
    let isCheck = ""
    booking?.forEach((item) => {
      let timeItem
      if (monthFilter != "") {
        timeItem = renderMonth(item.date)
        isCheck = monthFilter
      } else if (dateFilter != "") {
        timeItem = renderDate(item.date)
        isCheck = dateFilter
      } else {
        timeItem = renderYear(item.date)
        isCheck = yearFilter
      }
      if (item.status == 4 && timeItem == isCheck) {
        coutn += item.serviceId[0].price
      }
    })
    return coutn
  }

  const countEmployee = () => {
    let count = 0;
    employees?.forEach((item) => {
      if (item.status == 1) {
        count += 1
      }
    })
    return count
  }

  const percentServiceOfRevenue = (IdService) => {
    let totalService = 0;
    let totalRevenue = 0;
    if (serviceFilter == "") {
      booking?.forEach((item) => {
        if (item.status == 4) {
          totalRevenue += item.serviceId[0].price
        }
        if (item.status == 4 && item.serviceId[0]._id == IdService) {
          totalService += item.serviceId[0].price
        }
      })
    } else {
      booking?.forEach((item) => {
        if (item.status == 4 && renderMonth(item.date) == serviceFilter) {
          totalRevenue += item.serviceId[0].price
        }
        if (item.status == 4 && item.serviceId[0]._id == IdService && renderMonth(item.date) == serviceFilter) {
          totalService += item.serviceId[0].price
        }
      })
    }
    if (totalRevenue == 0) {
      return 0
    }
    return (totalService * 100 / totalRevenue).toString().substring(0, 5)
  }

  const renderPreviousChart = () => {
    let sum = 0;

    if (!dataChart) {
      dataChartFirst?.forEach((item) => {
        sum += item
      })
    } else {
      dataChart?.forEach((item) => {
        sum += item
      })
    }
    const result = sum - tatalChartBefor * 100
    if (result.toString().indexOf(".")) {
      return result.toString().substring(0, 5)
    }
    return result
  }

  const handleChooseChart = (e) => {
    const isChart = e.target.getAttribute("data");
    const d = new Date();
    let year = d.getFullYear();
    console.log(chartYear);
    if (chartYear != undefined) {
      year = chartYear
    }
    let arrData = []
    let count = 0;
    let countBefor = 0;
    for (let i = 0; i <= 11; i++) {
      count = 0;
      let month;
      let monthBefor;
      if ((i + 1).toString().length == 1) {
        month = `${year}-0${i + 1}`
        monthBefor = `${year - 1}-0${i + 1}`
      } else {
        month = `${year}-${i + 1}`
        monthBefor = `${year - 1}-${i + 1}`
      }
      if (isChart == "turnover") {
        setChartLable("Doanh thu")
      } else if (isChart == "booking") {
        setChartLable("Lượt hoàn thành")
      } else if (isChart == "userBad") {
        setChartLable("Khách hẹn xấu")
      } else if (isChart == "newUser") {
        setChartLable("Khách mới")
      }
      booking?.map((item) => {
        if (isChart == "turnover") {
          if (renderMonth(item.date) == month && item.status == 4) {
            count += item.serviceId[0].price
          }
          if (renderMonth(item.date) == monthBefor && item.status == 4) {
            countBefor += item.serviceId[0].price
          }
        } else if (isChart == "booking") {
          if (renderMonth(item.date) == month && item.status == 4) {
            count += 1
          }
          if (renderMonth(item.date) == monthBefor && item.status == 4) {
            countBefor += 1
          }
        }
        else if (isChart == "userBad") {
          if (renderMonth(item.date) == month && item.status == 5) {
            count += 1
          }
          if (renderMonth(item.date) == monthBefor && item.status == 5) {
            countBefor += 1
          }
        }
      })
      if (isChart == "newUser") {
        user?.map((item) => {
          if (renderMonth(item.createdAt) == month) {
            count += 1
          }
          if (renderMonth(item.createdAt) == monthBefor) {
            countBefor += 1
          }
        })
      }
      arrData.push(count)
    }
    setIsChart(isChart)
    setDataChart(arrData)
    setTatalChartBefor(countBefor)

  }
  // const thismonth = new Date();
  // const month = `${thismonth.getFullYear()}-${thismonth.getMonth() + 1}`
  // setMonthFilter(month)

  useEffect(() => {
   
    const getBooking = async () => {
      const res = await httpGetAll();
      await setBooking(res)
      const d = new Date();
      let year = d.getFullYear();
      let arrData = []
      let count = 0;
      let countBefor = 0;
      for (let i = 0; i <= 11; i++) {
        count = 0;
        let month;
        let monthBefor;
        if ((i + 1).toString().length == 1) {
          month = `${year}-0${i + 1}`
          monthBefor = `${year - 1}-0${i + 1}`
        } else {
          month = `${year}-${i + 1}`
          monthBefor = `${year - 1}-${i + 1}`
        }
        res?.map((item) => {
          if (renderMonth(item.date) == month && item.status == 4) {
            count += item.serviceId[0].price
          }
          if (renderMonth(item.date) == monthBefor && item.status == 4) {
            countBefor += item.serviceId[0].price
          }
        })

        arrData.push(count)
      }
      setTatalChartBefor(countBefor)
      setDataChartFirst(arrData)

      if (document.querySelector("#chart-line")) {
        const ctx1 = document.getElementById("chart-line").getContext("2d");
        const gradientStroke1 = ctx1.createLinearGradient(0, 230, 0, 50);

        gradientStroke1.addColorStop(1, 'rgba(94, 114, 228, 0.2)');
        gradientStroke1.addColorStop(0.2, 'rgba(94, 114, 228, 0.0)');
        gradientStroke1.addColorStop(0, 'rgba(94, 114, 228, 0)');
        // eslint-disable-next-line no-undef
        myChart = new Chart(ctx1, {
          type: "line",
          data: {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            datasets: [{
              label: chartLable,
              tension: 0.4,
              borderWidth: 0,
              pointRadius: 0,
              borderColor: "#5e72e4",
              backgroundColor: gradientStroke1,
              // eslint-disable-next-line no-dupe-keys
              borderWidth: 3,
              fill: true,
              data: arrData,
              maxBarThickness: 6

            }],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false,
              }
            },
            interaction: {
              intersect: false,
              mode: 'index',
            },
            scales: {
              y: {
                grid: {
                  drawBorder: false,
                  display: true,
                  drawOnChartArea: true,
                  drawTicks: false,
                  borderDash: [5, 5]
                },
                ticks: {
                  display: true,
                  padding: 10,
                  color: '#fbfbfb',
                  font: {
                    size: 11,
                    family: "Open Sans",
                    style: 'normal',
                    lineHeight: 2
                  },
                }
              },
              x: {
                grid: {
                  drawBorder: false,
                  display: false,
                  drawOnChartArea: false,
                  drawTicks: false,
                  borderDash: [5, 5]
                },
                ticks: {
                  display: true,
                  color: '#ccc',
                  padding: 20,
                  font: {
                    size: 11,
                    family: "Open Sans",
                    style: 'normal',
                    lineHeight: 2
                  },
                }
              },
            },
          },
        });
      }
    }
    getBooking()

    const getEmployee = async () => {
      const res = await httpGetEmployees();
      setEmployees(res)
    }
    getEmployee()

    const getUser = async () => {
      const res = await httpGetAllUser();
      setUser(res)
    }
    getUser()

    const getService = async () => {
      const res = await httpGetAllService();
      setService(res)
    }
    getService()

    let myChart;
    if (dataChart) {
      if (document.querySelector("#chart-line")) {
        const ctx1 = document.getElementById("chart-line").getContext("2d");
        const gradientStroke1 = ctx1.createLinearGradient(0, 230, 0, 50);

        gradientStroke1.addColorStop(1, 'rgba(94, 114, 228, 0.2)');
        gradientStroke1.addColorStop(0.2, 'rgba(94, 114, 228, 0.0)');
        gradientStroke1.addColorStop(0, 'rgba(94, 114, 228, 0)');
        // eslint-disable-next-line no-undef
        myChart = new Chart(ctx1, {
          type: "line",
          data: {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            datasets: [{
              label: chartLable,
              tension: 0.4,
              borderWidth: 0,
              pointRadius: 0,
              borderColor: "#5e72e4",
              backgroundColor: gradientStroke1,
              // eslint-disable-next-line no-dupe-keys
              borderWidth: 3,
              fill: true,
              data: dataChart,
              maxBarThickness: 6

            }],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false,
              }
            },
            interaction: {
              intersect: false,
              mode: 'index',
            },
            scales: {
              y: {
                grid: {
                  drawBorder: false,
                  display: true,
                  drawOnChartArea: true,
                  drawTicks: false,
                  borderDash: [5, 5]
                },
                ticks: {
                  display: true,
                  padding: 10,
                  color: '#fbfbfb',
                  font: {
                    size: 11,
                    family: "Open Sans",
                    style: 'normal',
                    lineHeight: 2
                  },
                }
              },
              x: {
                grid: {
                  drawBorder: false,
                  display: false,
                  drawOnChartArea: false,
                  drawTicks: false,
                  borderDash: [5, 5]
                },
                ticks: {
                  display: true,
                  color: '#ccc',
                  padding: 20,
                  font: {
                    size: 11,
                    family: "Open Sans",
                    style: 'normal',
                    lineHeight: 2
                  },
                }
              },
            },
          },
        });
      }
    }
    return () => {
      if (myChart) {
        myChart.destroy()
      }
    }
  }, [dataChart])
  return (
    <>
      <div className="w-full px-6 py-6 mx-auto">
        <div style={{ height: "150px" }} >
          <h1 style={{ justifyContent: "space-between", alignItems: "center" }} className="mb-0 font-bold text-white capitalize text-center text-[50px]">
            <span>Dashboard</span> <br />
            <span style={{ fontSize: "20px", }}> {monthFilter? monthFilter : dateFilter? dateFilter : yearFilter}</span>
          </h1>
        </div>
        <div className="flex flex-wrap -mx-3">

          {/* card1 */}
          <div className="w-full max-w-full px-3 mb-6 sm:w-1/2 sm:flex-none xl:mb-0 xl:w-1/4">
            <div className="relative flex flex-col min-w-0 break-words bg-white shadow-xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl bg-clip-border">
              <div className="flex-auto p-4">
                <div className="flex flex-row -mx-3">
                  <div className="flex-none w-2/3 max-w-full px-3">
                    <div>
                      <p className="mb-0 font-sans text-sm font-semibold leading-normal uppercase dark:text-white dark:opacity-60">
                        Doanh thu (Vnđ)
                      </p>
                      <h5 className="mb-2 font-bold dark:text-white">
                        {formatCash(getMoneyThisDay())}
                      </h5>
                      <p className="mb-0 dark:text-white dark:opacity-60">
                        <button><span data="turnover" onClick={handleChooseChart} className="text-sm font-bold leading-normal text-emerald-500">
                          Xem biểu đồ
                        </span></button>
                        {/* since yesterday */}
                      </p>
                    </div>
                  </div>
                  <div className="px-3 text-right basis-1/3">
                    <div className="inline-block w-12 h-12 text-center rounded-circle bg-gradient-to-tl ">
                      <img src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/000000/external-assets-factory-flaticons-lineal-color-flat-icons-3.png" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* card2 */}
          <div className="w-full max-w-full px-3 mb-6 sm:w-1/2 sm:flex-none xl:mb-0 xl:w-1/4">
            <div className="relative flex flex-col min-w-0 break-words bg-white shadow-xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl bg-clip-border">
              <div className="flex-auto p-4">
                <div className="flex flex-row -mx-3">
                  <div className="flex-none w-2/3 max-w-full px-3">
                    <div>
                      <p className="mb-0 font-sans text-sm font-semibold leading-normal uppercase dark:text-white dark:opacity-60">
                        Khách hoàn thành
                      </p>
                      <h5 className="mb-2 font-bold dark:text-white">
                        {countCustomerDone()}
                      </h5>
                      <p className="mb-0 dark:text-white dark:opacity-60">
                        <button> <span onClick={handleChooseChart} data="booking" className="text-sm font-bold leading-normal text-emerald-500">
                          Xem biểu đồ
                        </span></button>
                        {/* since last week */}
                      </p>
                    </div>
                  </div>

                  <div className="px-3 text-right basis-1/3">
                    <div className="inline-block w-12 h-12 text-center rounded-circle bg-gradient-to-tl" >
                      <img src="https://img.icons8.com/cute-clipart/64/000000/ok.png" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* card3 */}
          <div className="w-full max-w-full px-3 mb-6 sm:w-1/2 sm:flex-none xl:mb-0 xl:w-1/4">
            <div className="relative flex flex-col min-w-0 break-words bg-white shadow-xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl bg-clip-border">
              <div className="flex-auto p-4">
                <div className="flex flex-row -mx-3">
                  <div className="flex-none w-2/3 max-w-full px-3">
                    <div>
                      <p className="mb-0 font-sans text-sm font-semibold leading-normal uppercase dark:text-white dark:opacity-60">
                        Khách hẹn xấu
                      </p>
                      <h5 className="mb-2 font-bold dark:text-white">
                        {countCustomerBad()}
                      </h5>
                      <p className="mb-0 dark:text-white dark:opacity-60">
                        <button><span data="userBad" onClick={handleChooseChart} className="text-sm font-bold leading-normal text-emerald-500">
                          Xem biểu đồ
                        </span></button>
                        {/* than last month */}
                      </p>
                    </div>
                  </div>
                  <div className="px-3 text-right basis-1/3">
                    <div className="inline-block w-12 h-12 text-center rounded-circle bg-gradient-to-tl ">
                      <img src="https://img.icons8.com/color/48/000000/reject-skin-type-7.png" />
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
          {/* card4 */}
          <div className="w-full max-w-full px-3 sm:w-1/2 sm:flex-none xl:w-1/4">
            <div className="relative flex flex-col min-w-0 break-words bg-white shadow-xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl bg-clip-border">
              <div className="flex-auto p-4">
                <div className="flex flex-row -mx-3">
                  <div className="flex-none w-2/3 max-w-full px-3">
                    <div>
                      <p className="mb-0 font-sans text-sm font-semibold leading-normal uppercase dark:text-white dark:opacity-60">
                        Khách hàng mới
                      </p>
                      <h5 className="mb-2 font-bold dark:text-white">{countUserNew()}</h5>
                      <p className="mb-0 dark:text-white dark:opacity-60">
                      </p>
                      <button><span data="newUser" onClick={handleChooseChart} className="text-sm font-bold leading-normal text-emerald-500">
                        Xem biểu đồ
                      </span></button>
                      {/* since yesterday */}
                    </div>
                  </div>
                  <div className="px-3 text-right basis-1/3">
                    <div className="inline-block w-12 h-12 text-center rounded-circle bg-gradient-to-tl ">
                      <img src="https://img.icons8.com/plasticine/100/000000/add-user-male.png" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mt-2">
          {/* card1 */}
          <div className="w-full max-w-full px-3 mb-6 sm:w-1/2 sm:flex-none xl:mb-0 xl:w-1/4">
            <div className="relative flex flex-col min-w-0 break-words bg-white shadow-xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl bg-clip-border">
              <div style={{ display: renderDate(today) == dateFilter ? "block" : "none" }} className="flex-auto p-4">
                <div className="flex flex-row -mx-3">
                  <div className="flex-none w-2/3 max-w-full px-3">
                    <div>
                      <p className="mb-0 font-sans text-sm font-semibold leading-normal uppercase dark:text-white dark:opacity-60">
                        Khách chờ xác nhận
                      </p>
                      <h5 className="mb-2 font-bold dark:text-white">
                        {countBookingWait()}
                      </h5>
                      <p className="mb-0 dark:text-white dark:opacity-60">
                        <span className="text-sm font-bold leading-normal text-emerald-500">
                          {/* +55% */}
                        </span>
                        {/* since yesterday */}
                      </p>
                    </div>
                  </div>
                  <div className="px-3 text-right basis-1/3">
                    <div className="inline-block w-12 h-12 text-center rounded-circle bg-gradient-to-tl">
                      <img src="https://img.icons8.com/external-sbts2018-lineal-color-sbts2018/58/000000/external-wait-lean-thinking-sbts2018-lineal-color-sbts2018.png" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* card2 */}
          <div className="w-full max-w-full px-3 mb-6 sm:w-1/2 sm:flex-none xl:mb-0 xl:w-1/4">
            <div className="relative flex flex-col min-w-0 break-words bg-white shadow-xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl bg-clip-border">

              <div style={{ display: renderDate(today) == dateFilter ? "block" : "none" }} className="flex-auto p-4">
                <div className="flex flex-row -mx-3">
                  <div className="flex-none w-2/3 max-w-full px-3">
                    <div>
                      <p className="mb-0 font-sans text-sm font-semibold leading-normal uppercase dark:text-white dark:opacity-60">
                        Khách dự kiến
                      </p>
                      <h5 className="mb-2 font-bold dark:text-white">
                        {countBookingSuccess()}
                      </h5>
                      <p className="mb-0 dark:text-white dark:opacity-60">
                        <span className="text-sm font-bold leading-normal text-emerald-500">
                          {/* +3% */}
                        </span>
                        {/* since last week */}
                      </p>
                    </div>
                  </div>
                  <div className="px-3 text-right basis-1/3">
                    <div className="inline-block w-12 h-12 text-center rounded-circle bg-gradient-to-tl ">
                      <img src="https://img.icons8.com/color/48/000000/reviewer-female.png" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* card3 */}
          <div className="w-full max-w-full px-3 mb-6 sm:w-1/2 sm:flex-none xl:mb-0 xl:w-1/4">
            <div className="relative flex flex-col min-w-0 break-words bg-white shadow-xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl bg-clip-border">
              <div style={{ display: renderDate(today) == dateFilter ? "block" : "none" }} className="flex-auto p-4">
                <div className="flex flex-row -mx-3">
                  <div className="flex-none w-2/3 max-w-full px-3">
                    <div>
                      <p className="mb-0 font-sans text-sm font-semibold leading-normal uppercase dark:text-white dark:opacity-60">
                        Nhân viên đang làm
                      </p>
                      <h5 className="mb-2 font-bold dark:text-white">{countEmployee()}</h5>
                      <p className="mb-0 dark:text-white dark:opacity-60">
                        <span className="text-sm font-bold leading-normal text-red-600">
                          {/* -2% */}
                        </span>
                        {/* since last quarter */}
                      </p>
                    </div>
                  </div>
                  <div className="px-3 text-right basis-1/3">
                    <div className="inline-block w-12 h-12 text-center rounded-circle bg-gradient-to-tl ">
                      <img src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/000000/external-spa-travel-agency-flaticons-lineal-color-flat-icons.png" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* card4 */}
          <div className="w-full max-w-full px-3 sm:w-1/2 sm:flex-none xl:w-1/4">
            <div className="relative flex flex-col min-w-0 break-words bg-white shadow-xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl bg-clip-border">
              <div style={{ display: renderDate(today) == dateFilter ? "block" : "none" }} className="flex-auto p-4">
                <div className="flex flex-row -mx-3">
                  <div className="flex-none w-2/3 max-w-full px-3">
                    <div>
                      <p className="mb-0 font-sans text-sm font-semibold leading-normal uppercase dark:text-white dark:opacity-60">
                        Khách đang Spa
                      </p>
                      <h5 className="mb-2 font-bold dark:text-white">
                        {countCustomerIng()}
                      </h5>
                      <p className="mb-0 dark:text-white dark:opacity-60">
                        <span className="text-sm font-bold leading-normal text-emerald-500">
                          {/* +5% */}
                        </span>
                        {/* than last month */}
                      </p>
                    </div>
                  </div>
                  <div className="px-3 text-right basis-1/3">
                    <div className="inline-block w-12 h-12 text-center rounded-circle bg-gradient-to-tl ">
                      <img src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/000000/external-spa-hairdresser-and-barber-shop-flaticons-lineal-color-flat-icons-3.png" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style={{ justifyContent: "space-between", alignItems: "center", marginTop: "20px", fontWeight: "bold" }} className="flex " >
          < DatePicker value={monthFilter == "" ? null : moment(monthFilter)} status="warning"
            style={{ float: "left", }} onChange={changeMonthFilter} picker="month" />

          < DatePicker value={yearFilter == "" ? null : moment(yearFilter)}  status="warning"
            style={{ float: "center" }} onChange={changeYearFilter} picker="year" />

          <DatePicker
            status="warning" value={dateFilter == "" ? null : moment(dateFilter)} onChange={changeDateFilter}
          />
        </div>
      </div>

      <div className="w-full px-6 py-6 mx-auto">
        {/* table 1 */}
        <div className="w-full max-w-full px-3 mt-0 lg:w-12/12 lg:flex-none">
          <div className="border-black/12.5 dark:bg-slate-850 dark:shadow-dark-xl shadow-xl relative z-20 flex min-w-0 flex-col break-words rounded-2xl border-0 border-solid bg-white bg-clip-border">
            <div className="p-6 pb-0 mb-0 border-b-0 border-b-solid rounded-t-2xl border-b-transparent">
              <div className="">
                <div style={{ justifyContent: "center", alignItems: "center" }} className="flex " >
                  <span className="mb-0 font-bold text-black capitalize text-center text-[50px]" style={{ fontSize: "20px" }}> {chartYear ? chartYear : "Năm Nay"}</span>
                </div>
                <h6 className="capitalize dark:text-white">{chartLable}  </h6>
                < DatePicker status="warning"
                  style={{ float: "right", fontWeight: "bold" }} onChange={onChangeYearChart} picker="year" />
                <p className="mb-0 text-sm leading-normal dark:text-white dark:opacity-60">
                  <i className="fa fa-arrow-up text-emerald-500"></i>
                  <span className="font-semibold">{renderPreviousChart()}% so với</span>  {chartYear ? chartYear - 1 : "năm trước"}
                </p>
              </div>

            </div>

            <div className="flex-auto p-4">
              <div id="boxChart">
                <canvas id="chart-line" height="300"></canvas>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap -mx-3">
          <div className="flex-none w-full max-w-full px-3">
            <div className="relative flex flex-col min-w-0 mb-6 break-words bg-white border-0 border-transparent border-solid shadow-xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl bg-clip-border">
              <div className="p-6 pb-0 mb-0 border-b-0 border-b-solid rounded-t-2xl border-b-transparent">
                <h6 className="dark:text-white">Nhân viên</h6>
              </div>
              <div className="flex-auto px-0 pt-0 pb-2">
                <div className="p-0 overflow-x-auto">
                  <table className="items-center w-full mb-0 align-top border-collapse dark:border-white/40 text-slate-500">
                    <thead className="align-bottom">
                      <tr>
                        <th className="px-6 py-3 font-bold text-left uppercase align-middle bg-transparent border-b border-collapse shadow-none dark:border-white/40 dark:text-white text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">
                          Thông tin
                        </th>
                        <th className="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-collapse shadow-none dark:border-white/40 dark:text-white text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">
                          Trạng thái
                        </th>
                        <th className="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-collapse shadow-none dark:border-white/40 dark:text-white text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">
                          Tổng khách dự kiến
                        </th>
                        <th className="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-collapse shadow-none dark:border-white/40 dark:text-white text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">
                          Khách đang làm
                        </th>
                        <th className="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-collapse shadow-none dark:border-white/40 dark:text-white text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">
                          Khách hoàn thành
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {employees?.map((item) => {
                        return (
                          // eslint-disable-next-line react/jsx-key
                          <tr>
                            <td className="p-2 align-middle bg-transparent border-b dark:border-white/40 whitespace-nowrap shadow-transparent">
                              <div className="flex px-2 py-1">
                                <div>
                                  <img
                                    src={item.avatar}
                                    className="inline-flex items-center justify-center mr-4 text-sm text-white transition-all duration-200 ease-in-out h-9 w-9 rounded-xl"
                                    alt="user1"
                                  />
                                </div>
                                <div className="flex flex-col justify-center">
                                  <h6 className="mb-0 text-sm leading-normal dark:text-white">
                                    {item.name}
                                  </h6>
                                  <p className="mb-0 text-xs leading-tight dark:text-white dark:opacity-80 text-slate-400">
                                    {item.email}
                                  </p>
                                </div>
                              </div>
                            </td>

                            <td className="p-2 text-sm leading-normal text-center align-middle bg-transparent border-b dark:border-white/40 whitespace-nowrap shadow-transparent">
                              <span className={item.status == 1 ? "bg-gradient-to-tl from-emerald-500 to-teal-400 px-2.5 text-xs rounded-1.8 py-1.4 inline-block whitespace-nowrap text-center align-baseline font-bold uppercase leading-none text-white" : "bg-gradient-to-tl from-slate-600 to-slate-300 px-2.5 text-xs rounded-1.8 py-1.4 inline-block whitespace-nowrap text-center align-baseline font-bold uppercase leading-none text-white"}>
                                {item.status == 1 ? "online" : "offline"}
                              </span>
                            </td>
                            <td className="p-2 text-center align-middle bg-transparent border-b dark:border-white/40 whitespace-nowrap shadow-transparent">
                              <span className="text-xs font-semibold leading-tight dark:text-white dark:opacity-80 text-slate-400">
                                {countCustomerByEmployee(item._id)}
                              </span>
                            </td>
                            <td className="p-2 text-center align-middle bg-transparent border-b dark:border-white/40 whitespace-nowrap shadow-transparent">
                              <span className="text-xs font-semibold leading-tight dark:text-white dark:opacity-80 text-slate-400">
                                {countCustomerSpaIngByEmployee(item._id)}
                              </span>
                            </td>
                            <td className="p-2 text-center align-middle bg-transparent border-b dark:border-white/40 whitespace-nowrap shadow-transparent">
                              <span className="text-xs font-semibold leading-tight dark:text-white dark:opacity-80 text-slate-400">
                                {countCustomerSpaSuccessByEmployee(item._id)}
                              </span>
                            </td>

                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* card 2 */}
        <div className="flex flex-wrap -mx-3">
          <div className="flex-none w-full max-w-full px-3">
            <div className="relative flex flex-col min-w-0 mb-6 break-words bg-white border-0 border-transparent border-solid shadow-xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl bg-clip-border">
              <div className="p-6 pb-0 mb-0 border-b-0 border-b-solid rounded-t-2xl border-b-transparent">
                <h6 style={{ float: "left" }} className="dark:text-white">Dịch vụ </h6>< DatePicker status="warning"
                  style={{ float: "right", fontWeight: "bold" }} onChange={onChangeMonthService} picker="month" />
              </div>
              <div className="flex-auto px-0 pt-0 pb-2">
                <div className="p-0 overflow-x-auto">
                  <table className="items-center justify-center w-full mb-0 align-top border-collapse dark:border-white/40 text-slate-500">
                    <thead className="align-bottom">
                      <tr>
                        <th className="px-6 py-3 font-bold text-left uppercase align-middle bg-transparent border-b shadow-none dark:border-white/40 dark:text-white text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">
                          Thông tin
                        </th>
                        <th className="px-6 py-3 pl-2 font-bold text-left uppercase align-middle bg-transparent border-b shadow-none dark:border-white/40 dark:text-white text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">
                          Giá - vnđ
                        </th>
                        <th className="px-6 py-3 pl-2 font-bold text-left uppercase align-middle bg-transparent border-b shadow-none dark:border-white/40 dark:text-white text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">
                          Trạng thái
                        </th>
                        <th className="px-6 py-3 pl-2 font-bold text-center uppercase align-middle bg-transparent border-b shadow-none dark:border-white/40 dark:text-white text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">
                          Doanh thu
                        </th>

                      </tr>
                    </thead>
                    <tbody className="border-t">
                      {service?.map((item) => {
                        return (
                          // eslint-disable-next-line react/jsx-key
                          <tr style={{ backgroundColor: item.status == 1 ? "" : "#f4f4f4" }}>
                            <td className="p-2 align-middle bg-transparent border-b dark:border-white/40 whitespace-nowrap shadow-transparent">
                              <div className="flex px-2">
                                <div>
                                  <img
                                    src={item.image}
                                    className="inline-flex items-center justify-center mr-2 text-sm text-white transition-all duration-200 ease-in-out rounded-full h-9 w-9"
                                    alt="spotify"
                                  />
                                </div>
                                <div className="my-auto">
                                  <h6 className="mb-0 text-sm leading-normal dark:text-white">
                                    {item.name}
                                  </h6>
                                </div>
                              </div>
                            </td>
                            <td className="p-2 align-middle bg-transparent border-b dark:border-white/40 whitespace-nowrap shadow-transparent">
                              <p className="mb-0 text-sm font-semibold leading-normal dark:text-white dark:opacity-60">
                                {formatCash(item.price)}
                              </p>
                            </td>
                            <td className="p-2 align-middle bg-transparent border-b dark:border-white/40 whitespace-nowrap shadow-transparent">
                              <span style={{ color: item.status == 1 ? "#a0d911" : "#b83a1b" }} className="  text-xs font-semibold leading-tight dark:text-white dark:opacity-60">
                                {item.status == 1 ? "Kinh doanh" : "Dừng kinh doanh"}
                              </span>
                            </td>
                            <td className="p-2 text-center align-middle bg-transparent border-b dark:border-white/40 whitespace-nowrap shadow-transparent">
                              <div className="flex items-center justify-center">
                                <span className="mr-2 text-xs font-semibold leading-tight dark:text-white dark:opacity-60">
                                  {percentServiceOfRevenue(item._id)}%
                                </span>
                                <div>
                                  <div className="text-xs h-0.75 w-30 m-0 flex overflow-visible rounded-lg bg-gray-200">
                                    <div style={{ width: `${percentServiceOfRevenue(item._id)}%`, backgroundColor: colorbyRevenue() }}
                                      className="flex flex-col justify-center h-auto overflow-hidden "
                                      role="progressbar"
                                      aria-valuenow={percentServiceOfRevenue(item._id)}
                                      aria-valuemin={0}
                                      aria-valuemax={100}
                                    />
                                  </div>
                                </div>
                              </div>
                            </td>
                            {/* <td className="p-2 align-middle bg-transparent border-b dark:border-white/40 whitespace-nowrap shadow-transparent">
                          <button className="inline-block px-5 py-2.5 mb-0 font-bold text-center uppercase align-middle transition-all bg-transparent border-0 rounded-lg shadow-none leading-normal text-sm ease-in bg-150 tracking-tight-rem bg-x-25 text-slate-400">
                            <i className="text-xs leading-tight fa fa-ellipsis-v dark:text-white dark:opacity-60" />
                          </button>
                        </td> */}
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
