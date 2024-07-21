import Messenge from "./message";
import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { MessageService } from "../../service";
import { useDispatch } from "react-redux";
import { storeMessages } from "../../redux/actions/messageAction";
const Messenges = () => {
  const dispatch = useDispatch();
  const lastMessageRef = useRef();
  const selectConversation = useSelector(
    (state) => state.conversation.sellectConversation
  );
  const messages = useSelector((state) => state.messages.messages);

  const fetchMessage = async () => {
    const response = await MessageService.getMessages(selectConversation._id);
    dispatch(storeMessages(response));
  };
  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);
  useEffect(() => {
    fetchMessage();
  }, [selectConversation]);
  return (
    <div className="px-4 flex-1 overflow-auto">
      {messages.map((item) => {
        return (
          <div key={item._id} ref={lastMessageRef}>
            <Messenge message={item} />
          </div>
        );
      })}
    </div>
  );
};
export default Messenges;
