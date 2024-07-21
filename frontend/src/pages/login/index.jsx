import { Link } from "react-router-dom";
import { useState } from "react";
import { AuthenticationService } from "../../service";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/actions/userAction";
const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState({
    username: "amiya",
    password: "amiya",
  });
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const response = await AuthenticationService.Login(inputs);
    if (response.onSuccess) {
      dispatch(loginSuccess(response.data));
    }
    setLoading(false);
  };
  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Login
        </h1>
        <form onSubmit={handleSubmit}>
          <label className="label p-2">
            <span className="text-base label-text">user name</span>
          </label>
          <input
            type="text"
            placeholder="User name"
            value={inputs.username}
            onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
            className="w-full input input-bordered h-10"
          />
          <label className="label p-2">
            <span className="text-base label-text">Password</span>
          </label>
          <input
            type="password"
            placeholder="Password"
            value={inputs.password}
            onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
            className="w-full input input-bordered h-10"
          />
          <Link to="/register">
            <a className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block">
              {" "}
              Dont have account
            </a>
          </Link>
          <div>
            <button className="btn btn-block btn-sm mt-2" disabled={loading}>
              {loading ? (
                <span className="loading loading-spinner "></span>
              ) : (
                "Login"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default LoginPage;
