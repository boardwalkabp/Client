import { Outlet, Navigate } from "react-router-dom";
import useStateContext from "../hooks/useStateContext";

const PrivateRoutes = () => {
  const { context } = useStateContext();
  let auth = { token: false };
  // if (context.name) auth.token = true;

  if (context.role === "Client") auth.token = true;

  return auth.token ? <Outlet /> : <Navigate to="/viewer/login" />;
};

export default PrivateRoutes;
