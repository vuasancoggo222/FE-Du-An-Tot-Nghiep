import React, { useEffect, useState } from "react";
import { Button, Modal, Radio } from "antd";
import { Checkbox } from "antd";
const ServiceModal = (props) => {
  //  Modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    ChildServiceID(dataUptoForm);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  // ----------------------------
  const [service, setService] = useState();
  let options = [];
  service?.map((item) => options.push({ value: item._id, label: item.name }));

  const [dataUptoForm, setdataUptoForm] = useState({});
  const onChange = (checkedValues) => {
    console.log("checked = ", checkedValues.target.value);
    setdataUptoForm(checkedValues.target.value);
  };

  const ChildServiceID = (e) => {
    props.ParentServiceId(e);
  };
  useEffect(() => {
    fetch(`http://localhost:5000/api/service`)
      .then((response) => response.json())
      .then((data) => setService(data));
  }, []);
  return (
    <>
      <Button
        type="primary"
        style={{ backgroundColor: "#00502b", border: "none" }}
        onClick={showModal}
      >
        Danh sách dịch vụ
      </Button>
      <Modal
        title="Danh sách dịch vụ"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        centered
      >
        <Radio.Group
          options={options}
          onChange={onChange}
          buttonStyle="solid"
        />
      </Modal>
    </>
  );
};

export default ServiceModal;
