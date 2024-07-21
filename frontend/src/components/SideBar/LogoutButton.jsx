import { BiLogOut } from "react-icons/bi";
import { AuthenticationService } from "../../service";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/actions/userAction";
const LogoutButton = () => {
  const dispatch = useDispatch();
  const handleLogout = async () => {
    const response = await AuthenticationService.Logout();
    if (response) {
      dispatch(logout());
    }
  };
  return (
    <button className="mt-auto" onClick={handleLogout}>
      <BiLogOut className="w-6 h-6 text-white cursor-pointer" />
    </button>
  );
};
export default LogoutButton;
