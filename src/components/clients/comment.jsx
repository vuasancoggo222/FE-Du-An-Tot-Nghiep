/* eslint-disable react/prop-types */
import {
  Avatar,
  Button,
  Comment,
  Form,
  Input,
  message,
  Rate,
  Tooltip,
} from "antd";

import React, { useState, useEffect } from "react";
import { isAuthenticate } from "../../utils/LocalStorage";

import { feedbackAdd, feedbackReply } from "../../api/feedback";
import moment from "moment";
import { getProfile } from "../../api/user";
const { TextArea } = Input;

const desc = ["Tệ", "Không hài lòng", "Bình thường", "Hài lòng", "Tuyệt vời"];

const Editor = ({ onChange, onSubmit, submitting, text, rate, rateValue }) => (
  <>
    <Form.Item>
      <Rate tooltips={desc} onChange={rate} value={rateValue} />
      {rateValue ? (
        <span className="ant-rate-text border rounded px-1 bg-green-600 text-white ">
          {desc[rateValue - 1]}
        </span>
      ) : (
        ""
      )}

      <TextArea
        rows={4}
        onChange={onChange}
        value={text}
        placeholder="Nhập đánh giá về dịch vụ (tối thiểu 8 kí tự)"
        style={{ marginTop: "10px" }}
      />
    </Form.Item>
    <Form.Item>
      <Button
        htmlType="submit"
        loading={submitting}
        onClick={onSubmit}
        type="primary"
        style={{ background: "#00502b", border: "none" }}
      >
        Gửi đánh giá
      </Button>
    </Form.Item>
  </>
);
const FormReply = ({ onChange, onSubmit, text }) => (
  <>
    <Form.Item>
      <TextArea
        rows={4}
        onChange={onChange}
        value={text}
        placeholder=""
        style={{ marginTop: "10px" }}
      />
    </Form.Item>
    <Form.Item>
      <Button
        htmlType="submit"
        onClick={onSubmit}
        type="primary"
        style={{ background: "#00502b", border: "none" }}
      >
        Gửi
      </Button>
    </Form.Item>
  </>
);
const ButtonReply = ({ onClick, user, id, getId }) => (
  <>
    <span key="comment-nested-reply-to" onClick={onClick}>
      {/* {user && user.role !== 0 ? `Trả lời` : ""} */}
      {user && user.role !== 0 ? (
        <span onClick={() => getId(id)}>Trả lời</span>
      ) : (
        ""
      )}
    </span>
    ,
  </>
);
const Formcomment = (props) => {
  const id = props?.serviceId;
  // const listfeedback = props?.feedbackData;
  const [listfeedback, setListfeedback] = useState();

  const [dataUser, setDataUser] = useState();
  const user = isAuthenticate();
  const [submitting, setSubmitting] = useState(false);

  const [valueRep, setValueRep] = useState("");
  const [value, setValue] = useState("");
  const [rate, setRate] = useState(0);
  const [openformReply, setOpenFormReply] = useState(false);
  const [isActive, setIsActive] = useState("");
  useEffect(() => {
    const getProfiles = async () => {
      const res = await getProfile(user.token);
      console.log("log profile :", res);
      setDataUser(res);
    };
    setListfeedback(props.feedbackData);
    getProfiles();
  }, [props.feedbackData, listfeedback, openformReply]);

  const handleSubmit = async () => {
    if (!rate)
      return (
        message &&
        message.error({
          content: "Vui lòng đánh giá dịch vụ",
          className: "custom-class",
          style: {
            marginTop: "20vh",
          },
        })
      );
    if (!value)
      return (
        message &&
        message.error({
          content: "Vui lòng nhập đánh giá",
          className: "custom-class",
          style: {
            marginTop: "20vh",
          },
        })
      );
    const accept = dataUser.serviceUsed;
    if (!accept.includes(id)) {
      return (
        message &&
        message.error({
          content: "Bạn chưa sử dụng dịch vụ này",
          className: "custom-class",
          style: {
            marginTop: "20vh",
          },
        })
      );
    }

    setSubmitting(true);
    const data = {
      service: id,
      user: user?.id,
      stars: rate,
      content: value,
    };
    const redata = {
      user: { name: user?.name, avatar: user?.avatar },
      stars: rate,
      content: value,
    };
    try {
      await feedbackAdd(user.token, data);

      message.success({
        content: "Cảm ơn bạn đã đánh giá dịch vụ",
        className: "custom-class",
        style: {
          marginTop: "20vh",
        },
      });
      listfeedback.listFeedback.push(redata);
      setTimeout(() => {
        setSubmitting(false);
        setValue("");
        setRate(0);
      }, 1000);
    } catch (error) {
      setSubmitting(false);
      message &&
        message.error({
          content: error?.response?.data?.message,
          className: "custom-class",
          style: {
            marginTop: "20vh",
          },
        });
    }
  };
  const handleSubmitRep = async () => {
    if (!valueRep)
      return (
        message &&
        message.error({
          content: "Vui lòng nhập phản hồi",
          className: "custom-class",
          style: {
            marginTop: "20vh",
          },
        })
      );
    try {
      await feedbackReply(user.token, isActive, { reply: valueRep });

      message.success({
        content: "Trả lời thành công",
        className: "custom-class",
        style: {
          marginTop: "20vh",
        },
      });
    } catch (error) {
      message &&
        message.error({
          content: error?.response?.data?.message,
          className: "custom-class",
          style: {
            marginTop: "20vh",
          },
        });
    }
    setOpenFormReply(!openformReply);
    setValueRep("");
  };
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  const handleChangeRep = (e) => {
    setValueRep(e.target.value);
  };
  const handleRate = (e) => {
    setRate(e);
  };
  const onReply = () => {
    setOpenFormReply(!openformReply);
  };
  const convertDate = (date) => {
    return moment(date).fromNow();
  };
  const getId = (e) => {
    console.log("log", e);
    setIsActive(e);
  };
  return (
    <>
      <div className="border border-[#00502b] rounded-lg mb-10">
        <h3 className="text-white text-lg font-semibold bg-[#00502b] p-2 rounded-t-lg">
          Khách hàng chấm điểm, đánh giá và nhận xét{" "}
        </h3>
        <div className="px-5">
          {user ? (
            <Comment
              avatar={<Avatar src={dataUser?.avatar} alt="Han Solo" />}
              content={
                <Editor
                  onChange={handleChange}
                  onSubmit={handleSubmit}
                  submitting={submitting}
                  text={value}
                  rate={handleRate}
                  rateValue={rate}
                />
              }
            />
          ) : (
            <span className="text-lg text-red-600 font-semibold underline">
              Vui lòng đăng nhập để đánh giá !
            </span>
          )}
          <div className="mt-4 border-t pt-3 ">
            <h2>Đánh giá và nhận xét của khách hàng:</h2>
          </div>
          <div className=" overflow-auto max-h-[800px]">
            <div className="">
              {listfeedback?.listFeedback?.map((item, index) => (
                <div className="" key={index}>
                  <Comment
                    actions={[
                      // eslint-disable-next-line react/jsx-key
                      <ButtonReply
                        onClick={onReply}
                        user={user}
                        id={item._id}
                        getId={getId}
                      />,
                    ]}
                    author={
                      <a>
                        <p className="">{item.user?.name}</p>
                        {/* date ở đây */}
                        <Tooltip title={`asds`}>
                          <span>{convertDate(item?.createdAt)}</span>
                        </Tooltip>
                      </a>
                    }
                    datetime={
                      // đổi thành rate
                      <span className="mx-3">
                        <Rate
                          value={item.stars}
                          disabled
                          style={{ fontSize: 15 }}
                        />
                      </span>
                    }
                    avatar={
                      <Avatar src={item.user?.avatar} alt={item.user?.name} />
                    }
                    content={<p>{item.content}</p>}
                  >
                    {item?.reply !== null &&
                    item?.reply !== undefined &&
                    item?.reply !== "" ? (
                      <Comment
                        author={
                          <a>
                            <p>{item.userReply.name}</p>
                          </a>
                        }
                        datetime={
                          // đổi thành rate
                          <span className="border rounded-md border-red-400 bg-red-400 text-white px-1">
                            Quản trị viên
                          </span>
                        }
                        avatar={
                          <Avatar src={item.userReply?.avatar} alt="Han Solo" />
                        }
                        content={<p>{item?.reply}</p>}
                      ></Comment>
                    ) : (
                      <div className="">
                        {openformReply == true ? (
                          <div
                            className={`${
                              isActive === item._id ? "" : "hidden"
                            }`}
                          >
                            <FormReply
                              onChange={handleChangeRep}
                              onSubmit={handleSubmitRep}
                              text={valueRep}
                            />
                          </div>
                        ) : (
                          <div className=""></div>
                        )}
                      </div>
                    )}
                  </Comment>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Formcomment;
