import { Button, Image,  Table, Select } from 'antd';
import React, {useState} from "react";
import useService from "../../../hooks/use-service";
import Description from "../../../components/admin/detaiservice";
import { BiEdit } from "react-icons/bi";
import { Link } from "react-router-dom";


const ListBanner = () => {
    const { Option } = Select;
  const { data, error } = useService();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const columns = [
  
    {
        title: "STT",
        render: (text, object, index) => {
            return index + 1;
          },
        width:50
    },
    {
      title: "Ảnh",
      dataIndex: "image",
      render: (image) => <Image width={200}  src={image} key={image} />,
      
    },
    {
        title: "Hành động",
        dataIndex: "_id",
        key: "action",
        colapse: 2,
        render: (item) => {
            // chờ
            let showWait = "false"
            let showSussces = "false"
            let showFailure = "false"
            let BtWaitCursor = "not-allowed"
            let BtWaitColor = "#dedede"
            // let BtWaitColor = "#cd3e3e"
            // xác nhận
            let BtSusscesCursor = "not-allowed"
            let BtSusscessColor = "#dedede"
            // let BtSusscessColor = "#da0cc8"
            // hủy
            let BtFailureCursor = "not-allowed"
            let BtFailureColor = "#dedede"
            // let BtFailureColor = "green"

            if (item.status === 1) {
                // chờ
                showSussces = "true"
                showWait = "true"
                BtSusscesCursor = "pointer"
                BtSusscessColor = "#da0cc8"
                BtWaitCursor = "not-allowed"
                BtWaitColor = "#cd3e3e"
            } else if (item.status === 3) {
                BtFailureCursor = "pointer"
                BtFailureColor = "green"
                showFailure = "true"
                // xác nhận
               
            } 
            return (
             
                <Select
                style={{ width: "170px" , color:"blue", textAlign:"center"}}
                value="Đổi trạng thái"
                >
                  
                    <Option value="4">  <Button isshow={showFailure} onClick={showModal} dataId={item._id} data="4" type="danger" style={{ cursor: BtFailureCursor, backgroundColor: BtFailureColor, border: "none", color: "white", width: "100%" }} >
                       Sửa
                    </Button></Option>
                    <Option value="5"><Button isshow={showWait} onClick={showModal} dataId={item._id} data="5" style={{ cursor: BtWaitCursor, backgroundColor: BtWaitColor, border: "none", color: "white", width: "100%" }} >
                        Xóa
                    </Button></Option>
                </Select>
            )
        },
    },
  ];
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  if (!data) return <div>loading</div>;
  if (error) return <div>Failed loading</div>;
  return (
    <>
      <div className="w-full px-6 py-6 mx-auto">
        <div>
          <h1 className="w-[1200px] m-auto text-center mb-0 font-bold text-white capitalize pb-[20px]  text-[50px]">
            <div>Banner</div>
          </h1>
        </div>
        <Link to={"/admin/banner/add"}>
          <Button type="primary">Primary Button</Button>
        </Link>
      </div>
      <div className="w-full px-6 py-6 mx-auto">
        <Table columns={columns} dataSource={data} onChange={onChange} />
      </div>
      ;
    </>
  );
};

export default ListBanner;
