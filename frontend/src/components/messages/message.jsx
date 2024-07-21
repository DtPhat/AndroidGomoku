import { useSelector } from "react-redux";
import { extractTime } from "../../utils/extractTime";
const Messenge = ({ message }) => {
  const selectConversation = useSelector(
    (state) => state.conversation.sellectConversation
  );
  const authUser = useSelector((state) => state.user.data);
  const fromFriend = message.senderId === selectConversation._id;
  const formattedTime = extractTime(message.createdAt);
  const chatClassName = fromFriend ? "chat-start" : "chat-end";
  const bubbleBgColor = !fromFriend ? "bg-blue-500" : "";
  const profilePic = !fromFriend
    ? authUser.profilePic
    : selectConversation?.profilePic;
  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img src={profilePic} alt="user avatar" />
        </div>
      </div>
      <div className={`chat-bubble text-white ${bubbleBgColor}  pb-2`}>
        {message.message}
      </div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
        {formattedTime}
      </div>
    </div>
  );
};
export default Messenge;
