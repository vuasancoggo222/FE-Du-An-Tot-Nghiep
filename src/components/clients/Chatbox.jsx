import React from "react";
import {
  hideDialog,
  hideMessenger,
  MessengerChat,
  setMessengerBottomSpacing,
  showDialog,
  showMessenger,
} from "react-messenger-chat-plugin";
const Chatbox = () => {
  return (
    <>
      <MessengerChat
        pageId="105289585752964"
        language="vi_VN"
        // themeColor={"#000000"}
        greetingDialogDisplay={"show"}
        debugMode={true}
        bottomSpacing={30}
      />
    </>
  );
};

export default Chatbox;
