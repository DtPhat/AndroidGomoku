import { MessengerContainer, SideBar } from "../../components";
import useSocket from "../../hook/useSocket";

const HomePage = () => {
  useSocket();
  return (
    <div className="flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
      <SideBar />
      <MessengerContainer />
    </div>
  );
};
export default HomePage;
