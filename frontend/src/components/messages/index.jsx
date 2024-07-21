import { useEffect, useState } from "react";
import { TiMessage } from "react-icons/ti";
import { useSelector } from "react-redux";
import MessageInput from "./messageInput";
import Messenges from "./messages";
import useListenMessages from "../../hook/listenMessage";
const MessengerContainer = () => {
  const selectConversation = useSelector(
    (state) => state.conversation.sellectConversation
  );
  useListenMessages();
  const authUser = useSelector((state) => state.user.data);
  const NoChatSelected = () => {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
          <p>Welcome 👋 {authUser.fullName}</p>
          <p>Select a chat to start messaging</p>
          <TiMessage className="text-3xl md:text-6xl text-center" />
        </div>
      </div>
    );
  };

  const [noChatSelect, setNoChatSellect] = useState(true);
  const fetchMessage = async () => {
    if (selectConversation !== null) {
      setNoChatSellect(false);
    }
  };
  useEffect(() => {
    fetchMessage();
  }, [selectConversation]);

  return (
    <div className="md:min-w-[450px] flex flex-col">
      {noChatSelect ? (
        <NoChatSelected />
      ) : (
        <>
          <div className="bg-slate-500 px-4 py-2 mb-2">
            <span className="label-text">To: </span>
            <span className="text-gray-900 font-bold">
              {" "}
              {selectConversation.fullName}
            </span>
          </div>
          <Messenges />
          <MessageInput />
        </>
      )}
    </div>
  );
};
export default MessengerContainer;
