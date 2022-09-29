import React, { useEffect, useState } from "react";
import { Button, Modal } from "antd";
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
    console.log("checked = ", checkedValues);
    setdataUptoForm(checkedValues)
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
      <Button type="primary" onClick={showModal}>
        Danh sách dịch vụ
      </Button>
      <Modal
        title="Danh sách dịch vụ"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Checkbox.Group options={options} onChange={onChange} />
      </Modal>
    </>
  );
};

export default ServiceModal;
