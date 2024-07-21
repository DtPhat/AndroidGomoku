import { useEffect, useState } from "react";
import Conversation from "./Conversation";
import { UserService } from "../../service";
import { getRandomEmoji } from "../../utils/emojis";
const Conversations = () => {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchConversations = async () => {
    setLoading(true);
    const response = await UserService.getListUser();
    setConversations(response);
    setLoading(false);
  };

  useEffect(() => {
    fetchConversations();
  }, []);
  return (
    <div className="py-2 flex flex-col overflow-auto">
      {conversations.map((item) => {
        return <Conversation conversation={item} emoji={getRandomEmoji()} />;
      })}
      {loading && <span className="loading loading-spinner mx-auto"></span>}
    </div>
  );
};
export default Conversations;
