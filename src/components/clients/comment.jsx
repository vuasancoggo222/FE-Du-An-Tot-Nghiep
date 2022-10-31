/* eslint-disable react/prop-types */
import {
  Avatar,
  Button,
  Comment,
  Form,
  Input,
  message,
  Progress,
  Rate,
  Tooltip,
} from "antd";
import { StarOutlined, StarFilled, StarTwoTone } from "@ant-design/icons";
import React, { useState, useEffect } from "react";
import { isAuthenticate } from "../../utils/LocalStorage";

import { feedbackAdd } from "../../api/feedback";
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
const Formcomment = (props) => {
  const id = props?.serviceId;
  const listfeedback = props?.feedbackData;
  console.log("data", listfeedback);
  const [dataUser, setDataUser] = useState();
  const user = isAuthenticate();
  // console.log("listfeedback", listfeedback?.listFeedback);
  const [submitting, setSubmitting] = useState(false);
  const [value, setValue] = useState("");
  const [rate, setRate] = useState(0);
  useEffect(() => {
    const getProfiles = async () => {
      const res = await getProfile(user.token);
      console.log("log profile :", res);
      setDataUser(res);
    };

    getProfiles();
  }, []);

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
      feedbackType: "unknown",
    };
    const redata = {
      user: { name: user?.name, avatar: user?.avatar },
      stars: rate,
      content: value,
    };
    try {
      await feedbackAdd(user.token, data);
      listfeedback.push(redata);
      message.success({
        content: "Cảm ơn bạn đã đánh giá dịch vụ",
        className: "custom-class",
        style: {
          marginTop: "20vh",
        },
      });

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
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  const handleRate = (e) => {
    setRate(e);
  };
  const convertDate = (date) => {
    return moment(date).fromNow();
  };
  return (
    <>
      <div className="border border-[#00502b] rounded-lg mb-10">
        <h3 className="text-white text-lg font-semibold bg-[#00502b] p-2 rounded-t-lg">
          Khách hàng chấm điểm, đánh giá và nhận xét{" "}
        </h3>

        <div className="p-5 ">
          <div className="border rounded-lg flex p-5 justify-around">
            <div className="ml-20">
              <Progress
                type="circle"
                percent={100}
                format={() => {
                  return (
                    <>
                      <div className="flex justify-center text-4xl font-semibold">
                        <span className="">{listfeedback?.ratingAvg}/5</span>
                        <StarFilled className="ml-2" />
                      </div>
                    </>
                  );
                }}
                strokeColor={{
                  "0%": "#00563B",
                  "100%": "#9ACD32",
                }}
                width={170}
              />
            </div>
            <div
              style={{
                width: 170,
              }}
              className="mt-6"
            >
              <div className="flex gap-3">
                <div className="inline-flex align-middle ">
                  <span>5</span>
                  <StarFilled />
                </div>

                <Progress
                  percent={listfeedback?.starsByLevel.star5 * 10}
                  size="small"
                  className=""
                  format={(percent) => {
                    return (
                      <>
                        <span className="font-bold">{percent / 10}</span>
                        <span className="ml-1">đánh giá</span>
                      </>
                    );
                  }}
                />
              </div>
              <div className="flex gap-3">
                <div className="inline-flex align-middle ">
                  <span>4</span>
                  <StarFilled />
                </div>

                <Progress
                  percent={listfeedback?.starsByLevel.star4 * 10}
                  size="small"
                  className=""
                  format={(percent) => {
                    return (
                      <>
                        <span className="font-bold">{percent / 10}</span>
                        <span className="ml-1">đánh giá</span>
                      </>
                    );
                  }}
                />
              </div>
              <div className="flex gap-3">
                <div className="inline-flex align-middle ">
                  <span>3</span>
                  <StarFilled />
                </div>

                <Progress
                  percent={listfeedback?.starsByLevel.star3 * 10}
                  size="small"
                  className=""
                  format={(percent) => {
                    return (
                      <>
                        <span className="font-bold">{percent / 10}</span>
                        <span className="ml-1">đánh giá</span>
                      </>
                    );
                  }}
                />
              </div>
              <div className="flex gap-3">
                <div className="inline-flex align-middle ">
                  <span>2</span>
                  <StarFilled />
                </div>

                <Progress
                  percent={listfeedback?.starsByLevel.star2 * 10}
                  size="small"
                  className=""
                  format={(percent) => {
                    return (
                      <>
                        <span className="font-bold">{percent / 10}</span>
                        <span className="ml-1">đánh giá</span>
                      </>
                    );
                  }}
                />
              </div>
              <div className="flex gap-3">
                <div className="inline-flex align-middle ">
                  <span>1</span>
                  <StarFilled />
                </div>

                <Progress
                  percent={listfeedback?.starsByLevel.star1 * 10}
                  size="small"
                  className=""
                  format={(percent) => {
                    return (
                      <>
                        <span className="font-bold">{percent / 10}</span>
                        <span className="ml-1">đánh giá</span>
                      </>
                    );
                  }}
                />
              </div>
            </div>
            <div className="font-bold text-lg mt-6">
              {" "}
              Để lại đánh giá của bạn bên dưới !
            </div>
          </div>
        </div>
        <div className="p-5">
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
              className="border rounded-lg px-5"
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
                    ) : null}
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
