import { useState } from "react";
import { Link } from "react-router-dom";
import { AuthenticationService } from "../../service";
const RegisterPage = () => {
  const [inputs, setInputs] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });
  const [loading, setLoading] = useState(false);
  const handleRegister = async (e) => {
    setLoading(true);
    e.preventDefault();
    await AuthenticationService.Register(inputs);
    setLoading(false);
  };
  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Register
        </h1>
        <form onSubmit={handleRegister}>
          <label className="label p-2">
            <span className="text-base label-text">full name</span>
          </label>
          <input
            type="text"
            placeholder="Full name"
            className="w-full input input-bordered h-10"
            value={inputs.fullName}
            onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
          />
          <label className="label p-2">
            <span className="text-base label-text">user name</span>
          </label>
          <input
            type="text"
            placeholder="User name"
            className="w-full input input-bordered h-10"
            value={inputs.username}
            onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
          />
          <label className="label p-2">
            <span className="text-base label-text">Password</span>
          </label>
          <input
            type="password"
            placeholder="Password"
            className="w-full input input-bordered h-10"
            value={inputs.password}
            onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
          />
          <label className="label p-2">
            <span className="text-base label-text">Confirm Password</span>
          </label>
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full input input-bordered h-10"
            value={inputs.confirmPassword}
            onChange={(e) =>
              setInputs({ ...inputs, confirmPassword: e.target.value })
            }
          />
          <label className="label p-2">
            <span className="text-base label-text">Gender</span>
          </label>
          <select
            className="select select-bordered w-full  h-10 "
            value={inputs.gender}
            onChange={(e) => setInputs({ ...inputs, gender: e.target.value })}
          >
            <option value="" disabled>
              Select your Gender?
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <Link to="/login">
            <a className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block">
              Have account
            </a>
          </Link>
          <button className="btn btn-block btn-sm mt-2" disabled={loading}>
            {loading ? (
              <span className="loading loading-spinner "></span>
            ) : (
              "Register"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
export default RegisterPage;
