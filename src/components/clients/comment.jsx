import { Avatar, Button, Comment, Form, Input, List, Rate } from "antd";
import moment from "moment";
import React, { useState } from "react";
const { TextArea } = Input;
// eslint-disable-next-line react/prop-types
const CommentList = ({ comments }) => (
  <List
    dataSource={comments}
    // eslint-disable-next-line react/prop-types
    header={`${comments.length} ${comments.length > 1 ? "replies" : "reply"}`}
    itemLayout="horizontal"
    renderItem={(props) => <Comment {...props} />}
  />
);
// eslint-disable-next-line react/prop-types
const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <>
    <Form.Item>
      {<Rate />}
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button
        htmlType="submit"
        loading={submitting}
        onClick={onSubmit}
        type="primary"
      >
        Add Comment
      </Button>
    </Form.Item>
  </>
);
const Formcomment = () => {
  const [comments, setComments] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [value, setValue] = useState("");
  const handleSubmit = () => {
    if (!value) return;
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setValue("");
      setComments([
        ...comments,
        {
          author: "Han Solo",
          avatar: "https://joeschmoe.io/api/v1/random",
          rate: (
            <p>
              <Rate />
            </p>
          ),
          content: <p>{value}</p>,
          datetime: moment("2016-11-22").fromNow(),
        },
      ]);
    }, 1000);
  };
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  return (
    <>
      Đánh Giá:
      <Comment
        avatar={
          <Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />
        }
        content={
          <Editor
            onChange={handleChange}
            onSubmit={handleSubmit}
            submitting={submitting}
            value={value}
          />
        }
      />
      {comments.length > 0 && <CommentList comments={comments} />}
    </>
  );
};
export default Formcomment;
