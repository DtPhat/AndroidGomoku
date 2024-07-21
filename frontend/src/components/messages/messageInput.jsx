import { useState } from "react";
import { BsSend } from "react-icons/bs";
import { MessageService } from "../../service";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addMessages } from "../../redux/actions/messageAction";

const MessageInput = () => {
  const dispatch = useDispatch();
  const selectConversation = useSelector(
    (state) => state.conversation.sellectConversation
  );
  const [message, setMessage] = useState("");
  const handleSendMessage = async (e) => {
    e.preventDefault();
    const response = await MessageService.sendMessages(
      message,
      selectConversation._id
    );
    dispatch(addMessages(response));
    setMessage("");
  };
  return (
    <form className="px-4 my-3" onSubmit={handleSendMessage}>
      <div className="w-full relative">
        <input
          type="text"
          className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-500 text-white"
          placeholder="Send your messages"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          type="submit"
          className="absolute inset-y-0 end-0 flex items-center pe-3"
        >
          <BsSend />
        </button>
      </div>
    </form>
  );
};

export default MessageInput;
