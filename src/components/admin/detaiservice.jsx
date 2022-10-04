import { Button, Modal, Tooltip, Space } from "antd";
import React, { useState } from "react";

const Description = (props) => {
  // eslint-disable-next-line react/prop-types
  const data = props.ondetail;
  console.log(data);
  // eslint-disable-next-line react/prop-types

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  // chờ
  let BtWaitCursor;
  let BtWaitColor = "#e4ed36";

  return (
    <>
      <Space>
        <Tooltip title="Chi tiết">
          <Button
            style={{
              border: "none",
              cursor: BtWaitCursor,
              color: BtWaitColor,
            }}
            shape="circle"
            onClick={showModal}
          >
            <i
              style={{ fontSize: "25px" }}
              data="0"
              className="fas fa-info-circle"
            ></i>
          </Button>
        </Tooltip>
      </Space>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <p>{data}</p>
      </Modal>
    </>
  );
};

export default Description;
