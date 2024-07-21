import { Route, Routes, Navigate } from "react-router-dom";

import { HomePage, LoginPage, RegisterPage, Rooms } from "../pages";
import { useSelector } from "react-redux";
import useSocket from "../hook/useSocket";

const Router = () => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={isLoggedIn ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={!isLoggedIn ? <LoginPage /> : <Navigate to="/" />}
        />
        <Route
          path="/register"
          element={!isLoggedIn ? <RegisterPage /> : <Navigate to="/" />}
        />
        <Route
          path="/rooms"
          element={isLoggedIn ? <Rooms /> : <Navigate to="/login" />}
        />
      </Routes>
    </div>
  );
};

export default Router;
