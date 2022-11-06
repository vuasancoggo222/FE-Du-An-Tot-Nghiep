/* eslint-disable react/no-unknown-property */
import { Button, DatePicker } from "antd";
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
  const [employeeFilterDate, setEmployeeFilterDate] = useState("");
  const [employeeFilterMonth, setEmployeeFilterMonth] = useState("");
  const [employeeFilterYear, setEmployeeFilterYear] = useState("");
  const [serviceFilterMonth, setServiceFilterMonth] = useState("");
  const [monthFilter, setMonthFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("")
  const [chartLable, setChartLable] = useState("Doanh thu");
  const [dataChart, setDataChart] = useState();
  // const [dataChartService, setDataChartService] = useState();
  const [dataChartFirst, setDataChartFirst] = useState();
  const [chartYear, setChartYear] = useState(moment().format("YYYY"));
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

  const onChangeYearService = (date, dateString) => {
    if (dateString == "") {
      setServiceFilter("")
    } else {
      setServiceFilter(dateString)
    }
    setServiceFilterMonth("")
    let year = dateString
    const d = new Date()
    if (dateString == "") {
      year = d.getFullYear()
    } let arrData = service?.map(() => {
      return 0
    })
    booking?.forEach((item) => {
      if (item.status == 4 && renderYear(item.date) == year) {
        service?.forEach((itemS, index) => {
          if (item.serviceId[0]?._id == itemS._id) {
            arrData[index] += item.serviceId[0]?.price
          }
        })
      }
    })

    // eslint-disable-next-line no-undef
    // setDataChartService(arrData)
    // let yearChart = chartYear
    // const a = new Date()
    // if (dateString == "") {
    //   year = a.getFullYear()
    // }
    // let arrDataChart = []
    // let count;
    // for (let i = 0; i <= 11; i++) {
    //   count = 0;
    //   let month;
    //   if ((i + 1).toString().length == 1) {
    //     month = `${yearChart}-0${i + 1}`
    //   } else {
    //     month = `${yearChart}-${i + 1}`
    //   }
    //   if (isChart == "turnover") {
    //     setChartLable("Doanh thu")
    //   } else if (isChart == "booking") {
    //     setChartLable("Hoàn thành")
    //   } else if (isChart == "userBad") {
    //     setChartLable("Hẹn xấu")
    //   } else if (isChart == "newUser") {
    //     setChartLable("Khách mới")
    //   }
    //   booking?.map((item) => {
    //     if (isChart == "turnover") {
    //       if (renderMonth(item.date) == month && item.status == 4) {
    //         count += item?.serviceId[0]?.price
    //       }
    //     } else if (isChart == "booking") {
    //       if (renderMonth(item.date) == month && item.status == 4) {
    //         count += 1
    //       }
    //     }
    //     else if (isChart == "userBad") {
    //       if (renderMonth(item.date) == month && item.status == 2) {
    //         count += 1
    //       }
    //     }
    //   })
    //   if (isChart == "newUser") {
    //     user?.map((item) => {
    //       if (renderMonth(item.createdAt) == month) {
    //         count += 1
    //       }
    //     })
    //   }
    //   arrDataChart.push(count)
    // }
    // setDataChart(arrDataChart)
  }

  const onChangeMonthService = (date, dateString) => {
    if (dateString == "") {
      setServiceFilterMonth("")
    } else {
      setServiceFilterMonth(dateString)
    }
    setServiceFilter("")
    let year = dateString
    const d = new Date()
    if (dateString == "") {
      year = d.getFullYear()
    } let arrData = service?.map(() => {
      return 0
    })
    booking?.forEach((item) => {
      if (item.status == 4 && renderMonth(item.date) == year) {
        service?.forEach((itemS, index) => {
          if (item.serviceId[0]?._id == itemS._id) {
            arrData[index] += item.serviceId[0]?.price
          }
        })
      }
    })
    // setDataChartService(arrData)
  }

  const onChangeDateEmployee = (date, dateString) => {
    if (dateString == "") {
      setEmployeeFilterDate("")
    } else {
      setEmployeeFilterDate(dateString)
    }
    setEmployeeFilterMonth("")
    setEmployeeFilterYear("")
  }

  const onChangeMonthEmployee = (date, dateString) => {
    if (dateString == "") {
      setEmployeeFilterMonth("")
    } else {
      setEmployeeFilterMonth(dateString)
    }
    setEmployeeFilterDate("")
    setEmployeeFilterYear("")
  }

  const onChangeYearEmployee = (date, dateString) => {
    if (dateString == "") {
      setEmployeeFilterYear("")
    } else {
      setEmployeeFilterYear(dateString)
    }
    setEmployeeFilterDate("")
    setEmployeeFilterMonth("")
  }

  // eslint-disable-next-line no-unused-vars
  const colorbyRevenue = (revenue) => {
    if (revenue <= 33) {
      return "red"
    } else if (revenue <= 66) {
      return "blue"
    } else {
      return "#13c2c2"
    }
  }
  const changeDateFilter = (date, dateString) => {
    if (dateString == "") {
      setDateFilter("")
    } else {
      setMonthFilter("")
      setDateFilter(dateString)
      setChartYear("")
    }
  };

  const changeMonthFilter = (date, dateString) => {
    if (dateString == "") {
      setMonthFilter("")
    } else {
      setMonthFilter(dateString)
      setDateFilter("")
      setChartYear("")
    }
  };

  const onChangeYearChart = (date, dateString) => {
    let year = dateString
    if (dateString == "") {
      year = moment().format("YYYY")
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
            count += item?.serviceId[0]?.price
          }
        } else if (isChart == "booking") {
          if (renderMonth(item.date) == month && item.status == 4) {
            count += 1
          }
        }
        else if (isChart == "userBad") {
          if (renderMonth(item.date) == month && item.status == 2) {
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
    setMonthFilter("")
    setDateFilter("")
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

  // const colorbyRevenue = (revenue) => {
  //   if (revenue <= 33) {
  //     return "red"
  //   } else if (revenue <= 66) {
  //     return "blue"
  //   } else {
  //     return "#13c2c2"
  //   }
  // }

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
      } else if (chartYear != "") {
        timeItem = renderYear(item.date)
        isCheck = chartYear
      } else {
        if (item.status == 4) {
          coutn++
        }
        return coutn
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

  const getTotalGuestEmployee = (idEmployee) => {
    let count = 0;
    if (employeeFilterDate != "") {
      booking?.map((item) => {
        if (item.status == 4 && item.employeeId?._id == idEmployee && renderDate(item.date) == employeeFilterDate) {
          count++
        }
      })
    } else if (employeeFilterMonth != "") {
      booking?.map((item) => {
        if (item.status == 4 && item.employeeId?._id == idEmployee && renderMonth(item.date) == employeeFilterMonth) {
          count++
        }
      })
    } else if (employeeFilterYear != "") {
      booking?.map((item) => {
        if (item.status == 4 && item.employeeId?._id == idEmployee && renderYear(item.date) == employeeFilterYear) {
          count++
        }
      })
    } else {
      booking?.map((item) => {
        if (item.status == 4 && item.employeeId?._id == idEmployee) {
          count++
        }
      })
    }
    return count
  }

  const getTotalTurnoverEmployee = (idEmployee) => {
    let sum = 0;
    if (employeeFilterDate != "") {
      booking?.map((item) => {
        if (item.status == 4 && item.employeeId?._id == idEmployee && renderDate(item.date) == employeeFilterDate) {
          sum += item.serviceId[0]?.price
        }
      })
    } else if (employeeFilterMonth != "") {
      booking?.map((item) => {
        if (item.status == 4 && item.employeeId?._id == idEmployee && renderMonth(item.date) == employeeFilterMonth) {
          sum += item.serviceId[0]?.price
        }
      })
    } else if (employeeFilterYear != "") {
      booking?.map((item) => {
        if (item.status == 4 && item.employeeId?._id == idEmployee && renderYear(item.date) == employeeFilterYear) {
          sum += item.serviceId[0]?.price
        }
      })
    } else {
      booking?.map((item) => {
        if (item.status == 4 && item.employeeId?._id == idEmployee) {
          sum += item.serviceId[0]?.price
        }
      })
    }

    return sum
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
      } else if (chartYear != "") {
        timeItem = renderYear(item.createdAt)
        isCheck = chartYear
      } else {
        coutn++
        return coutn
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
      } else if (chartYear != "") {
        timeItem = renderYear(item.date)
        isCheck = chartYear
      } else {
        if (item.status == 2) {
          coutn++
        }
        return coutn
      }
      if (item.status == 2 && timeItem == isCheck) {
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

  const totalService = (IdService) => {
    let sum = 0;
    if (serviceFilter != "") {
      booking?.forEach((item) => {
        if (item.status == 4 && item.serviceId[0]?._id == IdService && renderYear(item.date) == serviceFilter) {
          sum += item.serviceId[0]?.price
        }
      })
    } else if (serviceFilterMonth != "") {
      booking?.forEach((item) => {
        if (item.status == 4 && item.serviceId[0]?._id == IdService && renderMonth(item.date) == serviceFilterMonth) {
          sum += item.serviceId[0]?.price
        }
      })
    }
    else {
      booking?.forEach((item) => {
        if (item.status == 4 && item.serviceId[0]?._id == IdService) {
          sum += item.serviceId[0]?.price
        }
      })
    }
    return sum
  }

  const countService = (IdService) => {
    let sum = 0;
    if (serviceFilter != "") {
      booking?.forEach((item) => {
        if (item.status == 4 && item.serviceId[0]?._id == IdService && renderYear(item.date) == serviceFilter) {
          sum++
        }
      })
    } else if (serviceFilterMonth != "") {
      booking?.forEach((item) => {
        if (item.status == 4 && item.serviceId[0]?._id == IdService && renderMonth(item.date) == serviceFilterMonth) {
          sum++
        }
      })
    }
    else {
      booking?.forEach((item) => {
        if (item.status == 4 && item.serviceId[0]?._id == IdService) {
          sum++
        }
      })
    }
    return sum
  }

  const totalTurnover = () => {
    let sum = 0;
    if (serviceFilter != "") {
      booking?.forEach((item) => {
        if (item.status == 4 && renderYear(item.date) == serviceFilter) {
          sum += item.serviceId[0]?.price
        }
      })
    } else if (serviceFilterMonth != "") {
      booking?.forEach((item) => {
        if (item.status == 4 && renderMonth(item.date) == serviceFilterMonth) {
          sum += item.serviceId[0]?.price
        }
      })
    }
    else {
      booking?.forEach((item) => {
        if (item.status == 4) {
          sum += item.serviceId[0]?.price
        }
      })
    }
    return sum
  }

  // eslint-disable-next-line no-unused-vars
  const percentServiceOfRevenue = (IdService) => {
    let totalService = 0;
    let totalRevenue = 0;
    if (serviceFilter != "") {
      booking?.forEach((item) => {
        if (item.status == 4 && renderYear(item.date) == serviceFilter) {
          totalRevenue += item.serviceId[0]?.price
        }
        if (item.status == 4 && item.serviceId[0]?._id == IdService && renderYear(item.date) == serviceFilter) {
          totalService += item.serviceId[0]?.price
        }
      })
    } else if (serviceFilterMonth != "") {
      booking?.forEach((item) => {
        if (item.status == 4 && renderMonth(item.date) == serviceFilterMonth) {
          totalRevenue += item.serviceId[0]?.price
        }
        if (item.status == 4 && item.serviceId[0]?._id == IdService && renderMonth(item.date) == serviceFilterMonth) {
          totalService += item.serviceId[0]?.price
        }
      })
    } else {
      booking?.forEach((item) => {
        if (item.status == 4) {
          totalRevenue += item.serviceId[0]?.price
        }
        if (item.status == 4 && item.serviceId[0]?._id == IdService) {
          totalService += item.serviceId[0]?.price
        }
      })
    }
    if (totalRevenue == 0) {
      return 0
    }
    return (totalService * 100 / totalRevenue).toString().substring(0, 5)
  }

  const percentEmployeeOfRevenue = (idEmployee) => {
    let totalEmployee = 0;
    let totalRevenue = 0;
    if (employeeFilterYear != "") {
      booking?.forEach((item) => {
        if (item.status == 4 && renderYear(item.date) == employeeFilterYear) {
          totalRevenue += item.serviceId[0]?.price
        }
        if (item.status == 4 && item.employeeId._id == idEmployee && renderYear(item.date) == employeeFilterYear) {
          totalEmployee += item.serviceId[0]?.price
        }
      })
    } else if (employeeFilterMonth != "") {
      booking?.forEach((item) => {
        if (item.status == 4 && renderMonth(item.date) == employeeFilterMonth) {
          totalRevenue += item.serviceId[0]?.price
        }
        if (item.status == 4 && item.employeeId._id == idEmployee && renderMonth(item.date) == employeeFilterMonth) {
          totalEmployee += item.serviceId[0]?.price
        }
      })
    } else if (employeeFilterDate != "") {
      booking?.forEach((item) => {
        if (item.status == 4 && renderDate(item.date) == employeeFilterDate) {
          totalRevenue += item.serviceId[0]?.price
        }
        if (item.status == 4 && item.employeeId._id == idEmployee && renderDate(item.date) == employeeFilterDate) {
          totalEmployee += item.serviceId[0]?.price
        }
      })
    } else {
      booking?.forEach((item) => {
        if (item.status == 4) {
          totalRevenue += item.serviceId[0]?.price
        }
        if (item.status == 4 && item.employeeId._id == idEmployee) {
          totalEmployee += item.serviceId[0]?.price
        }
      })
    }
    if (totalRevenue == 0) {
      return 0
    }
    return (totalEmployee * 100 / totalRevenue).toString().substring(0, 5)
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
      } else if (chartYear != "") {
        timeItem = renderYear(item.date)
        isCheck = chartYear
      } else {
        if (item.status == 4) {
          coutn += item?.serviceId[0]?.price
        }
        return coutn
      }
      if (item.status == 4 && timeItem == isCheck) {
        coutn += item?.serviceId[0]?.price
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
    let year = moment().format("YYYY")
    if (chartYear != "") {
      year = chartYear
    } else {
      setChartYear(year)
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
            count += item?.serviceId[0]?.price
          }
          if (renderMonth(item.date) == monthBefor && item.status == 4) {
            countBefor += item?.serviceId[0]?.price
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
          if (renderMonth(item.date) == month && item.status == 2) {
            count += 1
          }
          if (renderMonth(item.date) == monthBefor && item.status == 2) {
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
            count += item?.serviceId[0]?.price
          }
          if (renderMonth(item.date) == monthBefor && item.status == 4) {
            countBefor += item?.serviceId[0]?.price
          }
        })

        arrData.push(count)
      }
      setTatalChartBefor(countBefor)
      setDataChartFirst(arrData)

      if (document.querySelector("#myChart")) {
        const ctx = document.getElementById('myChart').getContext('2d');
        // eslint-disable-next-line no-undef
        myChart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            datasets: [{
              label: chartLable,
              data: arrData,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
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
      // const booking = await httpGetAll();
      setService(res)
      // const d = new Date();
      // let year = d.getFullYear();
      // let arrData = res.map(() => {
      //   return 0
      // })
      // booking.forEach((item) => {
      //   if (item.status == 4 && renderYear(item.date) == year) {
      //     res.forEach((itemS, index) => {
      //       if (item.serviceId[0]?._id == itemS._id) {
      //         arrData[index] += item.serviceId[0]?.price
      //       }
      //     })
      //   }
      // })

      // const ctx = document.getElementById('chartService').getContext('2d');
      // // eslint-disable-next-line no-undef
      // chartService = new Chart(ctx, {
      //   type: 'polarArea',
      //   data: {
      //     labels: res?.map((item) => {
      //       return item.name
      //     }),
      //     datasets: [{
      //       label: "My First Dataset",
      //       data: arrData,
      //       backgroundColor: [
      //         'rgba(255, 99, 132, 0.2)',
      //         'rgba(54, 162, 235, 0.2)',
      //         'rgba(255, 206, 86, 0.2)',
      //         'rgba(75, 192, 192, 0.2)',
      //         'rgba(153, 102, 255, 0.2)',
      //         'rgba(255, 159, 64, 0.2)'
      //       ],
      //       borderColor: [
      //         'rgba(255, 99, 132, 1)',
      //         'rgba(54, 162, 235, 1)',
      //         'rgba(255, 206, 86, 1)',
      //         'rgba(75, 192, 192, 1)',
      //         'rgba(153, 102, 255, 1)',
      //         'rgba(255, 159, 64, 1)'
      //       ],
      //       borderWidth: 1
      //     }]
      //   },
      //   options: {
      //     scales: {
      //       y: {
      //         beginAtZero: true
      //       }
      //     }
      //   }
      // })
    }
    getService()

    let myChart;
    // let chartService;
    if (dataChart) {
      if (document.querySelector("#myChart")) {
        const ctx = document.getElementById('myChart').getContext('2d');
        // eslint-disable-next-line no-undef
        myChart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            datasets: [{
              label: chartLable,
              data: dataChart,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
      }
      //   if (dataChartService) {
      //     const ctx = document.getElementById('chartService').getContext('2d');
      //     // eslint-disable-next-line no-undef
      //     chartService = new Chart(ctx, {
      //       type: 'polarArea',
      //       data: {
      //         labels: service?.map((item) => {
      //           return item.name
      //         }),
      //         datasets: [{
      //           label: "My First Dataset",
      //           data: dataChartService,
      //           backgroundColor: [
      //             'rgba(255, 99, 132, 0.2)',
      //             'rgba(54, 162, 235, 0.2)',
      //             'rgba(255, 206, 86, 0.2)',
      //             'rgba(75, 192, 192, 0.2)',
      //             'rgba(153, 102, 255, 0.2)',
      //             'rgba(255, 159, 64, 0.2)'
      //           ],
      //           borderColor: [
      //             'rgba(255, 99, 132, 1)',
      //             'rgba(54, 162, 235, 1)',
      //             'rgba(255, 206, 86, 1)',
      //             'rgba(75, 192, 192, 1)',
      //             'rgba(153, 102, 255, 1)',
      //             'rgba(255, 159, 64, 1)'
      //           ],
      //           borderWidth: 1
      //         }]
      //       },
      //       options: {
      //         scales: {
      //           y: {
      //             beginAtZero: true
      //           }
      //         }
      //       }
      //     });
      //   }
    }
    return () => {
      if (myChart) {
        myChart.destroy()
      }
      // if (chartService) {
      //   chartService.destroy()
      // }
    }
  }, [dataChart])
  return (
    <>
      <div className="w-full px-6  mx-auto">
        <div style={{ height: "" }} >
          <h1 style={{ justifyContent: "space-between", alignItems: "center" }} className="mb-0 font-bold text-white text-center text-[50px]">
            <span>Dashboard</span>
          </h1>
        </div>
        <div style={{ marginTop: "20px", fontWeight: "bold" }} >
          <span style={{ fontSize: "20px", color: "white", textDecoration: "underline", }}> Thống kê {monthFilter != "" ? monthFilter : dateFilter != "" ? dateFilter : chartYear != "" ? chartYear : "từ trước đến nay"}</span>
          <Button onClick={() => {
            const year = moment().format("YYYY")
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
                    count += item?.serviceId[0]?.price
                  }
                } else if (isChart == "booking") {
                  if (renderMonth(item.date) == month && item.status == 4) {
                    count += 1
                  }
                }
                else if (isChart == "userBad") {
                  if (renderMonth(item.date) == month && item.status == 2) {
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
            setChartYear("")
            setMonthFilter("")
            setDateFilter("")
          }} style={{ float: "right", marginLeft: "3px", backgroundColor: "#525252", fontFamily: "monospace", color: "#fbff08", fontWeight: "bold" }} >
            Làm mới
          </Button>
          < DatePicker value={chartYear == "" ? null : moment(chartYear)} placeholder="Chọn năm" status="warning"
            style={{ float: "right", marginLeft: "3px" }} onChange={onChangeYearChart} picker="year" />
          < DatePicker placeholder="Chọn tháng" value={monthFilter == "" ? null : moment(monthFilter)} status="warning"
            style={{ float: "right", marginLeft: "3px" }} onChange={changeMonthFilter} picker="month" />
          <DatePicker placeholder="Chọn ngày" style={{ float: "right", }}
            status="warning" value={dateFilter == "" ? null : moment(dateFilter)} onChange={changeDateFilter}
          />

        </div> <br />
        <div className="flex flex-wrap -mx-3 mt-3">
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
        <div className="flex flex-wrap -mx-3 mt-3">

          {/* card1 */}
          <div className="w-full max-w-full px-3 mb-6 sm:w-1/2 sm:flex-none xl:mb-0 xl:w-1/4">
            <div style={{ backgroundColor: isChart == "turnover" ? "#525252" : "", color: isChart == "turnover" ? "white" : "" }} className="relative flex flex-col min-w-0 break-words bg-white shadow-xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl bg-clip-border">
              <div className="flex-auto p-4 ">
                <div className="flex flex-row -mx-3">
                  <div className="flex-none w-2/3 max-w-full px-3">
                    <div>
                      <p className="mb-0 font-sans text-sm font-semibold leading-normal uppercase dark:text-white dark:opacity-60">
                        Doanh thu (Vnđ)
                      </p>
                      <h5 style={{ color: isChart == "turnover" ? "white" : "" }} className="mb-2 font-bold dark:text-white">
                        {formatCash(getMoneyThisDay())}
                      </h5>
                      <p style={{ color: isChart != "turnover" ? "#168ea0" : "#fbff08" }} className="mb-0 dark:text-white dark:opacity-60">
                        <button><span data="turnover" onClick={handleChooseChart} className="text-sm font-bold leading-normal ">
                          Xem biểu đồ năm
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
            <div style={{ backgroundColor: isChart == "booking" ? "#525252" : "", color: isChart == "booking" ? "white" : "" }} className="relative flex flex-col min-w-0 break-words bg-white shadow-xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl bg-clip-border">
              <div className="flex-auto p-4">
                <div className="flex flex-row -mx-3">
                  <div className="flex-none w-2/3 max-w-full px-3">
                    <div>
                      <p className="mb-0 font-sans text-sm font-semibold leading-normal uppercase dark:text-white dark:opacity-60">
                        Khách hoàn thành
                      </p>
                      <h5 style={{ color: isChart == "booking" ? "white" : "" }} className="mb-2 font-bold dark:text-white">
                        {countCustomerDone()}
                      </h5>
                      <p style={{ color: isChart != "booking" ? "#168ea0" : "#fbff08" }} className="mb-0 dark:text-white dark:opacity-60">
                        <button> <span onClick={handleChooseChart} data="booking" className="text-sm font-bold leading-normal ">
                          Xem biểu đồ năm
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
            <div style={{ backgroundColor: isChart == "userBad" ? "#525252" : "", color: isChart == "userBad" ? "white" : "" }} className="relative flex flex-col min-w-0 break-words bg-white shadow-xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl bg-clip-border">
              <div className="flex-auto p-4">
                <div className="flex flex-row -mx-3">
                  <div className="flex-none w-2/3 max-w-full px-3">
                    <div>
                      <p className="mb-0 font-sans text-sm font-semibold leading-normal uppercase dark:text-white dark:opacity-60">
                        Khách hẹn xấu
                      </p>
                      <h5 style={{ color: isChart == "userBad" ? "white" : "" }} className="mb-2 font-bold dark:text-white">
                        {countCustomerBad()}
                      </h5>
                      <p style={{ color: isChart != "userBad" ? "#168ea0" : "#fbff08" }} className="mb-0 dark:text-white dark:opacity-60">
                        <button><span data="userBad" onClick={handleChooseChart} className="text-sm font-bold leading-normal ">
                          Xem biểu đồ năm
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
            <div style={{ backgroundColor: isChart == "newUser" ? "#525252" : "", color: isChart == "newUser" ? "white" : "" }} className="relative flex flex-col min-w-0 break-words bg-white shadow-xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl bg-clip-border">
              <div className="flex-auto p-4">
                <div className="flex flex-row -mx-3">
                  <div className="flex-none w-2/3 max-w-full px-3">
                    <div>
                      <p className="mb-0 font-sans text-sm font-semibold leading-normal uppercase dark:text-white dark:opacity-60">
                        Khách hàng mới
                      </p>
                      <h5 style={{ color: isChart == "newUser" ? "white" : "" }} className="mb-2 font-bold dark:text-white">{countUserNew()}</h5>
                      <p style={{ color: isChart != "newUser" ? "#168ea0" : "#fbff08" }} className="mb-0 dark:text-white dark:opacity-60">

                        <button><span data="newUser" onClick={handleChooseChart} className="text-sm font-bold leading-normal ">
                          Xem biểu đồ năm
                        </span></button>
                      </p>
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



      </div>

      <div className="w-full px-3 py-6 mx-auto">
        {/* table 1 */}
        <div className="w-full max-w-full px-3 mt-0 lg:w-12/12 lg:flex-none">
          <div className="border-black/12.5 dark:bg-slate-850 dark:shadow-dark-xl shadow-xl relative z-20 flex min-w-0 flex-col break-words rounded-2xl border-0 border-solid bg-white bg-clip-border">
            <div className="p-6 pb-0 mb-0 border-b-0 border-b-solid rounded-t-2xl border-b-transparent">
              <div className="">
                <div style={{ justifyContent: "center", alignItems: "center" }} className="flex " >
                  <span className="mb-0 font-bold text-black capitalize text-center text-[50px]" style={{ fontSize: "20px" }}> Biểu đồ <span style={{ textDecoration: "underline", textDecorationColor: "blue" }}>{chartLable} {chartYear ? "năm " + chartYear : "Năm Nay"}</span></span>
                </div>
                <div>
                  < DatePicker placeholder="Chọn năm" status="warning"
                    style={{ float: "right", fontWeight: "bold" }} onChange={onChangeYearChart} picker="year" value={chartYear == "" ? null : moment(chartYear)} />
                </div>
                <p className="mb-0 text-sm leading-normal dark:text-white dark:opacity-60">
                  <i className="fa fa-arrow-up text-emerald-500"></i>
                  <span className="font-semibold"> {renderPreviousChart()}% so với</span>  {chartYear ? chartYear - 1 : " năm trước"}
                </p>
              </div>

            </div>



          </div>
        </div>

        <div className="flex flex-wrap -mx-3 ">
          <div className="flex-none w-full max-w-full px-3">
            <div className="relative flex flex-col min-w-0 mb-6 break-words bg-white border-0 border-transparent border-solid shadow-xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl bg-clip-border">
              <div className="p-6 pb-0 mb-0 border-b-0 border-b-solid rounded-t-2xl border-b-transparent">
                <h6 style={{ float: "left", fontSize: "20px", fontWeight: "bold" }} className="dark:text-white">Thống kê nhân viên <span style={{ textDecoration: "underline", textDecorationColor: "blue" }}>{employeeFilterDate == moment().format("YYYY-MM-DD") ? "hôm nay" : employeeFilterDate != "" ? employeeFilterDate : employeeFilterMonth != "" ? employeeFilterMonth : employeeFilterYear != "" ? employeeFilterYear : "từ trước đến nay"}</span></h6>
                <Button onClick={() => {
                  setEmployeeFilterDate(""), setEmployeeFilterMonth(""), setEmployeeFilterYear("")
                }} style={{ float: "right", marginLeft: "3px", backgroundColor: "#168ea0", fontFamily: "monospace", color: "white" }} >
                  Làm mới
                </Button>< DatePicker value={employeeFilterYear == "" ? null : moment(employeeFilterYear)} placeholder="Chọn năm" status="warning"
                  style={{ float: "right", fontWeight: "bold", marginLeft: "3px" }} onChange={onChangeYearEmployee} picker="year" />
                < DatePicker value={employeeFilterMonth == "" ? null : moment(employeeFilterMonth)} placeholder="Chọn tháng " status="warning"
                  style={{ float: "right", fontWeight: "bold", marginLeft: "3px" }} onChange={onChangeMonthEmployee} picker="month" />
                < DatePicker value={employeeFilterDate == "" ? null : moment(employeeFilterDate)} placeholder="Chọn ngày " status="warning"
                  style={{ float: "right", fontWeight: "bold" }} onChange={onChangeDateEmployee} />
              </div>
              <div className="flex-auto px-0 pt-0 pb-2">
                <div className="p-0 overflow-x-auto">
                  <table className="items-center w-full mb-0 align-top border-collapse dark:border-white/40 text-slate-500">
                    <thead className="align-bottom">
                      <tr>
                        <th className="px-6 py-3 font-bold text-left uppercase align-middle bg-transparent border-b border-collapse shadow-none dark:border-white/40 dark:text-white text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">
                          Thông tin
                        </th>
                        <th style={{ display: employeeFilterDate == moment().format("YYYY-MM-DD") ? "block" : "none" }} className="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-collapse shadow-none dark:border-white/40 dark:text-white text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">
                          Trạng thái
                        </th>
                        <th className="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-collapse shadow-none dark:border-white/40 dark:text-white text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">
                          {employeeFilterDate == moment().format("YYYY-MM-DD") ? "Tổng khách dự kiến" : "Tổng khách đã làm"}
                        </th>
                        <th className="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-collapse shadow-none dark:border-white/40 dark:text-white text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">
                          {employeeFilterDate == moment().format("YYYY-MM-DD") ? "Khách đang làm" : "Đóng góp doanh thu"}

                        </th>
                        <th className="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-collapse shadow-none dark:border-white/40 dark:text-white text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">
                          {employeeFilterDate == moment().format("YYYY-MM-DD") ? " Khách hoàn thành" : "Phần trăm"}
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

                            <td style={{ display: employeeFilterDate == moment().format("YYYY-MM-DD") ? "" : "none" }} className="p-2 text-sm leading-normal text-center align-middle bg-transparent border-b dark:border-white/40 whitespace-nowrap shadow-transparent">
                              <span className={item.status == 1 ? "bg-gradient-to-tl from-emerald-500 to-teal-400 px-2.5 text-xs rounded-1.8 py-1.4 inline-block whitespace-nowrap text-center align-baseline font-bold uppercase leading-none text-white" : "bg-gradient-to-tl from-slate-600 to-slate-300 px-2.5 text-xs rounded-1.8 py-1.4 inline-block whitespace-nowrap text-center align-baseline font-bold uppercase leading-none text-white"}>
                                {item.status == 1 ? "online" : "offline"}
                              </span>
                            </td>
                            <td className="p-2 text-center align-middle bg-transparent border-b dark:border-white/40 whitespace-nowrap shadow-transparent">
                              <span className="text-xs font-semibold leading-tight dark:text-white dark:opacity-80 text-slate-400">
                                {employeeFilterDate == moment().format("YYYY-MM-DD") ? countCustomerByEmployee(item._id) : getTotalGuestEmployee(item._id)}
                              </span>
                            </td>
                            <td className="p-2 text-center align-middle bg-transparent border-b dark:border-white/40 whitespace-nowrap shadow-transparent">
                              <span className="text-xs font-semibold leading-tight dark:text-white dark:opacity-80 text-slate-400">
                                {employeeFilterDate == moment().format("YYYY-MM-DD") ? countCustomerSpaIngByEmployee(item._id) : formatCash(getTotalTurnoverEmployee(item._id))}
                              </span>
                            </td>
                            <td className="p-2 text-center align-middle bg-transparent border-b dark:border-white/40 whitespace-nowrap shadow-transparent">
                              <span className="text-xs font-semibold leading-tight dark:text-white dark:opacity-80 text-slate-400">
                                {employeeFilterDate == moment().format("YYYY-MM-DD") ? countCustomerSpaSuccessByEmployee(item._id) : <div className="flex items-center justify-center">
                                  <span className="mr-2 text-xs font-semibold leading-tight dark:text-white dark:opacity-60">
                                    {percentEmployeeOfRevenue(item._id)}%
                                  </span>
                                  <div>
                                    <div className="text-xs h-0.75 w-30 m-0 flex overflow-visible rounded-lg bg-gray-200">
                                      <div style={{ width: `${percentEmployeeOfRevenue(item._id)}%`, backgroundColor: colorbyRevenue() }}
                                        className="flex flex-col justify-center h-auto overflow-hidden "
                                        role="progressbar"
                                        aria-valuenow={percentEmployeeOfRevenue(item._id)}
                                        aria-valuemin={0}
                                        aria-valuemax={100}
                                      />
                                    </div>
                                  </div>
                                </div>}
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
                <h6 style={{ float: "left", fontSize: "20px", fontWeight: "bold" }} className="dark:text-white">Thống kê dịch vụ <span style={{ textDecoration: "underline", textDecorationColor: "blue", }}>{serviceFilter != "" ? ` vào ${serviceFilter}` : serviceFilterMonth != "" ? serviceFilterMonth : "từ trước đến nay"}</span> <br /><span style={{ color: "red", fontSize: "16px" }}>  Tổng {formatCash(totalTurnover())} vnđ</span> </h6> <Button onClick={() => {
                  setServiceFilter(""), setServiceFilterMonth("")
                }} style={{ float: "right", marginLeft: "3px", backgroundColor: "#168ea0", fontFamily: "monospace", color: "white" }} >
                  Làm mới
                </Button>< DatePicker value={serviceFilter == "" ? null : moment(serviceFilter)} placeholder="Chọn năm" status="warning"
                  style={{ float: "right", fontWeight: "bold", marginLeft: "3px" }} onChange={onChangeYearService} picker="year" />
                < DatePicker value={serviceFilterMonth == "" ? null : moment(serviceFilterMonth)} placeholder="Chọn tháng " status="warning"
                  style={{ float: "right", fontWeight: "bold" }} onChange={onChangeMonthService} picker="month" />
              </div>
              <div className=" px-0 pt-0 pb-2 ">
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
                          Số lượt hoàn thành
                        </th>
                        <th className="px-6 py-3 pl-2 font-bold text-center uppercase align-middle bg-transparent border-b shadow-none dark:border-white/40 dark:text-white text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">
                          Doanh thu - vnđ
                        </th>
                        <th className="px-6 py-3 pl-2 font-bold text-center uppercase align-middle bg-transparent border-b shadow-none dark:border-white/40 dark:text-white text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">
                          Phần trăm
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
                              {countService(item._id)}
                            </td>
                            <td className="p-2 text-center align-middle bg-transparent border-b dark:border-white/40 whitespace-nowrap shadow-transparent">
                              {formatCash(totalService(item._id))}
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

                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
                {/* <div style={{ width: "50%", marginLeft: "25%" }} className="flex-auto p-4 mt-3">
                  <canvas id="chartService" ></canvas>
                </div> */}

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
