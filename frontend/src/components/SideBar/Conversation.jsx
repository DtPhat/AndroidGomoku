import { useDispatch } from "react-redux";
import { sellectConversation } from "../../redux/actions/conversationAction";
import { useSelector } from "react-redux";
import { useEffect } from "react";
const Conversation = ({ conversation, emoji }) => {
  const dispatch = useDispatch();
  const onlineUsers = useSelector((state) => state.socket.onlineUsers);
  const isOnline = onlineUsers.includes(conversation._id);

  const handleSelectConversation = (e) => {
    e.preventDefault();

    dispatch(sellectConversation(conversation));
  };
  return (
    <div>
      <div
        className="flex gap-2 items-center hover:bg-sky-500 rounded py-1 cursor-pointer"
        onClick={handleSelectConversation}
      >
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-12 rounded-full">
            <img src={conversation.profilePic} alt="user avatar" />
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-bold text-gray-200 ">{conversation.fullName}</p>
            <span className="text-xl">{emoji}</span>
          </div>
        </div>
      </div>
      <div className="divider my-0 py-0 h-1" />
    </div>
  );
};
export default Conversation;
