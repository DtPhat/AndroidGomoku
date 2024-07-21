import { BiPlayCircle } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
const PlayGameButton = () => {
  const navigate = useNavigate();
  const handleGoToPlay = async () => {
    navigate("/rooms");
  };
  return (
    <button className="mt-auto" onClick={handleGoToPlay}>
      <BiPlayCircle className="w-6 h-6 text-white cursor-pointer" />
    </button>
  );
};
export default PlayGameButton;
