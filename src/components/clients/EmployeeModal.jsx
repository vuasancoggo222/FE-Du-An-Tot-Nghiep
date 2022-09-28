import React, { useEffect } from "react";
import { Button, Modal, Radio } from "antd";
import { useState } from "react";
// import useEmployee from "../../hooks/use-employee";
import moment from "moment";
// import { getEmployeeByDate } from "../../api/employee";

const EmployeeModal = (props) => {
  const id = props.id;
  // const date = props.date;
  const date = "1664064000";

  const [employee, setEmployee] = useState();
  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setOpen(false);
    // ---------------------------------
    console.log("id+date", id, date);
  };
  const handleCancel = () => {
    // console.log('Clicked cancel button');
    setOpen(false);
  };

  const onChange = ({ target: { value } }) => {
    console.log("shift id:", value);
    // setValue4(value);
  };
  useEffect(() => {
    if (id !== "" && date !== "") {
      fetch(
        `http://localhost:5000/api/employee/get-employee-by-date?date=${date}&employee=${id}`
      )
        .then((response) => response.json())
        .then((data) => setEmployee(data));
    }
  }, [date, id]);
  const convertDate = (date) => {
    var timestamp = moment.unix(date);
    return timestamp.format("DD/MM/YYYY");
  };
  // if (error) return <div>Request Failed</div>;
  // if (!employee) return <div>Loading...</div>;
  return (
    <div>
      <Button type="primary" onClick={showModal}>
        Chọn ca nhân viên
      </Button>
      <Modal
        title="Chọn giờ đến"
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        centered
      >
        <div className="">
          {employee?.map((item) => (
            <div className="" key={item._id}>
              <div className="">
                <Radio.Group
                  // options={optionsWithDisabled}
                  onChange={onChange}
                  optionType="button"
                >
                  <div className="grid grid-cols-3">
                    {item.timeWork?.map((item2) => (
                      <div className="" key={item2._id}>
                        <Radio.Button value={item2.shiftId._id}>
                          {item2.shiftId.shiftName}: {item2.shiftId.timeStart} -{" "}
                          {item2.shiftId.timeEnd} {convertDate(item2.date)}
                        </Radio.Button>
                      </div>
                    ))}
                  </div>
                </Radio.Group>
              </div>
            </div>
          ))}
        </div>
      </Modal>
    </div>
  );
};

export default EmployeeModal;
