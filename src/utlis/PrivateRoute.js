import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";

const PrivateRoute = () => {
  let user = useSelector((state) => state.data.user);
  console.log(user);
  return user.userauth.authToken != null || undefined ? (
    <Outlet></Outlet>
  ) : user.userauth.authToken == null ? (
    <Navigate to="/"></Navigate>
  ) : null;
};

export default PrivateRoute;
