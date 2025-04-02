import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { getToken } from "../../utils/constants";
import { toggleOpenUserLogin } from "../redux/slices/userSlice";

const ProtectedRoutes = ({ children }) => {
  const token = getToken();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!token) {
      dispatch(toggleOpenUserLogin(true));
    }
  }, [token, dispatch]);

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoutes;
